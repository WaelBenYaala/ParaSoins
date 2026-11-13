package tn.parasoins.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.parasoins.dto.CommandeRequest;
import tn.parasoins.entity.Commande;
import tn.parasoins.service.CommandeService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CommandeController {

    private final CommandeService commandeService;

    public CommandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

    @PostMapping("/commandes")
    public ResponseEntity<?> passerCommande(@RequestBody CommandeRequest request) {
        try {
            Commande created = commandeService.passerCommande(request);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/commandes/client/{clientId}")
    public List<Commande> getCommandesClient(@PathVariable Long clientId) {
        return commandeService.getCommandesByClient(clientId);
    }

    @GetMapping("/commandes/{id}")
    public ResponseEntity<?> getCommandeById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(commandeService.getCommandeById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/admin/commandes")
    public List<Commande> getAllCommandesAdmin() {
        return commandeService.getAllCommandes();
    }

    @PatchMapping("/admin/commandes/{id}/statut")
    public ResponseEntity<?> updateStatut(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            Commande updated = commandeService.updateStatutCommande(id, body.get("statut"));
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
