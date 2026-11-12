import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Categorie, SousCategorie } from '../../models/parasoins.models';
import { CatalogueService } from '../../services/catalogue.service';
import { AuthService } from '../../services/auth.service';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="top-bar" style="background: #1e272e; color: #b2bec3; font-size: 12px; padding: 10px 0; text-align: center; font-weight: 500;">
      <div class="container">
        ✨ <span style="color: white;">Livraison gratuite</span> dès 100 DT | Paiement à la livraison 🚚
      </div>
    </div>

    <header style="padding: 18px 0; background: white; border-bottom: 1px solid #edf2f7;">
      <div class="container" style="display: flex; align-items: center; justify-content: space-between; gap: 20px;">
        <a routerLink="/" class="logo-container" style="text-decoration: none; display: flex; align-items: center; gap: 14px;">
          <div style="background: linear-gradient(135deg, #27ae60, #2ecc71); width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 15px rgba(39, 174, 96, 0.2);">
            <span style="color: white; font-size: 22px;">🌿</span>
          </div>
          <div style="display: flex; flex-direction: column;">
            <h1 style="margin: 0; font-family: 'Montserrat', sans-serif; font-weight: 800; color: #1e272e; font-size: 24px; letter-spacing: -1px; line-height: 1;">
              Para<span style="color: #27ae60;">Soins</span>
            </h1>
            <span style="font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; font-weight: 700; margin-top: 2px;">
              Expertise Bien-être
            </span>
          </div>
        </a>

        <div style="display: flex; gap: 18px; align-items: center;">
          <ng-container *ngIf="auth.isLoggedIn; else guestLinks">
            <a *ngIf="auth.isAdmin" routerLink="/admin/dashboard" style="text-decoration: none; color: #27ae60; font-weight: 700; font-size: 13px; background: #eafaf1; padding: 8px 14px; border-radius: 8px;">
              ⚙️ Back-office Admin
            </a>
            <a routerLink="/mon-compte" style="text-decoration: none; color: #1e272e; font-weight: 600; font-size: 14px;">
              👤 {{ auth.currentUser?.nom }}
            </a>
            <a routerLink="/mes-commandes" style="text-decoration: none; color: #64748b; font-weight: 600; font-size: 13px;">
              📦 Mes Commandes
            </a>
          </ng-container>
          <ng-template #guestLinks>
            <a routerLink="/connexion" style="text-decoration: none; color: #1e272e; font-weight: 600; font-size: 14px;">Connexion</a>
            <a routerLink="/inscription" style="text-decoration: none; color: #27ae60; font-weight: 600; font-size: 14px;">Inscription</a>
          </ng-template>

          <a routerLink="/panier" style="text-decoration: none; background: #1e272e; padding: 10px 18px; border-radius: 10px; color: white; font-weight: 600; font-size: 13px;">
            🛒 Panier ({{ panier.nombreArticles }})
          </a>
        </div>
      </div>
    </header>

    <nav class="main-nav" style="position: sticky; top: 0; z-index: 999; background: white; border-bottom: 1px solid #edf2f7; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <div class="container" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 5px;">
        <a routerLink="/" class="nav-item">🏠 ACCUEIL</a>
        <div class="dropdown" *ngFor="let cat of categories">
          <a [routerLink]="['/categorie', cat.id]" class="nav-item">{{ cat.nom | uppercase }} ▾</a>
          <div class="dropdown-content" *ngIf="cat.sousCategories && cat.sousCategories.length > 0">
            <div class="dropdown-grid">
              <div class="column" *ngFor="let grp of getGroupes(cat)">
                <h4>{{ grp }}</h4>
                <ul>
                  <li *ngFor="let sub of getSousCategoriesByGroupe(cat, grp)">
                    <a [routerLink]="['/boutique', sub.id]">{{ sub.nom }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-item {
      padding: 16px 18px;
      text-decoration: none;
      color: #1e272e;
      font-weight: 600;
      font-size: 13px;
      transition: 0.3s;
      display: inline-block;
    }
    .nav-item:hover { color: #27ae60; }
    .dropdown { position: relative; }
    .dropdown-content {
      display: none;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      min-width: 580px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.1);
      border-radius: 0 0 15px 15px;
      padding: 25px;
      border-top: 4px solid #27ae60;
      z-index: 1000;
    }
    .dropdown:hover .dropdown-content { display: block; }
    .dropdown-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .column h4 {
      color: #27ae60;
      font-size: 13px;
      margin: 0 0 10px 0;
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 6px;
      text-transform: uppercase;
    }
    .column ul { list-style: none; padding: 0; margin: 0; }
    .column ul li { margin-bottom: 8px; }
    .column ul li a { text-decoration: none; color: #718096; font-size: 13px; }
    .column ul li a:hover { color: #27ae60; }
  `]
})
export class HeaderComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(
    private catalogueService: CatalogueService,
    public auth: AuthService,
    public panier: PanierService
  ) {}

  ngOnInit(): void {
    this.catalogueService.getCategories().subscribe({
      next: data => (this.categories = data),
      error: () => (this.categories = [])
    });
  }

  getGroupes(cat: Categorie): string[] {
    if (!cat.sousCategories) return [];
    return Array.from(new Set(cat.sousCategories.map(s => s.groupe)));
  }

  getSousCategoriesByGroupe(cat: Categorie, groupe: string): SousCategorie[] {
    return (cat.sousCategories || []).filter(s => s.groupe === groupe);
  }
}
