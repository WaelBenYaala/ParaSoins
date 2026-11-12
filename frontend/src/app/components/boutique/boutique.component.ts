import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Produit, SousCategorie } from '../../models/parasoins.models';
import { CatalogueService } from '../../services/catalogue.service';
import { PanierService } from '../../services/panier.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="container" style="padding: 35px 20px;">
      <div style="background: white; padding: 35px; border-radius: 20px; text-align: center; margin-bottom: 35px;" *ngIf="sousCategorie">
        <span style="color: #27ae60; font-weight: 700; font-size: 12px; text-transform: uppercase;">{{ sousCategorie.groupe }}</span>
        <h2 style="font-size: 28px; color: #0f172a; margin: 8px 0;">{{ sousCategorie.nom }}</h2>
        <p style="color: #475569; margin: 0;">Nous avons sélectionné pour vous {{ produits.length }} produit(s) expert(s).</p>
      </div>

      <div class="product-grid">
        <div class="product-card" *ngFor="let p of produits">
          <a [routerLink]="['/produit', p.id]" style="text-decoration: none; color: inherit;">
            <div style="height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <img [src]="'assets/img/' + p.image" [alt]="p.nom" style="max-height: 100%; max-width: 100%; object-fit: contain;">
            </div>
            <span style="font-size: 11px; color: #3b82f6; background: #eff6ff; padding: 4px 10px; border-radius: 20px; font-weight: 700;">
              {{ p.marque?.nom || 'Soin Expert' }}
            </span>
            <h3 style="font-size: 15px; margin: 10px 0; height: 44px; overflow: hidden; color: #0f172a;">{{ p.nom }}</h3>
          </a>
          <div class="price-tag">{{ p.prix | number:'1.3-3' }} DT</div>
          <button *ngIf="p.stock > 0" (click)="panier.ajouterAuPanier(p, 1)" class="add-to-cart-small">
            + Ajouter au panier
          </button>
        </div>
      </div>
    </main>
  `
})
export class BoutiqueComponent implements OnInit {
  sousCategorie?: SousCategorie;
  produits: Produit[] = [];

  constructor(
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    public panier: PanierService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.catalogueService.getSousCategorieById(id).subscribe(s => (this.sousCategorie = s));
        this.catalogueService.getProduits({ sousCategorieId: id }).subscribe(p => (this.produits = p));
      }
    });
  }
}
