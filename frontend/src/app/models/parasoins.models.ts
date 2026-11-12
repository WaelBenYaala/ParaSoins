export interface User {
  id: number;
  nom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  role: 'CLIENT' | 'ADMIN';
  token?: string;
}

export interface Marque {
  id: number;
  nom: string;
  description?: string;
}

export interface SousCategorie {
  id: number;
  nom: string;
  groupe: string;
  categorieId?: number;
  categorieNom?: string;
}

export interface Categorie {
  id: number;
  nom: string;
  description?: string;
  sousCategories?: SousCategorie[];
}

export interface Produit {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image: string;
  stock: number;
  categorie?: Categorie;
  sousCategorie?: SousCategorie;
  marque?: Marque;
}

export interface CartItem {
  produit: Produit;
  quantite: number;
}

export interface LigneCommande {
  id?: number;
  produit: Produit;
  quantite: number;
  prixUnitaire: number;
}

export interface Commande {
  id: number;
  nomClient: string;
  telephone: string;
  adresse: string;
  modePaiement: string;
  fraisLivraison: number;
  totalCommande: number;
  statut: 'En attente' | 'En préparation' | 'Livrée' | 'Annulée';
  dateCommande: string;
  lignes: LigneCommande[];
}
