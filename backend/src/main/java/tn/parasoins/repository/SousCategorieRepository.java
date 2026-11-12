package tn.parasoins.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.parasoins.entity.SousCategorie;
import java.util.List;

public interface SousCategorieRepository extends JpaRepository<SousCategorie, Long> {
    List<SousCategorie> findByCategorieIdOrderByGroupeAsc(Long categorieId);
}
