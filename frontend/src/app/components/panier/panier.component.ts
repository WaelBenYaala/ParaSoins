import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="container" style="padding: 40px 20px;">
      <h2 style="text-align: center; font-size: 34px; color: #2d3436; margin-bottom: 35px;">Mon Panier</h2>

      <ng-container *ngIf="panier.items.length > 0; else emptyCart">
        <div style="background: white; border-radius: 24px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); margin-bottom: 35px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid #f1f5f9; color: #636e72;">
                <th style="padding: 15px; text-align: left;">Produit</th>
                <th style="padding: 15px; text-align: left;">Désignation</th>
                <th style="padding: 15px; text-align: left;">Prix</th>
                <th style="padding: 15px; text-align: left;">Quantité</th>
                <th style="padding: 15px; text-align: left;">Sous-total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of panier.items" style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 18px 15px;">
                  <img [src]="'assets/img/' + item.produit.image" style="width: 65px; height: 65px; object-fit: contain; border-radius: 10px;">
                </td>
                <td style="padding: 18px 15px; font-weight: 600; color: #2d3436;">{{ item.produit.nom }}</td>
                <td style="padding: 18px 15px; color: #636e72;">{{ item.produit.prix | number:'1.3-3' }} DT</td>
                <td style="padding: 18px 15px;">
                  <div style="display: flex; align-items: center; background: #f1f2f6; border-radius: 12px; padding: 5px; width: fit-content;">
                    <button (click)="panier.modifierQuantite(item.produit.id, -1)"
                            style="background: white; border: none; width: 30px; height: 30px; border-radius: 8px; cursor: pointer; font-weight: bold;">-</button>
                    <span style="width: 35px; text-align: center; font-weight: 700;">{{ item.quantite }}</span>
                    <button (click)="panier.modifierQuantite(item.produit.id, 1)"
                            [disabled]="item.quantite >= item.produit.stock"
                            style="background: white; border: none; width: 30px; height: 30px; border-radius: 8px; cursor: pointer; font-weight: bold;">+</button>
                  </div>
                </td>
                <td style="padding: 18px 15px; font-weight: 700; color: #2d3436;">
                  {{ (item.produit.prix * item.quantite) | number:'1.3-3' }} DT
                </td>
                <td style="padding: 18px 15px; text-align: right;">
                  <button (click)="panier.supprimerArticle(item.produit.id)"
                          style="background: #fff5f5; border: none; color: #e74c3c; width: 38px; height: 38px; border-radius: 10px; cursor: pointer;">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="background: #1e272e; color: white; padding: 30px; border-radius: 24px; text-align: right; box-shadow: 0 15px 35px rgba(0,0,0,0.15);">
          <p style="margin: 0; opacity: 0.8;">Total de votre panier (hors livraison)</p>
          <div style="font-size: 32px; font-weight: 800; color: #27ae60; margin: 10px 0;">
            {{ panier.sousTotal | number:'1.3-3' }} DT
          </div>
          <p style="font-size: 12px; margin-bottom: 20px; opacity: 0.7;">
            {{ panier.fraisLivraison === 0 ? '✨ Livraison GRATUITE incluse (commande ≥ 100 DT)' : 'Livraison : 7.000 DT (Gratuite dès 100 DT)' }}
          </p>
          <a routerLink="/commande" style="background: #27ae60; color: white; padding: 16px 40px; border-radius: 14px; display: inline-block; font-weight: 700; text-decoration: none;">
            FINALISER LA COMMANDE →
          </a>
        </div>
      </ng-container>

      <ng-template #emptyCart>
        <div style="text-align: center; padding: 75px 20px; background: white; border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          <div style="font-size: 70px; margin-bottom: 15px;">🛒</div>
          <h3 style="font-size: 24px; color: #2d3436;">Votre panier est vide</h3>
          <p style="color: #636e72; margin-bottom: 25px;">Découvrez notre sélection de soins dermatologiques et bien-être.</p>
          <a routerLink="/" style="background: #27ae60; color: white; padding: 15px 35px; border-radius: 14px; text-decoration: none; font-weight: 700;">
            RETOUR À LA BOUTIQUE
          </a>
        </div>
      </ng-template>
    </main>
  `
})
export class PanierComponent {
  constructor(public panier: PanierService) {}
}
