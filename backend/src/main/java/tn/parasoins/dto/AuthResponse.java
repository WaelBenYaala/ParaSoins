package tn.parasoins.dto;

public class AuthResponse {
    private String token;
    private Long id;
    private String nom;
    private String email;
    private String telephone;
    private String adresse;
    private String role;

    public AuthResponse(String token, Long id, String nom, String email, String telephone, String adresse, String role) {
        this.token = token;
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.telephone = telephone;
        this.adresse = adresse;
        this.role = role;
    }

    public String getToken() { return token; }
    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getEmail() { return email; }
    public String getTelephone() { return telephone; }
    public String getAdresse() { return adresse; }
    public String getRole() { return role; }
}
