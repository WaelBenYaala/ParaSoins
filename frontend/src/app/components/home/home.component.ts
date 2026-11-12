import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Produit } from '../../models/parasoins.models';
import { CatalogueService } from '../../services/catalogue.service';
import { PanierService } from '../../services/panier.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="container" style="padding: 50px 20px;">
      <div style="text-align: center; margin-bottom: 45px;">
        <span style="color: #27ae60; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">
          Sélection Experte Parapharmacie
        </span>
        <h2 style="font-family: 'Montserrat', sans-serif; font-size: 32px; color: #1e272e; margin: 10px 0;">
          ✨ Nos Produits & Nouveautés ✨
        </h2>
        <div style="width: 60px; height: 3px; background: #27ae60; margin: 0 auto;"></div>
      </div>

      <div *ngIf="notification" style="background: #dcfce7; color: #166534; padding: 12px 20px; border-radius: 12px; margin-bottom: 25px; text-align: center; font-weight: 600;">
        ✅ {{ notification }}
      </div>

      <div class="product-grid">
        <div class="product-card" *ngFor="let p of produits">
          <a [routerLink]="['/produit', p.id]" style="text-decoration: none; color: inherit; display: block;">
            <div style="height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px;">
              <img [src]="'assets/img/' + p.image" [alt]="p.nom" style="max-height: 100%; max-width: 100%; object-fit: contain;">
            </div>
            <span style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase;">
              {{ p.marque?.nom || 'ParaSoins' }}
            </span>
            <h3 style="font-size: 15px; margin: 10px 0; height: 44px; overflow: hidden; color: #1e272e; font-weight: 600;">
              {{ p.nom }}
            </h3>
          </a>

          <div>
            <div class="price-tag">{{ p.prix | number:'1.3-3' }} DT</div>
            <button *ngIf="p.stock > 0" (click)="ajouter(p)" class="add-to-cart-small">
              Ajouter au panier
            </button>
            <button *ngIf="p.stock <= 0" disabled style="background: #f1f5f9; color: #94a3b8; border: none; padding: 14px; border-radius: 12px; width: 100%; cursor: not-allowed; font-weight: 600;">
              Indisponible
            </button>
          </div>
        </div>
      </div>
    </main>
  `
})
export class HomeComponent implements OnInit {
  produits: Produit[] = [];
  notification = '';

  constructor(
    private catalogueService: CatalogueService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.catalogueService.getProduits().subscribe(data => (this.produits = data));
  }

  ajouter(p: Produit): void {
    const res = this.panierService.ajouterAuPanier(p, 1);
    this.notification = res.message;
    setTimeout(() => (this.notification = ''), 2500);
  }
}
