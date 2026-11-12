package tn.parasoins.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.parasoins.dto.ProduitRequest;
import tn.parasoins.entity.Produit;
import tn.parasoins.service.ProduitService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    @GetMapping("/produits")
    public List<Produit> getAllProduits(@RequestParam(required = false) Long categorieId,
                                        @RequestParam(required = false) Long sousCategorieId,
                                        @RequestParam(required = false) Long marqueId) {
        if (categorieId != null) {
            return produitService.getProduitsByCategorie(categorieId);
        }
        if (sousCategorieId != null) {
            return produitService.getProduitsBySousCategorie(sousCategorieId);
        }
        if (marqueId != null) {
            return produitService.getProduitsByMarque(marqueId);
        }
        return produitService.getAllProduits();
    }

    @GetMapping("/produits/{id}")
    public ResponseEntity<?> getProduitById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(produitService.getProduitById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/admin/produits")
    public ResponseEntity<?> createProduit(@RequestBody ProduitRequest request) {
        return ResponseEntity.ok(produitService.createProduit(request));
    }

    @PutMapping("/admin/produits/{id}")
    public ResponseEntity<?> updateProduit(@PathVariable Long id, @RequestBody ProduitRequest request) {
        return ResponseEntity.ok(produitService.updateProduit(id, request));
    }

    @PatchMapping("/admin/produits/{id}/stock")
    public ResponseEntity<?> updateStock(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        return ResponseEntity.ok(produitService.updateStock(id, body.get("stock")));
    }

    @DeleteMapping("/admin/produits/{id}")
    public ResponseEntity<?> deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
        return ResponseEntity.ok(Map.of("message", "Produit supprimé avec succès."));
    }
}
