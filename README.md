# 🌿 ParaSoins – Plateforme Web Full-Stack de Parapharmacie

**Projet d'Intégration 2026 — Spring Boot & Angular**
- **Équipe :** Wael Ben Yaala (Développeur / Scrum Master) • Malik Hnaien (Développeur)
- **Encadrante / Product Owner :** Mme Chifa Labidi
- **GitHub Projects :** [Backlog & Sprints ParaSoins](https://github.com/users/WaelBenYaala/projects/2)

---

## 🏗️ Architecture Technique (NF3)

Le projet respecte une séparation stricte entre le Back-end et le Front-end :
- **`backend/` (API REST Spring Boot 3 / Java 17+)** :
  - Architecture en couches : `controller`, `service`, `repository`, `entity`, `dto`, `security`, `config`.
  - Sécurité : **Spring Security + JWT** et hachage des mots de passe avec **BCrypt** (NF1), contrôle d'accès par rôle (`CLIENT`, `ADMIN`).
  - Persistance : **Spring Data JPA / Hibernate**, compatible **PostgreSQL** et **MySQL** (avec profil de secours H2 intégré).
  - Gestion transactionnelle (`@Transactional`) garantissant l'intégrité des stocks lors du passage de commande (NF4).
- **`frontend/` (SPA Angular 17+ / TypeScript)** :
  - Architecture modulaire : `models`, `services`, `guards`, `interceptors`, `components` (Client & Back-office Admin).
- **`database/`** :
  - Scripts SQL d'initialisation (`para_db_mysql.sql` et `para_db_postgresql.sql`).

---

## 📊 État d'Avancement des Sprints

| Sprint | Période | Stories | État |
| :--- | :--- | :--- | :--- |
| **Sprint 1 (8 pts)** | 23/10/2026 – 05/11/2026 | `#1` Auth JWT & Profil, `#2` CRUD Catégories, `#8` CRUD Produits & Stock, `#6` Suivi état commandes | ✅ **Terminé (Done)** |
| **Sprint 2 (8 pts)** | 06/11/2026 – 19/11/2026 | `#4` Gestion dynamique du panier (Done), `#5` Passage commande & paiement (In Progress), `#9` Historique des achats (In Progress) | 🔄 **En cours (Developing)** |
| **Sprint 3 (8 pts)** | 20/11/2026 – 03/12/2026 | `#3` Recherche multicritère, `#10` Avis & Favoris, `#7` Chatbot SOS Bot | 📋 **À faire (Todo)** |

---

## 🚀 Instructions de Lancement

### 1. Base de données (PostgreSQL ou MySQL)
Un composant `DataInitializer` initialise automatiquement les catégories, sous-catégories, marques, 20+ produits de parapharmacie et les comptes de test au démarrage de Spring Boot.
- **Compte Administrateur :** `admin@parasoins.tn` / `admin123`
- **Compte Client :** `malik@parasoins.tn` / `client123`

### 2. Lancer le Back-end (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
L'API REST démarre sur `http://localhost:8080/api`.

### 3. Lancer le Front-end (Angular)
```bash
cd frontend
npm install
npm start
```
L'application Angular est accessible sur `http://localhost:4200`.
