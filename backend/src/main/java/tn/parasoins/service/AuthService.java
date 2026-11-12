package tn.parasoins.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.parasoins.dto.*;
import tn.parasoins.entity.Role;
import tn.parasoins.entity.User;
import tn.parasoins.repository.UserRepository;
import tn.parasoins.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email ou mot de passe incorrect."));

        if (!passwordEncoder.matches(request.getMotDePasse(), user.getMotDePasse())) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect.");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return new AuthResponse(token, user.getId(), user.getNom(), user.getEmail(),
                user.getTelephone(), user.getAdresse(), user.getRole().name());
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Cet email est déjà lié à un compte.");
        }

        User user = new User(
                request.getNom(),
                request.getEmail(),
                passwordEncoder.encode(request.getMotDePasse()),
                request.getTelephone(),
                request.getAdresse(),
                Role.CLIENT
        );
        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return new AuthResponse(token, user.getId(), user.getNom(), user.getEmail(),
                user.getTelephone(), user.getAdresse(), user.getRole().name());
    }

    public User getProfile(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable."));
    }

    public User updateProfile(Long userId, ProfileUpdateRequest request) {
        User user = getProfile(userId);
        user.setNom(request.getNom());
        user.setTelephone(request.getTelephone());
        user.setAdresse(request.getAdresse());
        return userRepository.save(user);
    }

    public void updatePassword(Long userId, PasswordChangeRequest request) {
        User user = getProfile(userId);
        if (!passwordEncoder.matches(request.getOldPassword(), user.getMotDePasse())) {
            throw new IllegalArgumentException("L'ancien mot de passe est incorrect.");
        }
        user.setMotDePasse(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
