package tn.parasoins.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.parasoins.dto.*;
import tn.parasoins.entity.User;
import tn.parasoins.service.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authService.register(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        try {
            User user = authService.getProfile(id);
            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "nom", user.getNom(),
                    "email", user.getEmail(),
                    "telephone", user.getTelephone() != null ? user.getTelephone() : "",
                    "adresse", user.getAdresse() != null ? user.getAdresse() : "",
                    "role", user.getRole().name()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody ProfileUpdateRequest request) {
        try {
            User user = authService.updateProfile(id, request);
            return ResponseEntity.ok(Map.of(
                    "message", "Informations enregistrées avec succès !",
                    "nom", user.getNom(),
                    "telephone", user.getTelephone(),
                    "adresse", user.getAdresse()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/profile/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody PasswordChangeRequest request) {
        try {
            authService.updatePassword(id, request);
            return ResponseEntity.ok(Map.of("message", "Mot de passe modifié avec succès !"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
