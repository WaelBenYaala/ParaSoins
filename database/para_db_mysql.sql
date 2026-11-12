-- ============================================================================
-- PARASOINS - Schéma Base de Données MySQL (Sprint 1 & Sprint 2)
-- ============================================================================

CREATE DATABASE IF NOT EXISTS para_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE para_db;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(30),
    adresse TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'CLIENT',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS marques (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS sous_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(120) NOT NULL,
    groupe VARCHAR(100) NOT NULL,
    categorie_id BIGINT NOT NULL,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS produits (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 3) NOT NULL,
    image VARCHAR(255),
    stock INT NOT NULL DEFAULT 0,
    categorie_id BIGINT,
    sous_categorie_id BIGINT,
    marque_id BIGINT,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (sous_categorie_id) REFERENCES sous_categories(id) ON DELETE SET NULL,
    FOREIGN KEY (marque_id) REFERENCES marques(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS commandes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    client_id BIGINT,
    nom_client VARCHAR(120) NOT NULL,
    telephone VARCHAR(30) NOT NULL,
    adresse TEXT NOT NULL,
    mode_paiement VARCHAR(50) NOT NULL DEFAULT 'PAIEMENT_LIVRAISON',
    frais_livraison DECIMAL(10, 3) NOT NULL DEFAULT 7.000,
    total_commande DECIMAL(10, 3) NOT NULL,
    statut VARCHAR(40) NOT NULL DEFAULT 'En attente',
    date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ligne_commandes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    commande_id BIGINT NOT NULL,
    produit_id BIGINT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10, 3) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);
