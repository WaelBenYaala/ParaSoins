package tn.parasoins.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import tn.parasoins.entity.*;
import tn.parasoins.repository.*;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategorieRepository categorieRepository;
    private final SousCategorieRepository sousCategorieRepository;
    private final MarqueRepository marqueRepository;
    private final ProduitRepository produitRepository;
    private final CommandeRepository commandeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           CategorieRepository categorieRepository,
                           SousCategorieRepository sousCategorieRepository,
                           MarqueRepository marqueRepository,
                           ProduitRepository produitRepository,
                           CommandeRepository commandeRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categorieRepository = categorieRepository;
        this.sousCategorieRepository = sousCategorieRepository;
        this.marqueRepository = marqueRepository;
        this.produitRepository = produitRepository;
        this.commandeRepository = commandeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (categorieRepository.count() > 0) {
            return;
        }

        // 1. Comptes Utilisateurs (Admin & Clients)
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

        // 2. Marques de Parapharmacie
        Marque bioderma = marqueRepository.save(new Marque("Bioderma", "Laboratoire dermatologique français au service de la biologie cutanée."));
        Marque vichy = marqueRepository.save(new Marque("Vichy Laboratoires", "Soins dermo-cosmétiques enrichis en eau volcanique de Vichy."));
        Marque svr = marqueRepository.save(new Marque("SVR", "Soins dermatologiques hautement concentrés en actifs."));
        Marque beurer = marqueRepository.save(new Marque("Beurer", "Spécialiste allemand des appareils de santé, diagnostic et bien-être."));
        Marque nuk = marqueRepository.save(new Marque("NUK", "Puériculture, biberons et accessoires adaptés au développement de bébé."));
        Marque luxeol = marqueRepository.save(new Marque("Luxéol", "Expertise capillaire et compléments dédiés à la beauté des cheveux."));
        Marque nutricap = marqueRepository.save(new Marque("Nutricap", "Soins capillaires naturels à base de kératine et phytokératine."));
        Marque roncey = marqueRepository.save(new Marque("Roncey", "Protection solaire dermatologique haute tolérance."));
        Marque narcisse = marqueRepository.save(new Marque("Narcisse Gold", "Soins traitants purifiants et anti-imperfections."));
        Marque oligovit = marqueRepository.save(new Marque("Oligovit", "Compléments alimentaires, vitamines et oligo-éléments essentiels."));
        Marque omevie = marqueRepository.save(new Marque("Omévie", "Acides gras essentiels Oméga-3 de haute pureté."));
        Marque materna = marqueRepository.save(new Marque("Materna", "Soins d'hygiène ultra-doux pour nourrissons et bébés."));

        // 3. Catégories et Sous-Catégories (identiques au menu Mega-Dropdown PHP)
        Categorie catVisage = categorieRepository.save(new Categorie("Visage & Soins", "Soins dermatologiques pour le visage : nettoyants, anti-âge, anti-acné et protection solaire."));
        Categorie catCheveux = categorieRepository.save(new Categorie("Cheveux", "Shampooings traitants, masques réparateurs et soins anti-pelliculaires."));
        Categorie catCorps = categorieRepository.save(new Categorie("Corps & Hygiène", "Gels lavants dermatologiques, hydratants corporels et hygiène quotidienne."));
        Categorie catBebe = categorieRepository.save(new Categorie("Bébé & Maman", "Biberons, chauffe-biberons, lingettes et soins pédiatriques."));
        Categorie catComplements = categorieRepository.save(new Categorie("Compléments & Vitamines", "Magnésium, Zinc, Oméga-3 et multivitamines pour l'immunité et le tonus."));
        Categorie catMateriel = categorieRepository.save(new Categorie("Matériel Médical", "Tensiomètres, appareils de massage, mobilité et orthopédie."));

        SousCategorie subNettoyant = sousCategorieRepository.save(new SousCategorie("Eaux Micellaires & Nettoyants", "Nettoyage & Démaquillage", catVisage));
        SousCategorie subAntiAge = sousCategorieRepository.save(new SousCategorie("Soins Anti-Rides & Fermeté", "Soins Spécifiques", catVisage));
        SousCategorie subAntiAcne = sousCategorieRepository.save(new SousCategorie("Soins Anti-Imperfections", "Soins Spécifiques", catVisage));
        SousCategorie subSolaire = sousCategorieRepository.save(new SousCategorie("Écrans Solaires SPF50+", "Protection Solaire", catVisage));

        SousCategorie subShamp = sousCategorieRepository.save(new SousCategorie("Shampooings Traitants", "Soins Lavants", catCheveux));
        SousCategorie subMasque = sousCategorieRepository.save(new SousCategorie("Masques & Réparation", "Soins Profonds", catCheveux));

        SousCategorie subGelLavant = sousCategorieRepository.save(new SousCategorie("Gels Lavants Surgras", "Hygiène Quotidienne", catCorps));

        SousCategorie subBiberon = sousCategorieRepository.save(new SousCategorie("Biberons & Chauffe-Biberons", "Repas de Bébé", catBebe));
        SousCategorie subToiletteBebe = sousCategorieRepository.save(new SousCategorie("Lingettes & Change", "Toilette Bébé", catBebe));

        SousCategorie subVitalite = sousCategorieRepository.save(new SousCategorie("Vitamines & Minéraux", "Tonus & Immunité", catComplements));
        SousCategorie subOmega = sousCategorieRepository.save(new SousCategorie("Oméga-3 & Magnésium", "Équilibre Nerveux & Cardiaque", catComplements));

        SousCategorie subDiagnostic = sousCategorieRepository.save(new SousCategorie("Tensiomètres & Diagnostic", "Appareils de Mesure", catMateriel));
        SousCategorie subBienEtre = sousCategorieRepository.save(new SousCategorie("Massage & Thalasso Pieds", "Confort & Bien-être", catMateriel));
        SousCategorie subMobilite = sousCategorieRepository.save(new SousCategorie("Mobilité & Orthopédie", "Aide à la Mobilité", catMateriel));

        // 4. Produits (utilisant exactement les images du projet PHP)
        Produit p1 = new Produit(
                "Bioderma Sensibio H2O Eau Micellaire 250ml",
                "Eau micellaire démaquillante et nettoyante spécialement formulée pour les peaux sensibles à intolérantes. Apaise et décongestionne l'épiderme.",
                new BigDecimal("34.500"),
                "bioderma-sensibio-h2o-250ml.jpg",
                25, catVisage, subNettoyant, bioderma
        );
        Produit p2 = new Produit(
                "Vichy Liftactiv Collagen Specialist Crème Anti-Rides 50ml",
                "Soin anti-âge global enrichi en peptides pro-collagène et Vitamine Cg pour corriger les rides et raffermir la peau.",
                new BigDecimal("118.900"),
                "vichy-collagen-liftactiv-specialist-creme-anti-rides-vitamine-c-50ml.jpg",
                14, catVisage, subAntiAge, vichy
        );
        Produit p3 = new Produit(
                "Roncey Écran Solaire Peau Grasse SPF50+ Teinté 01 50ml",
                "Très haute protection solaire UVA/UVB au toucher sec matifiant, idéale pour les peaux mixtes à grasses.",
                new BigDecimal("42.000"),
                "roncey-ecran-peau-grasse-spf50-teinte-01-50ml.jpg",
                30, catVisage, subSolaire, roncey
        );
        Produit p4 = new Produit(
                "Narcisse Gold Acnoff Crème Anti-Acné 50ml",
                "Crème traitante purifiante qui réduit les boutons, points noirs et régule l'excès de sébum sans dessécher.",
                new BigDecimal("29.800"),
                "narcisse-gold-acnoff-creme-anti-acne50ml.jpg",
                18, catVisage, subAntiAcne, narcisse
        );
        Produit p5 = new Produit(
                "Vichy Dercos Kera-Solutions Masque 2min Réparateur 200ml",
                "Masque concentré en complexe Pro-Kératine et Vitamine B5 pour réparer les cheveux abîmés dès la première utilisation.",
                new BigDecimal("58.500"),
                "vichy-dercos-kera-solutions-masque-2min-reparateur-200ml.jpg",
                12, catCheveux, subMasque, vichy
        );
        Produit p6 = new Produit(
                "Luxéol Shampooing Kératine Force & Volume 200ml",
                "Shampooing fortifiant à la kératine qui redonne force, brillance et vitalité aux cheveux fragilisés.",
                new BigDecimal("36.200"),
                "luxeol-shampooing-keratine-200ml.jpg",
                20, catCheveux, subShamp, luxeol
        );
        Produit p7 = new Produit(
                "Nutricap Shampooing Cheveux Secs et Abîmés 200ml",
                "Formule douce nourrissante aux protéines de blé et huile de ricin pour revitaliser la fibre capillaire.",
                new BigDecimal("31.900"),
                "nutricap-shampooing-cheveux-secs-abimes-200-ml.jpg",
                16, catCheveux, subShamp, nutricap
        );
        Produit p8 = new Produit(
                "SVR Topialyse Gel Lavant Doux Flacon Pompe 1L",
                "Gel lavant anti-dessèchement sans savon qui nettoie en douceur et protège les peaux sensibles et sèches de toute la famille.",
                new BigDecimal("49.900"),
                "topialyse-gel-lavant-flacon-pompe-1l.jpg",
                22, catCorps, subGelLavant, svr
        );
        Produit p9 = new Produit(
                "NUK Biberon Mickey First Choice+ 300ml",
                "Biberon ergonomique avec tétine physiologique anti-colique Air System imitant la forme du sein maternel.",
                new BigDecimal("27.500"),
                "nuk-biberon-mickey-first-choice-300-ml.jpg",
                19, catBebe, subBiberon, nuk
        );
        Produit p10 = new Produit(
                "NUK Chauffe-Biberon Thermo Express Plus",
                "Réchauffe les biberons et petits pots à la vapeur de manière ultra-rapide et homogène en seulement 90 secondes.",
                new BigDecimal("145.000"),
                "nuk-chauffe-bib-thermo-express-plus-10256404.jpg",
                8, catBebe, subBiberon, nuk
        );
        Produit p11 = new Produit(
                "Materna Bébé Lingettes Nettoyantes Douces Boîte de 72",
                "Lingettes hypoallergéniques sans alcool ni parabène pour la toilette quotidienne du siège et du visage de bébé.",
                new BigDecimal("7.800"),
                "MATERNA-BB-LINGETTE-BT_72-BLEU.jpg",
                45, catBebe, subToiletteBebe, materna
        );
        Produit p12 = new Produit(
                "Oligovit Zinc 30 Gélules Immunité & Peau",
                "Complément alimentaire riche en Zinc biodisponible pour soutenir les défenses naturelles et l'équilibre cutané.",
                new BigDecimal("19.500"),
                "OLIGOVIT-ZINC-30G.jpg",
                35, catComplements, subVitalite, oligovit
        );
        Produit p13 = new Produit(
                "Omévie Oméga-3 1000mg EPA/DHA Santé Cardiovasculaire",
                "Huile de poissons sauvages purifiée riche en EPA et DHA contribuant au fonctionnement normal du cœur et du cerveau.",
                new BigDecimal("38.400"),
                "OMEVIE-OMEGA-3-1000MG.jpg",
                24, catComplements, subOmega, omevie
        );
        Produit p14 = new Produit(
                "Naturothérapie Magnésium Marin B6 60 Gélules",
                "Association synergique de magnésium marin et vitamine B6 pour réduire la fatigue et le stress nerveux.",
                new BigDecimal("26.000"),
                "aturotherapie-magnesium-60-gelules.jpg",
                28, catComplements, subOmega, oligovit
        );
        Produit p15 = new Produit(
                "Vital Sweet Multivitamines 30 Gummies",
                "Gommes fruitées enrichies en 12 vitamines et minéraux pour faire le plein d'énergie au quotidien.",
                new BigDecimal("33.000"),
                "vital-sweet-multivitamine-30-gummies.jpg",
                17, catComplements, subVitalite, oligovit
        );
        Produit p16 = new Produit(
                "Beurer BM 54 Tensiomètre au Bras avec Bluetooth",
                "Tensiomètre électronique entièrement automatique au bras avec détection d'arythmie et suivi sur smartphone.",
                new BigDecimal("189.000"),
                "beurer-bm-54-tensiometre-au-bras-avec-bluetooth.jpg",
                6, catMateriel, subDiagnostic, beurer
        );
        Produit p17 = new Produit(
                "Beurer FM 70 Appareil de Massage Shiatsu Pieds & Dos",
                "Masseur Shiatsu relaxant avec 18 têtes de massage rotatives et fonction chauffante apaisante.",
                new BigDecimal("215.000"),
                "beurer-appareil-de-massage-shiatsu-pour-pieds-fm-70.jpg",
                5, catMateriel, subBienEtre, beurer
        );
        Produit p18 = new Produit(
                "Beurer FB 12 Bain à Bulles et Massage des Pieds",
                "Appareil de thalassothérapie des pieds avec 3 fonctions : massage par vibrations, massage bouillonnant et maintien de température.",
                new BigDecimal("129.000"),
                "beurer-fb12-bain-massage-de-pieds.jpg",
                7, catMateriel, subBienEtre, beurer
        );
        Produit p19 = new Produit(
                "Béquille Axillaire à Hauteur Variable (Paire)",
                "Paire de béquilles axillaires en aluminium léger réglables en hauteur avec appuis-bras anatomiques rembourrés.",
                new BigDecimal("68.000"),
                "bequille-axillaire-a-hauteur-variable-2-paires.jpg",
                10, catMateriel, subMobilite, beurer
        );
        Produit p20 = new Produit(
                "Chaise Roulante Pédiatrique Pliante Confort",
                "Fauteuil roulant pédiatrique ergonomique, léger et pliant avec repose-pieds ajustables et freins sécurisés.",
                new BigDecimal("540.000"),
                "chaise-roulante-enfant.jpg",
                3, catMateriel, subMobilite, beurer
        );

        produitRepository.saveAll(List.of(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20));

        // 5. Commandes initiales de démonstration (Sprint 1 #6 & Sprint 2 #5/#9)
        Commande cmd1 = new Commande();
        cmd1.setClient(malik);
        cmd1.setNomClient(malik.getNom());
        cmd1.setTelephone(malik.getTelephone());
        cmd1.setAdresse(malik.getAdresse());
        cmd1.setModePaiement("PAIEMENT_LIVRAISON");
        cmd1.setFraisLivraison(BigDecimal.ZERO);
        cmd1.setTotalCommande(new BigDecimal("153.400"));
        cmd1.setStatut("Livrée");
        cmd1.getLignes().add(new LigneCommande(cmd1, p1, 1, p1.getPrix()));
        cmd1.getLignes().add(new LigneCommande(cmd1, p2, 1, p2.getPrix()));

        Commande cmd2 = new Commande();
        cmd2.setClient(malik);
        cmd2.setNomClient(malik.getNom());
        cmd2.setTelephone(malik.getTelephone());
        cmd2.setAdresse(malik.getAdresse());
        cmd2.setModePaiement("PAIEMENT_LIVRAISON");
        cmd2.setFraisLivraison(new BigDecimal("7.000"));
        cmd2.setTotalCommande(new BigDecimal("88.900"));
        cmd2.setStatut("En attente");
        cmd2.getLignes().add(new LigneCommande(cmd2, p8, 1, p8.getPrix()));
        cmd2.getLignes().add(new LigneCommande(cmd2, p4, 1, p4.getPrix()));

        commandeRepository.saveAll(List.of(cmd1, cmd2));
    }
}
