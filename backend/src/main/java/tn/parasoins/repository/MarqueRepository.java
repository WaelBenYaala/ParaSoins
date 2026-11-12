package tn.parasoins.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.parasoins.entity.Marque;
import java.util.List;

public interface MarqueRepository extends JpaRepository<Marque, Long> {
    List<Marque> findAllByOrderByNomAsc();
}
