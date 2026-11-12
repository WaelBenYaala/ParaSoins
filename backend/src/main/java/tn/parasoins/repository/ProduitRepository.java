package tn.parasoins.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.parasoins.entity.Produit;
import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findByCategorieId(Long categorieId);
    List<Produit> findBySousCategorieIdOrderByNomAsc(Long sousCategorieId);
    List<Produit> findByMarqueId(Long marqueId);
    List<Produit> findAllByOrderByIdDesc();
}
