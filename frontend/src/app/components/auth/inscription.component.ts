import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 30px 20px;">
      <div style="width: 100%; max-width: 480px; background: rgba(255,255,255,0.92); padding: 40px; border-radius: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="font-size: 28px; color: #2d3436; margin: 0;">Para<span style="color: #27ae60;">Soins</span></h1>
          <h2 style="font-size: 22px; color: #2d3436; margin: 10px 0 5px;">Créer un compte</h2>
          <p style="color: #636e72; font-size: 14px; margin: 0;">Profitez de nos conseils d'experts et suivez vos commandes.</p>
        </div>

        <div *ngIf="erreur" style="background: #fff1f0; color: #e74c3c; padding: 12px; border-radius: 12px; font-size: 13px; margin-bottom: 20px; text-align: center;">
          ⚠️ {{ erreur }}
        </div>

        <form (ngSubmit)="inscrire()">
          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px;">Nom et Prénom</label>
            <input type="text" [(ngModel)]="nom" name="nom" required placeholder="Malik Hnaien"
                   style="width: 100%; padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 12px;">
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px;">Adresse e-mail</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="malik@exemple.com"
                   style="width: 100%; padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 12px;">
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px;">Téléphone</label>
            <input type="tel" [(ngModel)]="telephone" name="telephone" required placeholder="22 000 000"
                   style="width: 100%; padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 12px;">
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px;">Adresse de livraison</label>
            <textarea [(ngModel)]="adresse" name="adresse" rows="2" required placeholder="Votre adresse complète..."
                      style="width: 100%; padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 12px; font-family: inherit;"></textarea>
          </div>

          <div style="margin-bottom: 18px;">
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px;">Mot de passe</label>
            <input type="password" [(ngModel)]="motDePasse" name="motDePasse" required minlength="6" placeholder="6 caractères minimum"
                   style="width: 100%; padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 12px;">
          </div>

          <button type="submit" style="width: 100%; background: #27ae60; color: white; padding: 15px; border: none; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer;">
            S'INSCRIRE MAINTENANT
          </button>
        </form>

        <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #636e72;">
          Déjà inscrit ? <a routerLink="/connexion" style="color: #27ae60; font-weight: 600; text-decoration: none;">Connectez-vous ici</a>
        </div>
      </div>
    </div>
  `
})
export class InscriptionComponent {
  nom = '';
  email = '';
  telephone = '';
  adresse = '';
  motDePasse = '';
  erreur = '';

  constructor(private auth: AuthService, private router: Router) {}

  inscrire(): void {
    this.erreur = '';
    this.auth.register({
      nom: this.nom,
      email: this.email,
      telephone: this.telephone,
      adresse: this.adresse,
      motDePasse: this.motDePasse
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => (this.erreur = err.error?.message || 'Erreur lors de la création du compte.')
    });
  }
}
