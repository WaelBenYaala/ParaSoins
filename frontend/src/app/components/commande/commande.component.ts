import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { AuthService } from '../../services/auth.service';
import { CommandeService } from '../../services/commande.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>

    <main class="container" style="padding: 40px 20px;">
      <div style="display: flex; gap: 35px; flex-wrap: wrap; align-items: flex-start;">
        <div style="flex: 2; min-width: 320px; background: white; padding: 35px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.04);">
          <h2 style="margin-top: 0; font-size: 24px; color: #0f172a;">Livraison & Mode de Paiement</h2>
          <p style="color: #64748b; margin-bottom: 25px;">Renseignez vos coordonnées de livraison et choisissez votre mode de paiement.</p>

          <div *ngIf="erreur" style="background: #fee2e2; color: #991b1b; padding: 14px; border-radius: 12px; margin-bottom: 20px; font-weight: 600;">
            ⚠️ {{ erreur }}
          </div>

          <form (ngSubmit)="validerCommande()">
            <div style="margin-bottom: 18px;">
              <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Nom Complet</label>
              <input type="text" [(ngModel)]="nomClient" name="nomClient" required placeholder="Votre nom et prénom"
                     style="width: 100%; padding: 13px; border: 2px solid #f1f5f9; border-radius: 12px;">
            </div>

            <div style="margin-bottom: 18px;">
              <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Téléphone Mobile (Tunisie)</label>
              <input type="tel" [(ngModel)]="telephone" name="telephone" required placeholder="Ex: 22 123 456"
                     style="width: 100%; padding: 13px; border: 2px solid #f1f5f9; border-radius: 12px;">
            </div>

            <div style="margin-bottom: 18px;">
              <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Adresse de livraison précise</label>
              <textarea [(ngModel)]="adresse" name="adresse" rows="3" required placeholder="Rue, Ville, Gouvernorat..."
                        style="width: 100%; padding: 13px; border: 2px solid #f1f5f9; border-radius: 12px; font-family: inherit;"></textarea>
            </div>

            <div style="margin-bottom: 22px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Mode de paiement (Story #5)</label>
              <select [(ngModel)]="modePaiement" name="modePaiement"
                      style="width: 100%; padding: 13px; border: 2px solid #f1f5f9; border-radius: 12px; font-weight: 600;">
                <option value="PAIEMENT_LIVRAISON">🤝 Paiement en espèces à la livraison</option>
                <option value="CARTE_BANCAIRE">💳 Carte Bancaire (Simulation sécurisée)</option>
              </select>
            </div>

            <button type="submit" style="width: 100%; background: #0f172a; color: white; border: none; padding: 18px; border-radius: 14px; font-weight: 700; cursor: pointer; font-size: 15px;">
              VALIDER MA COMMANDE
            </button>
          </form>
        </div>

        <div style="flex: 1.1; min-width: 280px; background: white; padding: 30px; border-radius: 24px; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0; font-size: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 14px;">Résumé de la commande</h3>

          <div *ngFor="let item of panier.items" style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
            <span style="color: #64748b;">{{ item.quantite }}x {{ item.produit.nom | slice:0:26 }}...</span>
            <span style="font-weight: 600;">{{ (item.produit.prix * item.quantite) | number:'1.3-3' }} DT</span>
          </div>

          <div style="background: #f8fafc; padding: 18px; border-radius: 14px; margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;">
              <span>Sous-total articles</span>
              <span>{{ panier.sousTotal | number:'1.3-3' }} DT</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;">
              <span>Frais de livraison</span>
              <span style="font-weight: 700; color: #27ae60;">
                {{ panier.fraisLivraison === 0 ? 'GRATUITE' : (panier.fraisLivraison | number:'1.3-3') + ' DT' }}
              </span>
            </div>
            <div style="border-top: 2px solid #e2e8f0; padding-top: 14px; margin-top: 12px; display: flex; justify-content: space-between; font-weight: 800; font-size: 20px;">
              <span>Total TTC</span>
              <span style="color: #27ae60;">{{ panier.totalTtc | number:'1.3-3' }} DT</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class CommandeComponent implements OnInit {
  nomClient = '';
  telephone = '';
  adresse = '';
  modePaiement = 'PAIEMENT_LIVRAISON';
  erreur = '';

  constructor(
    public panier: PanierService,
    private auth: AuthService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.panier.items.length === 0) {
      this.router.navigate(['/']);
      return;
    }
    const u = this.auth.currentUser;
    if (u) {
      this.nomClient = u.nom;
      this.telephone = u.telephone || '';
      this.adresse = u.adresse || '';
    }
  }

  validerCommande(): void {
    this.erreur = '';
    const articles = this.panier.items.map(i => ({
      produitId: i.produit.id,
      quantite: i.quantite
    }));

    this.commandeService.passerCommande({
      clientId: this.auth.currentUser?.id,
      nomClient: this.nomClient,
      telephone: this.telephone,
      adresse: this.adresse,
      modePaiement: this.modePaiement,
      articles
    }).subscribe({
      next: cmd => {
        this.panier.viderPanier();
        this.router.navigate(['/confirmation', cmd.id]);
      },
      error: err => {
        this.erreur = err.error?.message || 'Erreur lors de la validation de la commande.';
      }
    });
  }
}
