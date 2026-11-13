package tn.parasoins.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.parasoins.dto.CommandeRequest;
import tn.parasoins.entity.Commande;
import tn.parasoins.entity.LigneCommande;
import tn.parasoins.entity.Produit;
import tn.parasoins.entity.User;
import tn.parasoins.repository.CommandeRepository;
import tn.parasoins.repository.ProduitRepository;
import tn.parasoins.repository.UserRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommandeService {

    private static final BigDecimal SEUIL_LIVRAISON_GRATUITE = new BigDecimal("100.000");
    private static final BigDecimal FRAIS_LIVRAISON_STANDARD = new BigDecimal("7.000");

    private final CommandeRepository commandeRepository;
    private final ProduitRepository produitRepository;
    private final UserRepository userRepository;

    public CommandeService(CommandeRepository commandeRepository,
                           ProduitRepository produitRepository,
                           UserRepository userRepository) {
        this.commandeRepository = commandeRepository;
        this.produitRepository = produitRepository;
        this.userRepository = userRepository;
    }

    public List<Commande> getAllCommandes() {
        return commandeRepository.findAllByOrderByDateCommandeDesc();
    }

    public Commande getCommandeById(Long id) {
        return commandeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Commande introuvable: #" + id));
    }

    public List<Commande> getCommandesByClient(Long clientId) {
        return commandeRepository.findByClientIdOrderByDateCommandeDesc(clientId);
    }

    /**
     * Création transactionnelle de la commande (Story #5 & Exigence NF4) :
     * - Vérifie le stock disponible pour chaque produit
     * - Décrémente automatiquement le stock à 100 %
     * - Calcule les frais de livraison (Gratuit dès 100 DT, sinon 7.000 DT)
     */
    @Transactional
    public Commande passerCommande(CommandeRequest req) {
        if (req.getArticles() == null || req.getArticles().isEmpty()) {
            throw new IllegalArgumentException("Le panier ne peut pas être vide.");
        }

        Commande commande = new Commande();
        if (req.getClientId() != null) {
            User client = userRepository.findById(req.getClientId()).orElse(null);
            commande.setClient(client);
        }
        commande.setNomClient(req.getNomClient());
        commande.setTelephone(req.getTelephone());
        commande.setAdresse(req.getAdresse());
        commande.setModePaiement(req.getModePaiement() != null ? req.getModePaiement() : "PAIEMENT_LIVRAISON");
        commande.setStatut("En attente");
        commande.setDateCommande(LocalDateTime.now());

        BigDecimal sousTotal = BigDecimal.ZERO;

        for (CommandeRequest.PanierItemDto item : req.getArticles()) {
            Produit produit = produitRepository.findById(item.getProduitId())
                    .orElseThrow(() -> new IllegalArgumentException("Produit introuvable: #" + item.getProduitId()));

            if (produit.getStock() < item.getQuantite()) {
                throw new IllegalArgumentException("Stock insuffisant pour l'article : " + produit.getNom()
                        + " (Disponible : " + produit.getStock() + ")");
            }

            // Décrémentation automatique du stock (Objectif 1.2 & NF4)
            produit.setStock(produit.getStock() - item.getQuantite());
            produitRepository.save(produit);

            LigneCommande ligne = new LigneCommande(commande, produit, item.getQuantite(), produit.getPrix());
            commande.getLignes().add(ligne);

            BigDecimal totalLigne = produit.getPrix().multiply(BigDecimal.valueOf(item.getQuantite()));
            sousTotal = sousTotal.add(totalLigne);
        }

        BigDecimal frais = sousTotal.compareTo(SEUIL_LIVRAISON_GRATUITE) >= 0
                ? BigDecimal.ZERO
                : FRAIS_LIVRAISON_STANDARD;

        commande.setFraisLivraison(frais);
        commande.setTotalCommande(sousTotal.add(frais));

        return commandeRepository.save(commande);
    }

    /**
     * Mise à jour de l'état de traitement de la commande (Story #6) :
     * En attente, En préparation, Livrée, Annulée
     */
    @Transactional
    public Commande updateStatutCommande(Long id, String nouveauStatut) {
        Commande commande = getCommandeById(id);
        commande.setStatut(nouveauStatut);
        return commandeRepository.save(commande);
    }
}
