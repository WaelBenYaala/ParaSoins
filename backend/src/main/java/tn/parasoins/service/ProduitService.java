package tn.parasoins.service;

import org.springframework.stereotype.Service;
import tn.parasoins.dto.ProduitRequest;
import tn.parasoins.entity.Categorie;
import tn.parasoins.entity.Marque;
import tn.parasoins.entity.Produit;
import tn.parasoins.entity.SousCategorie;
import tn.parasoins.repository.CategorieRepository;
import tn.parasoins.repository.MarqueRepository;
import tn.parasoins.repository.ProduitRepository;
import tn.parasoins.repository.SousCategorieRepository;

import java.util.List;

@Service
public class ProduitService {

    private final ProduitRepository produitRepository;
    private final CategorieRepository categorieRepository;
    private final SousCategorieRepository sousCategorieRepository;
    private final MarqueRepository marqueRepository;

    public ProduitService(ProduitRepository produitRepository,
                          CategorieRepository categorieRepository,
                          SousCategorieRepository sousCategorieRepository,
                          MarqueRepository marqueRepository) {
        this.produitRepository = produitRepository;
        this.categorieRepository = categorieRepository;
        this.sousCategorieRepository = sousCategorieRepository;
        this.marqueRepository = marqueRepository;
    }

    public List<Produit> getAllProduits() {
        return produitRepository.findAllByOrderByIdDesc();
    }

    public Produit getProduitById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produit introuvable: #" + id));
    }

    public List<Produit> getProduitsByCategorie(Long categorieId) {
        return produitRepository.findByCategorieId(categorieId);
    }

    public List<Produit> getProduitsBySousCategorie(Long sousCategorieId) {
        return produitRepository.findBySousCategorieIdOrderByNomAsc(sousCategorieId);
    }

    public List<Produit> getProduitsByMarque(Long marqueId) {
        return produitRepository.findByMarqueId(marqueId);
    }

    public Produit createProduit(ProduitRequest req) {
        Produit p = new Produit();
        applyRequest(p, req);
        return produitRepository.save(p);
    }

    public Produit updateProduit(Long id, ProduitRequest req) {
        Produit p = getProduitById(id);
        applyRequest(p, req);
        return produitRepository.save(p);
    }

    public Produit updateStock(Long id, Integer newStock) {
        if (newStock == null || newStock < 0) {
            throw new IllegalArgumentException("Le stock ne peut pas être négatif.");
        }
        Produit p = getProduitById(id);
        p.setStock(newStock);
        return produitRepository.save(p);
    }

    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }

    private void applyRequest(Produit p, ProduitRequest req) {
        p.setNom(req.getNom());
        p.setDescription(req.getDescription());
        p.setPrix(req.getPrix());
        if (req.getImage() != null && !req.getImage().isBlank()) {
            p.setImage(req.getImage());
        } else if (p.getImage() == null) {
            p.setImage("bioderma-sensibio-h2o-250ml.jpg");
        }
        if (req.getStock() != null) {
            p.setStock(req.getStock());
        }
        if (req.getCategorieId() != null) {
            Categorie cat = categorieRepository.findById(req.getCategorieId()).orElse(null);
            p.setCategorie(cat);
        }
        if (req.getSousCategorieId() != null) {
            SousCategorie sub = sousCategorieRepository.findById(req.getSousCategorieId()).orElse(null);
            p.setSousCategorie(sub);
        }
        if (req.getMarqueId() != null && req.getMarqueId() > 0) {
            Marque marque = marqueRepository.findById(req.getMarqueId()).orElse(null);
            p.setMarque(marque);
        } else {
            p.setMarque(null);
        }
    }
}
