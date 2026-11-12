-- ============================================================================
-- PARASOINS - Schéma Base de Données PostgreSQL (Sprint 1 & Sprint 2)
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(30),
    adresse TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'CLIENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS marques (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS sous_categories (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(120) NOT NULL,
    groupe VARCHAR(100) NOT NULL,
    categorie_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS produits (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    description TEXT,
    prix NUMERIC(10, 3) NOT NULL,
    image VARCHAR(255),
    stock INTEGER NOT NULL DEFAULT 0,
    categorie_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    sous_categorie_id BIGINT REFERENCES sous_categories(id) ON DELETE SET NULL,
    marque_id BIGINT REFERENCES marques(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS commandes (
    id BIGSERIAL PRIMARY KEY,
    client_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    nom_client VARCHAR(120) NOT NULL,
    telephone VARCHAR(30) NOT NULL,
    adresse TEXT NOT NULL,
    mode_paiement VARCHAR(50) NOT NULL DEFAULT 'PAIEMENT_LIVRAISON',
    frais_livraison NUMERIC(10, 3) NOT NULL DEFAULT 7.000,
    total_commande NUMERIC(10, 3) NOT NULL,
    statut VARCHAR(40) NOT NULL DEFAULT 'En attente',
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ligne_commandes (
    id BIGSERIAL PRIMARY KEY,
    commande_id BIGINT NOT NULL REFERENCES commandes(id) ON DELETE CASCADE,
    produit_id BIGINT NOT NULL REFERENCES produits(id),
    quantite INTEGER NOT NULL,
    prix_unitaire NUMERIC(10, 3) NOT NULL
);
