import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Produit } from '../../models/parasoins.models';
import { CatalogueService } from '../../services/catalogue.service';
import { PanierService } from '../../services/panier.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-produit-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="container" *ngIf="produit" style="padding: 40px 20px;">
      <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); display: flex; gap: 40px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 280px; text-align: center;">
          <img [src]="'assets/img/' + produit.image" [alt]="produit.nom" style="max-width: 100%; max-height: 360px; object-fit: contain; border-radius: 15px;">
        </div>

        <div style="flex: 1.3; min-width: 300px;">
          <span style="color: #27ae60; font-weight: 700; text-transform: uppercase; font-size: 13px;">
            {{ produit.marque?.nom || 'ParaSoins' }}
          </span>
          <h1 style="margin: 8px 0 15px 0; color: #1e272e; font-size: 26px;">{{ produit.nom }}</h1>

          <div style="font-size: 32px; font-weight: 800; color: #27ae60; margin: 15px 0;">
            {{ produit.prix | number:'1.3-3' }} <span style="font-size: 18px; font-weight: 500;">DT</span>
          </div>

          <div *ngIf="produit.stock > 0"
               [style.background]="produit.stock < 5 ? '#fff4e6' : '#e8fcf0'"
               [style.color]="produit.stock < 5 ? '#e67e22' : '#27ae60'"
               style="display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 20px;">
            ● {{ produit.stock < 5 ? 'Plus que ' + produit.stock + ' articles en stock !' : 'En stock (' + produit.stock + ' disponibles)' }}
          </div>
          <div *ngIf="produit.stock <= 0" style="display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; background: #ffeef0; color: #d63031; margin-bottom: 20px;">
            ● Actuellement indisponible
          </div>

          <p style="color: #636e72; line-height: 1.7; margin-bottom: 25px;">{{ produit.description }}</p>

          <div *ngIf="produit.stock > 0" style="display: flex; align-items: center; gap: 15px;">
            <div style="display: flex; align-items: center; border: 2px solid #edf2f7; border-radius: 12px; overflow: hidden;">
              <button (click)="changerQte(-1)" style="padding: 12px 16px; border: none; background: white; cursor: pointer; font-weight: bold;">-</button>
              <span style="width: 45px; text-align: center; font-weight: 700;">{{ quantite }}</span>
              <button (click)="changerQte(1)" style="padding: 12px 16px; border: none; background: white; cursor: pointer; font-weight: bold;">+</button>
            </div>
            <button (click)="ajouter()" class="add-to-cart-small" style="flex: 1;">
              🛒 AJOUTER AU PANIER
            </button>
          </div>

          <div *ngIf="message" style="margin-top: 15px; padding: 12px; border-radius: 10px; background: #dcfce7; color: #166534; font-weight: 600;">
            {{ message }}
          </div>
        </div>
      </div>
    </main>
  `
})
export class ProduitDetailComponent implements OnInit {
  produit?: Produit;
  quantite = 1;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.catalogueService.getProduitById(id).subscribe(p => (this.produit = p));
    }
  }

  changerQte(delta: number): void {
    if (!this.produit) return;
    const next = this.quantite + delta;
    if (next >= 1 && next <= this.produit.stock) {
      this.quantite = next;
    }
  }

  ajouter(): void {
    if (!this.produit) return;
    const res = this.panierService.ajouterAuPanier(this.produit, this.quantite);
    this.message = res.message;
  }
}
