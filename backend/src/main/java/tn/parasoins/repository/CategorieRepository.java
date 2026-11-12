package tn.parasoins.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.parasoins.entity.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
    boolean existsByNom(String nom);
}
