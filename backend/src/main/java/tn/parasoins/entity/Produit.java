package tn.parasoins.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "produits")
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 3)
    private BigDecimal prix;

    @Column(length = 255)
    private String image;

    @Column(nullable = false)
    private Integer stock = 0;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categorie_id")
    private Categorie categorie;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sous_categorie_id")
    private SousCategorie sousCategorie;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "marque_id")
    private Marque marque;

    public Produit() {}

    public Produit(String nom, String description, BigDecimal prix, String image, Integer stock,
                   Categorie categorie, SousCategorie sousCategorie, Marque marque) {
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.image = image;
        this.stock = stock;
        this.categorie = categorie;
        this.sousCategorie = sousCategorie;
        this.marque = marque;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrix() { return prix; }
    public void setPrix(BigDecimal prix) { this.prix = prix; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public Categorie getCategorie() { return categorie; }
    public void setCategorie(Categorie categorie) { this.categorie = categorie; }
    public SousCategorie getSousCategorie() { return sousCategorie; }
    public void setSousCategorie(SousCategorie sousCategorie) { this.sousCategorie = sousCategorie; }
    public Marque getMarque() { return marque; }
    public void setMarque(Marque marque) { this.marque = marque; }
}
