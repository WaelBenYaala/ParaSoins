package tn.parasoins.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.parasoins.entity.Categorie;
import tn.parasoins.entity.Marque;
import tn.parasoins.entity.SousCategorie;
import tn.parasoins.service.CategorieService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CategorieController {

    private final CategorieService categorieService;

    public CategorieController(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

    @GetMapping("/categories")
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<?> getCategorieById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(categorieService.getCategorieById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/categories/sous-categories")
    public List<SousCategorie> getAllSousCategories() {
        return categorieService.getAllSousCategories();
    }

    @GetMapping("/categories/sous-categories/{id}")
    public ResponseEntity<?> getSousCategorieById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(categorieService.getSousCategorieById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/marques")
    public List<Marque> getAllMarques() {
        return categorieService.getAllMarques();
    }

    @PostMapping("/admin/categories")
    public ResponseEntity<?> createCategorie(@RequestBody Categorie categorie) {
        return ResponseEntity.ok(categorieService.createCategorie(categorie));
    }

    @PutMapping("/admin/categories/{id}")
    public ResponseEntity<?> updateCategorie(@PathVariable Long id, @RequestBody Categorie categorie) {
        return ResponseEntity.ok(categorieService.updateCategorie(id, categorie));
    }

    @DeleteMapping("/admin/categories/{id}")
    public ResponseEntity<?> deleteCategorie(@PathVariable Long id) {
        categorieService.deleteCategorie(id);
        return ResponseEntity.ok(Map.of("message", "Catégorie supprimée avec succès."));
    }
}
