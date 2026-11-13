package tn.parasoins.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "commandes")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private User client;

    @Column(name = "nom_client", nullable = false, length = 120)
    private String nomClient;

    @Column(nullable = false, length = 30)
    private String telephone;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String adresse;

    @Column(name = "mode_paiement", nullable = false, length = 50)
    private String modePaiement = "PAIEMENT_LIVRAISON";

    @Column(name = "frais_livraison", nullable = false, precision = 10, scale = 3)
    private BigDecimal fraisLivraison = new BigDecimal("7.000");

    @Column(name = "total_commande", nullable = false, precision = 10, scale = 3)
    private BigDecimal totalCommande;

    @Column(nullable = false, length = 40)
    private String statut = "En attente";

    @Column(name = "date_commande")
    private LocalDateTime dateCommande = LocalDateTime.now();

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<LigneCommande> lignes = new ArrayList<>();

    public Commande() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getClient() { return client; }
    public void setClient(User client) { this.client = client; }
    public String getNomClient() { return nomClient; }
    public void setNomClient(String nomClient) { this.nomClient = nomClient; }
    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }
    public String getModePaiement() { return modePaiement; }
    public void setModePaiement(String modePaiement) { this.modePaiement = modePaiement; }
    public BigDecimal getFraisLivraison() { return fraisLivraison; }
    public void setFraisLivraison(BigDecimal fraisLivraison) { this.fraisLivraison = fraisLivraison; }
    public BigDecimal getTotalCommande() { return totalCommande; }
    public void setTotalCommande(BigDecimal totalCommande) { this.totalCommande = totalCommande; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public LocalDateTime getDateCommande() { return dateCommande; }
    public void setDateCommande(LocalDateTime dateCommande) { this.dateCommande = dateCommande; }
    public List<LigneCommande> getLignes() { return lignes; }
    public void setLignes(List<LigneCommande> lignes) { this.lignes = lignes; }
}
