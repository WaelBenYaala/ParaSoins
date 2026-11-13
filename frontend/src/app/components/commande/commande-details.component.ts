import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Commande } from '../../models/parasoins.models';
import { CommandeService } from '../../services/commande.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-commande-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>

    <div class="container" style="max-width: 720px; margin: 45px auto;" *ngIf="commande">
      <a routerLink="/mes-commandes" style="text-decoration: none; color: #64748b; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px;">
        ← Retour à mes commandes
      </a>

      <div style="background: white; border-radius: 24px; padding: 38px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 18px; border-bottom: 2px solid #f8fafc;">
          <div>
            <h2 style="margin: 0;">Commande #{{ commande.id }}</h2>
            <span style="font-size: 13px; color: #94a3b8;">Passée le {{ commande.dateCommande | date:'dd/MM/yyyy à HH:mm' }}</span>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 11px; text-transform: uppercase; color: #94a3b8; display: block; margin-bottom: 4px;">Statut actuel</span>
            <span style="font-weight: 700; color: #27ae60; background: #eafaf1; padding: 6px 12px; border-radius: 8px; font-size: 12px;">
              {{ commande.statut }}
            </span>
          </div>
        </div>

        <h4 style="margin-bottom: 15px;">Articles commandés</h4>
        <div *ngFor="let item of commande.lignes" style="display: flex; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f5f9;">
          <img [src]="'assets/img/' + item.produit.image" style="width: 65px; height: 65px; object-fit: contain; border-radius: 12px; margin-right: 18px;">
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 15px;">{{ item.produit.nom }}</div>
            <div style="font-size: 13px; color: #64748b;">
              Prix : {{ item.prixUnitaire | number:'1.3-3' }} DT • Qté : {{ item.quantite }}
            </div>
          </div>
          <div style="font-weight: 700;">
            {{ (item.prixUnitaire * item.quantite) | number:'1.3-3' }} DT
          </div>
        </div>

        <div style="margin-top: 25px; background: #f8fafc; padding: 20px; border-radius: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
            <span>Frais de livraison</span>
            <span>{{ commande.fraisLivraison === 0 ? 'OFFERTS' : (commande.fraisLivraison | number:'1.3-3') + ' DT' }}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-weight: 800; font-size: 20px; color: #27ae60;">
            <span>Total TTC</span>
            <span>{{ commande.totalCommande | number:'1.3-3' }} DT</span>
          </div>
        </div>

        <div style="margin-top: 25px; padding: 18px; border: 1px dashed #e2e8f0; border-radius: 14px;">
          <h5 style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase;">Adresse de livraison</h5>
          <p style="margin: 0; font-size: 14px; font-weight: 500;">{{ commande.adresse }}</p>
        </div>
      </div>
    </div>
  `
})
export class CommandeDetailsComponent implements OnInit {
  commande?: Commande;

  constructor(private route: ActivatedRoute, private commandeService: CommandeService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.commandeService.getCommandeById(id).subscribe(c => (this.commande = c));
    }
  }
}
