import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Categorie, Commande, Marque, Produit, SousCategorie } from '../../models/parasoins.models';
import { CatalogueService } from '../../services/catalogue.service';
import { CommandeService } from '../../services/commande.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="display: flex; min-height: 100vh; font-family: 'Inter', sans-serif; background: #f8fbfa;">
      <!-- Sidebar Admin (identique à admin_dashboard.php) -->
      <aside style="width: 270px; background: #1e272e; color: white; position: fixed; height: 100vh;">
        <div style="padding: 28px 24px; font-size: 22px; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.06);">
          Para<span style="color: #27ae60;">Soins</span> <small style="font-size: 11px; color: #94a3b8; display: block; margin-top: 4px;">Back-Office Gérant</small>
        </div>
        <ul style="list-style: none; padding: 18px 0; margin: 0;">
          <li>
            <a (click)="changerOnglet('home')" [class.active]="onglet === 'home'" class="side-link">📊 Tableau de bord</a>
          </li>
          <li>
            <a (click)="changerOnglet('categories')" [class.active]="onglet === 'categories'" class="side-link">🗂️ Catégories (#2)</a>
          </li>
          <li>
            <a (click)="changerOnglet('produits')" [class.active]="onglet === 'produits'" class="side-link">📦 Stock & Produits (#8)</a>
          </li>
          <li>
            <a (click)="ouvrirAjoutProduit()" [class.active]="onglet === 'form-produit'" class="side-link">➕ Nouveau Produit (#8)</a>
          </li>
          <li>
            <a (click)="changerOnglet('commandes')" [class.active]="onglet === 'commandes' || onglet === 'detail-commande'" class="side-link">🛍️ Commandes (#6)</a>
          </li>
          <li style="margin-top: 30px;">
            <a routerLink="/" class="side-link" style="color: #74b9ff;">🌐 Voir la Boutique</a>
          </li>
          <li>
            <a (click)="deconnexion()" class="side-link" style="color: #fab1a0;">🚪 Déconnexion</a>
          </li>
        </ul>
      </aside>

      <!-- Contenu Principal -->
      <main style="margin-left: 270px; width: calc(100% - 270px); padding: 38px;">
        <div *ngIf="notification" style="background: #eafaf1; color: #27ae60; padding: 14px 20px; border-radius: 10px; margin-bottom: 22px; font-weight: 600;">
          ✅ {{ notification }}
        </div>

        <!-- ONGLET 1 : TABLEAU DE BORD -->
        <section *ngIf="onglet === 'home'">
          <h2 style="font-size: 26px; margin: 0 0 6px 0; color: #1e272e;">Tableau de Bord</h2>
          <p style="color: #888; margin: 0 0 30px 0;">Bienvenue, voici l'état de votre parapharmacie aujourd'hui.</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 22px;">
            <div class="stat-card" style="border-top: 4px solid #27ae60;">
              <h3>{{ produits.length }}</h3>
              <p>Produits en ligne</p>
            </div>
            <div class="stat-card" style="border-top: 4px solid #3498db;">
              <h3>{{ categories.length }}</h3>
              <p>Catégories actives</p>
            </div>
            <div class="stat-card" style="border-top: 4px solid #f1c40f;">
              <h3>{{ commandes.length }}</h3>
              <p>Commandes totales</p>
            </div>
          </div>
        </section>

        <!-- ONGLET 2 : CRUD CATÉGORIES (Story #2) -->
        <section *ngIf="onglet === 'categories'">
          <h2 style="font-size: 24px; margin: 0 0 6px 0; color: #1e272e;">🗂️ Gestion des Catégories (Story #2)</h2>
          <p style="color: #888; margin: 0 0 25px 0;">Ajouter, modifier, supprimer et lister les catégories du catalogue.</p>

          <div style="background: white; padding: 25px; border-radius: 16px; margin-bottom: 28px; border: 1px solid #edf2f7;">
            <h4 style="margin-top: 0;">{{ categorieEnEdition ? 'Modifier la catégorie #' + categorieEnEdition.id : 'Ajouter une nouvelle catégorie' }}</h4>
            <form (ngSubmit)="sauvegarderCategorie()" style="display: flex; gap: 15px; flex-wrap: wrap; align-items: flex-end;">
              <div style="flex: 1; min-width: 220px;">
                <label style="display: block; font-size: 12px; font-weight: 600; color: #718096; margin-bottom: 6px;">Nom de la catégorie</label>
                <input type="text" [(ngModel)]="catForm.nom" name="catNom" required placeholder="Ex: Soins Solaires"
                       style="width: 100%; padding: 11px; border: 1px solid #e2e8f0; border-radius: 10px;">
              </div>
              <div style="flex: 2; min-width: 280px;">
                <label style="display: block; font-size: 12px; font-weight: 600; color: #718096; margin-bottom: 6px;">Description</label>
                <input type="text" [(ngModel)]="catForm.description" name="catDesc" placeholder="Description de la catégorie..."
                       style="width: 100%; padding: 11px; border: 1px solid #e2e8f0; border-radius: 10px;">
              </div>
              <button type="submit" class="btn-primary">
                {{ categorieEnEdition ? '💾 Mettre à jour' : '+ Ajouter' }}
              </button>
              <button *ngIf="categorieEnEdition" type="button" (click)="annulerEditionCategorie()"
                      style="padding: 11px 18px; border-radius: 10px; border: 1px solid #cbd5e1; background: white; cursor: pointer;">
                Annuler
              </button>
            </form>
          </div>

          <table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Sous-catégories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of categories">
                <td><strong>#{{ c.id }}</strong></td>
                <td style="font-weight: 600; color: #1e272e;">{{ c.nom }}</td>
                <td style="color: #64748b; font-size: 13px;">{{ c.description }}</td>
                <td>{{ c.sousCategories?.length || 0 }} sous-catégorie(s)</td>
                <td>
                  <button (click)="editerCategorie(c)" class="link-btn" style="color: #3498db;">Modifier</button>
                  <button (click)="supprimerCategorie(c.id)" class="link-btn" style="color: #e74c3c;">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- ONGLET 3 : GESTION DES PRODUITS & STOCK (Story #8) -->
        <section *ngIf="onglet === 'produits'">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <div>
              <h2 style="font-size: 24px; margin: 0; color: #1e272e;">📦 Gestion des Produits & Stocks (Story #8)</h2>
              <p style="color: #888; margin: 5px 0 0 0;">Contrôlez vos stocks en temps réel et modifiez vos articles.</p>
            </div>
            <button (click)="ouvrirAjoutProduit()" class="btn-primary">+ Ajouter un produit</button>
          </div>

          <table class="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Produit</th>
                <th>Catégorie / Marque</th>
                <th style="text-align: center;">Prix</th>
                <th style="text-align: center;">Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of produits">
                <td>
                  <img [src]="'assets/img/' + p.image" width="48" height="48" style="object-fit: contain; border-radius: 8px; background: white;">
                </td>
                <td style="font-weight: 600; color: #1e272e;">{{ p.nom }}</td>
                <td>
                  <span style="font-size: 12px; color: #27ae60; font-weight: 600;">{{ p.categorie?.nom || 'N/A' }}</span><br>
                  <small style="color: #888;">{{ p.marque?.nom || 'Sans marque' }}</small>
                </td>
                <td style="text-align: center; font-weight: 700; color: #27ae60;">
                  {{ p.prix | number:'1.3-3' }} DT
                </td>
                <td style="text-align: center;">
                  <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
                    <input type="number" [(ngModel)]="p.stock" style="width: 68px; padding: 7px; border: 1px solid #ddd; border-radius: 6px; text-align: center;">
                    <button (click)="mettreAJourStock(p)" title="Enregistrer le stock" style="background: none; border: none; cursor: pointer; font-size: 18px;">💾</button>
                  </div>
                </td>
                <td>
                  <button (click)="ouvrirModificationProduit(p)" class="link-btn" style="color: #3498db;">Modifier</button>
                  <button (click)="supprimerProduit(p.id)" class="link-btn" style="color: #e74c3c;">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- ONGLET 4 : FORMULAIRE AJOUT / MODIFICATION PRODUIT (admin_ajouter.php & admin_modifier.php) -->
        <section *ngIf="onglet === 'form-produit'">
          <h2 style="font-size: 24px; margin: 0 0 6px 0; color: #1e272e;">
            {{ produitEnEditionId ? '✏️ Modifier le Produit #' + produitEnEditionId : '➕ Nouveau Produit' }}
          </h2>
          <p style="color: #888; margin: 0 0 25px 0;">Renseignez les caractéristiques, la catégorie et le stock de l'article.</p>

          <div style="background: white; padding: 30px; border-radius: 20px; max-width: 760px; border: 1px solid #edf2f7;">
            <form (ngSubmit)="sauvegarderProduit()">
              <div style="margin-bottom: 18px;">
                <label class="form-label">Nom du produit</label>
                <input type="text" [(ngModel)]="prodForm.nom" name="nom" required class="form-input" placeholder="Ex: Bioderma Sensibio H2O 250ml">
              </div>

              <div style="display: flex; gap: 18px; margin-bottom: 18px;">
                <div style="flex: 1;">
                  <label class="form-label">Prix (DT)</label>
                  <input type="number" step="0.001" [(ngModel)]="prodForm.prix" name="prix" required class="form-input">
                </div>
                <div style="flex: 1;">
                  <label class="form-label">Quantité en Stock</label>
                  <input type="number" [(ngModel)]="prodForm.stock" name="stock" required class="form-input">
                </div>
              </div>

              <div style="display: flex; gap: 18px; margin-bottom: 18px;">
                <div style="flex: 1;">
                  <label class="form-label">Catégorie</label>
                  <select [(ngModel)]="prodForm.categorieId" name="categorieId" class="form-input">
                    <option *ngFor="let c of categories" [ngValue]="c.id">{{ c.nom }}</option>
                  </select>
                </div>
                <div style="flex: 1;">
                  <label class="form-label">Sous-Catégorie</label>
                  <select [(ngModel)]="prodForm.sousCategorieId" name="sousCategorieId" class="form-input">
                    <option *ngFor="let s of sousCategories" [ngValue]="s.id">{{ s.nom }}</option>
                  </select>
                </div>
                <div style="flex: 1;">
                  <label class="form-label">Marque</label>
                  <select [(ngModel)]="prodForm.marqueId" name="marqueId" class="form-input">
                    <option [ngValue]="0">-- Aucune marque --</option>
                    <option *ngFor="let m of marques" [ngValue]="m.id">{{ m.nom }}</option>
                  </select>
                </div>
              </div>

              <div style="margin-bottom: 18px;">
                <label class="form-label">Nom du fichier image (dans assets/img/)</label>
                <input type="text" [(ngModel)]="prodForm.image" name="image" class="form-input" placeholder="bioderma-sensibio-h2o-250ml.jpg">
              </div>

              <div style="margin-bottom: 22px;">
                <label class="form-label">Description détaillée</label>
                <textarea [(ngModel)]="prodForm.description" name="description" rows="4" class="form-input"></textarea>
              </div>

              <div style="display: flex; gap: 12px;">
                <button type="submit" class="btn-primary" style="flex: 1; padding: 15px;">
                  🚀 {{ produitEnEditionId ? 'ENREGISTRER LES CHANGEMENTS' : 'ENREGISTRER LE PRODUIT' }}
                </button>
                <button type="button" (click)="changerOnglet('produits')" style="padding: 15px 25px; border-radius: 12px; border: 1px solid #cbd5e1; background: white; cursor: pointer;">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </section>

        <!-- ONGLET 5 : SUIVI DES COMMANDES (admin_commandes.php - Story #6) -->
        <section *ngIf="onglet === 'commandes'">
          <h2 style="font-size: 24px; margin: 0 0 6px 0; color: #1e272e;">🛍️ Suivi et État des Commandes (Story #6)</h2>
          <p style="color: #888; margin: 0 0 25px 0;">Visualisez et mettez à jour l'état de traitement des commandes clients.</p>

          <div *ngFor="let c of commandes"
               style="background: white; padding: 24px; border-radius: 16px; margin-bottom: 18px; border: 1px solid #edf2f7; border-left: 5px solid #27ae60;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 12px;">
              <div (click)="voirDetailCommande(c)" style="cursor: pointer;">
                <span style="color: #94a3b8; font-weight: 700;">#{{ c.id }}</span>
                <strong style="font-size: 16px; color: #1e272e; margin-left: 8px;">{{ c.nomClient }} 🔍</strong>
              </div>
              <span style="padding: 6px 14px; border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase; background: #ebfbee; color: #2f9e44;">
                {{ c.statut }}
              </span>
            </div>

            <div style="font-size: 14px; color: #4a5568; line-height: 1.7;">
              <div><strong>📞 Contact :</strong> {{ c.telephone }}</div>
              <div><strong>📍 Adresse :</strong> {{ c.adresse }}</div>
              <div><strong>💳 Paiement :</strong> {{ c.modePaiement }}</div>
              <div><strong>💰 Montant TTC :</strong> <span style="color: #27ae60; font-weight: 800;">{{ c.totalCommande | number:'1.3-3' }} DT</span></div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 14px; border-top: 1px dashed #e2e8f0;">
              <span style="font-size: 12px; color: #94a3b8;">Reçue le {{ c.dateCommande | date:'dd/MM/yyyy à HH:mm' }}</span>
              <div style="display: flex; gap: 8px;">
                <button (click)="changerStatutCommande(c, 'En attente')" class="status-btn">⌛ En attente</button>
                <button (click)="changerStatutCommande(c, 'En préparation')" class="status-btn">📦 En préparation</button>
                <button (click)="changerStatutCommande(c, 'Livrée')" class="status-btn">✅ Livrée</button>
                <button (click)="changerStatutCommande(c, 'Annulée')" class="status-btn">❌ Annulée</button>
              </div>
            </div>
          </div>
        </section>

        <!-- ONGLET 6 : DÉTAIL COMMANDE ADMIN & IMPRESSION BON (admin_commande_details.php - Story #6) -->
        <section *ngIf="onglet === 'detail-commande' && commandeSelectionnee">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div>
              <h2 style="margin: 0;">Détails Commande #{{ commandeSelectionnee.id }}</h2>
              <p style="color: #94a3b8; margin: 4px 0 0 0;">Facturation et logistique</p>
            </div>
            <div style="display: flex; gap: 10px;">
              <button onclick="window.print()" style="background: white; border: 1px solid #e2e8f0; padding: 10px 18px; border-radius: 10px; font-weight: 600; cursor: pointer;">
                🖨️ Imprimer Bon
              </button>
              <button (click)="changerOnglet('commandes')" style="background: #1e272e; color: white; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 600; cursor: pointer;">
                ← Retour
              </button>
            </div>
          </div>

          <div style="background: white; padding: 35px; border-radius: 22px; border: 1px solid #f1f5f9;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
              <div style="padding: 20px; border: 1px solid #f1f5f9; border-radius: 16px;">
                <h5 style="margin: 0 0 10px 0; color: #94a3b8; text-transform: uppercase; font-size: 11px;">👤 Patient / Client</h5>
                <p style="margin: 0; font-size: 17px; font-weight: 700;">{{ commandeSelectionnee.nomClient }}</p>
                <p style="margin: 6px 0 0 0; color: #27ae60; font-weight: 700;">📞 {{ commandeSelectionnee.telephone }}</p>
              </div>
              <div style="padding: 20px; border: 1px solid #f1f5f9; border-radius: 16px;">
                <h5 style="margin: 0 0 10px 0; color: #94a3b8; text-transform: uppercase; font-size: 11px;">📍 Adresse de Livraison</h5>
                <p style="margin: 0; font-size: 14px;">{{ commandeSelectionnee.adresse }}</p>
              </div>
            </div>

            <table class="admin-table">
              <thead>
                <tr>
                  <th>Article</th>
                  <th style="text-align: center;">Qté</th>
                  <th style="text-align: right;">Prix Unitaire</th>
                  <th style="text-align: right;">Sous-Total</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let l of commandeSelectionnee.lignes">
                  <td style="font-weight: 600;">{{ l.produit.nom }}</td>
                  <td style="text-align: center; font-weight: 700;">×{{ l.quantite }}</td>
                  <td style="text-align: right;">{{ l.prixUnitaire | number:'1.3-3' }} DT</td>
                  <td style="text-align: right; font-weight: 700;">{{ (l.prixUnitaire * l.quantite) | number:'1.3-3' }} DT</td>
                </tr>
              </tbody>
            </table>

            <div style="background: #0f172a; color: white; padding: 28px; border-radius: 20px; margin-top: 28px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase;">Montant Total Net TTC</span>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;"> Statut : {{ commandeSelectionnee.statut }}</p>
              </div>
              <span style="font-size: 34px; font-weight: 800; color: #22c55e;">{{ commandeSelectionnee.totalCommande | number:'1.3-3' }} DT</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .side-link {
      display: block;
      padding: 14px 24px;
      color: #b2bec3;
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      transition: 0.2s;
    }
    .side-link:hover, .side-link.active {
      background: rgba(255,255,255,0.06);
      color: white;
      border-right: 4px solid #27ae60;
    }
    .stat-card {
      background: white;
      padding: 25px;
      border-radius: 16px;
      border: 1px solid #edf2f7;
    }
    .stat-card h3 { font-size: 28px; margin: 0; color: #1e272e; }
    .stat-card p { color: #718096; margin: 6px 0 0 0; font-size: 14px; }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 15px;
      overflow: hidden;
    }
    .admin-table th {
      background: #f8f9fa;
      padding: 16px;
      text-align: left;
      font-size: 12px;
      color: #718096;
      text-transform: uppercase;
    }
    .admin-table td {
      padding: 16px;
      border-bottom: 1px solid #f1f1f1;
    }
    .btn-primary {
      background: #27ae60;
      color: white;
      border: none;
      padding: 12px 22px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
    }
    .link-btn {
      background: none;
      border: none;
      font-weight: 600;
      cursor: pointer;
      margin-right: 12px;
    }
    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #718096;
      margin-bottom: 6px;
      text-transform: uppercase;
    }
    .form-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      font-family: inherit;
    }
    .status-btn {
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      background: white;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  onglet: 'home' | 'categories' | 'produits' | 'form-produit' | 'commandes' | 'detail-commande' = 'home';
  notification = '';

  categories: Categorie[] = [];
  sousCategories: SousCategorie[] = [];
  marques: Marque[] = [];
  produits: Produit[] = [];
  commandes: Commande[] = [];

  categorieEnEdition: Categorie | null = null;
  catForm = { nom: '', description: '' };

  produitEnEditionId: number | null = null;
  prodForm = {
    nom: '',
    prix: 0,
    stock: 10,
    categorieId: 1,
    sousCategorieId: 1,
    marqueId: 1,
    image: 'bioderma-sensibio-h2o-250ml.jpg',
    description: ''
  };

  commandeSelectionnee: Commande | null = null;

  constructor(
    private catalogueService: CatalogueService,
    private commandeService: CommandeService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerDonnees();
  }

  chargerDonnees(): void {
    this.catalogueService.getCategories().subscribe(c => (this.categories = c));
    this.catalogueService.getSousCategories().subscribe(s => (this.sousCategories = s));
    this.catalogueService.getMarques().subscribe(m => (this.marques = m));
    this.catalogueService.getProduits().subscribe(p => (this.produits = p));
    this.commandeService.getAllCommandesAdmin().subscribe(cmd => (this.commandes = cmd));
  }

  changerOnglet(tab: any): void {
    this.onglet = tab;
  }

  notify(msg: string): void {
    this.notification = msg;
    setTimeout(() => (this.notification = ''), 3000);
  }

  // --- Catégories (#2) ---
  sauvegarderCategorie(): void {
    if (this.categorieEnEdition) {
      this.catalogueService.updateCategorie(this.categorieEnEdition.id, this.catForm).subscribe(() => {
        this.notify('Catégorie modifiée avec succès !');
        this.annulerEditionCategorie();
        this.chargerDonnees();
      });
    } else {
      this.catalogueService.createCategorie(this.catForm).subscribe(() => {
        this.notify('Catégorie ajoutée avec succès !');
        this.catForm = { nom: '', description: '' };
        this.chargerDonnees();
      });
    }
  }

  editerCategorie(c: Categorie): void {
    this.categorieEnEdition = c;
    this.catForm = { nom: c.nom, description: c.description || '' };
  }

  annulerEditionCategorie(): void {
    this.categorieEnEdition = null;
    this.catForm = { nom: '', description: '' };
  }

  supprimerCategorie(id: number): void {
    this.catalogueService.deleteCategorie(id).subscribe(() => {
      this.notify('Catégorie supprimée.');
      this.chargerDonnees();
    });
  }

  // --- Produits & Stock (#8) ---
  ouvrirAjoutProduit(): void {
    this.produitEnEditionId = null;
    this.prodForm = {
      nom: '',
      prix: 0,
      stock: 10,
      categorieId: this.categories[0]?.id || 1,
      sousCategorieId: this.sousCategories[0]?.id || 1,
      marqueId: this.marques[0]?.id || 1,
      image: 'bioderma-sensibio-h2o-250ml.jpg',
      description: ''
    };
    this.onglet = 'form-produit';
  }

  ouvrirModificationProduit(p: Produit): void {
    this.produitEnEditionId = p.id;
    this.prodForm = {
      nom: p.nom,
      prix: p.prix,
      stock: p.stock,
      categorieId: p.categorie?.id || 1,
      sousCategorieId: p.sousCategorie?.id || 1,
      marqueId: p.marque?.id || 0,
      image: p.image,
      description: p.description
    };
    this.onglet = 'form-produit';
  }

  sauvegarderProduit(): void {
    if (this.produitEnEditionId) {
      this.catalogueService.updateProduit(this.produitEnEditionId, this.prodForm).subscribe(() => {
        this.notify('Produit mis à jour avec succès !');
        this.chargerDonnees();
        this.onglet = 'produits';
      });
    } else {
      this.catalogueService.createProduit(this.prodForm).subscribe(() => {
        this.notify('Nouveau produit enregistré au catalogue !');
        this.chargerDonnees();
        this.onglet = 'produits';
      });
    }
  }

  mettreAJourStock(p: Produit): void {
    this.catalogueService.updateStock(p.id, p.stock).subscribe(() => {
      this.notify(`Stock de "${p.nom}" mis à jour (${p.stock} unités) !`);
    });
  }

  supprimerProduit(id: number): void {
    this.catalogueService.deleteProduit(id).subscribe(() => {
      this.notify('Produit supprimé.');
      this.chargerDonnees();
    });
  }

  // --- Commandes (#6) ---
  changerStatutCommande(c: Commande, statut: string): void {
    this.commandeService.updateStatutCommande(c.id, statut).subscribe(updated => {
      c.statut = updated.statut;
      this.notify(`Statut de la commande #${c.id} mis à jour : ${statut}`);
    });
  }

  voirDetailCommande(c: Commande): void {
    this.commandeSelectionnee = c;
    this.onglet = 'detail-commande';
  }

  deconnexion(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
