package tn.parasoins.service;

import org.springframework.stereotype.Service;
import tn.parasoins.entity.Categorie;
import tn.parasoins.entity.Marque;
import tn.parasoins.entity.SousCategorie;
import tn.parasoins.repository.CategorieRepository;
import tn.parasoins.repository.MarqueRepository;
import tn.parasoins.repository.SousCategorieRepository;

import java.util.List;

@Service
public class CategorieService {

    private final CategorieRepository categorieRepository;
    private final SousCategorieRepository sousCategorieRepository;
    private final MarqueRepository marqueRepository;

    public CategorieService(CategorieRepository categorieRepository,
                            SousCategorieRepository sousCategorieRepository,
                            MarqueRepository marqueRepository) {
        this.categorieRepository = categorieRepository;
        this.sousCategorieRepository = sousCategorieRepository;
        this.marqueRepository = marqueRepository;
    }

    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    public Categorie getCategorieById(Long id) {
        return categorieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Catégorie introuvable: #" + id));
    }

    public Categorie createCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    public Categorie updateCategorie(Long id, Categorie updated) {
        Categorie existing = getCategorieById(id);
        existing.setNom(updated.getNom());
        existing.setDescription(updated.getDescription());
        return categorieRepository.save(existing);
    }

    public void deleteCategorie(Long id) {
        categorieRepository.deleteById(id);
    }

    public SousCategorie getSousCategorieById(Long id) {
        return sousCategorieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Sous-catégorie introuvable: #" + id));
    }

    public List<SousCategorie> getAllSousCategories() {
        return sousCategorieRepository.findAll();
    }

    public List<Marque> getAllMarques() {
        return marqueRepository.findAllByOrderByNomAsc();
    }
}
