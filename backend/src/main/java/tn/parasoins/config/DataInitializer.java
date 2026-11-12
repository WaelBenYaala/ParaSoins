package tn.parasoins.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import tn.parasoins.entity.Role;
import tn.parasoins.entity.User;
import tn.parasoins.repository.UserRepository;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        User admin = new User(
                "Administrateur ParaSoins",
                "admin@parasoins.tn",
                passwordEncoder.encode("admin123"),
                "71 234 567",
                "Siège ParaSoins, Centre Urbain Nord, Tunis",
                Role.ADMIN
        );
        User malik = new User(
                "Malik Hnaien",
                "malik@parasoins.tn",
                passwordEncoder.encode("client123"),
                "22 456 789",
                "Avenue Habib Bourguiba, Tunis",
                Role.CLIENT
        );
        User wael = new User(
                "Wael Ben Yaala",
                "wael@parasoins.tn",
                passwordEncoder.encode("client123"),
                "55 987 654",
                "Les Berges du Lac 2, Tunis",
                Role.CLIENT
        );
        userRepository.saveAll(List.of(admin, malik, wael));
    }
}
