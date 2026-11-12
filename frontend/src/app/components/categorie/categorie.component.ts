import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Categorie, Produit } from '../../models/parasoins.models';
import { CatalogueService } from '../../services/catalogue.service';
import { PanierService } from '../../services/panier.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="container" style="padding: 45px 20px;">
      <div style="text-align: center; margin-bottom: 40px;" *ngIf="categorie">
        <h2 style="font-size: 32px; color: #1e272e; margin-bottom: 8px;">{{ categorie.nom }}</h2>
        <p style="color: #636e72;">{{ categorie.description }}</p>
      </div>

      <div class="product-grid" *ngIf="produits.length > 0; else emptyCat">
        <div class="product-card" *ngFor="let p of produits">
          <a [routerLink]="['/produit', p.id]" style="text-decoration: none; color: inherit;">
            <div style="height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px;">
              <img [src]="'assets/img/' + p.image" [alt]="p.nom" style="max-height: 100%; max-width: 100%; object-fit: contain;">
            </div>
            <span style="font-size: 11px; color: #27ae60; font-weight: 700; text-transform: uppercase;">
              {{ p.marque?.nom || 'ParaSoins' }}
            </span>
            <h3 style="font-size: 15px; margin: 10px 0; height: 44px; overflow: hidden; color: #1e272e;">{{ p.nom }}</h3>
          </a>
          <div class="price-tag">{{ p.prix | number:'1.3-3' }} DT</div>
          <button *ngIf="p.stock > 0" (click)="panier.ajouterAuPanier(p, 1)" class="add-to-cart-small">
            Ajouter au panier
          </button>
        </div>
      </div>

      <ng-template #emptyCat>
        <div style="text-align: center; padding: 70px 20px; background: white; border-radius: 24px;">
          <p style="font-size: 17px; color: #636e72;">Aucun produit n'est disponible dans cette catégorie pour le moment.</p>
          <a routerLink="/" style="color: #27ae60; font-weight: 700; text-decoration: none;">← Retour à l'accueil</a>
        </div>
      </ng-template>
    </main>
  `
})
export class CategorieComponent implements OnInit {
  categorie?: Categorie;
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
        this.catalogueService.getCategorieById(id).subscribe(c => (this.categorie = c));
        this.catalogueService.getProduits({ categorieId: id }).subscribe(p => (this.produits = p));
      }
    });
  }
}
