package tn.parasoins.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.parasoins.entity.Commande;
import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    List<Commande> findByClientIdOrderByDateCommandeDesc(Long clientId);
    List<Commande> findAllByOrderByDateCommandeDesc();
}
