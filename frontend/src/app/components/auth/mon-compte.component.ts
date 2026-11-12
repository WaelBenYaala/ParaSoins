import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-mon-compte',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>

    <div class="container" style="margin: 45px auto;">
      <div style="display: grid; grid-template-columns: 260px 1fr; gap: 35px;">
        <aside style="background: white; padding: 25px 18px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); height: fit-content;">
          <a routerLink="/mon-compte" style="display: block; padding: 13px 16px; background: #27ae60; color: white; text-decoration: none; border-radius: 12px; font-weight: 600; margin-bottom: 8px;">
            👤 Mon Profil
          </a>
          <a routerLink="/mes-commandes" style="display: block; padding: 13px 16px; color: #2d3436; text-decoration: none; border-radius: 12px; font-weight: 500; margin-bottom: 8px;">
            📦 Mes Commandes
          </a>
          <button (click)="deconnexion()" style="width: 100%; text-align: left; padding: 13px 16px; background: none; border: none; color: #e74c3c; font-weight: 600; cursor: pointer; font-family: inherit; font-size: 14px;">
            🚪 Déconnexion
          </button>
        </aside>

        <section>
          <div *ngIf="successMsg" style="background: #dcfce7; color: #166534; padding: 14px; border-radius: 12px; margin-bottom: 20px; font-weight: 600; text-align: center;">
            ✅ {{ successMsg }}
          </div>
          <div *ngIf="errorMsg" style="background: #fee2e2; color: #991b1b; padding: 14px; border-radius: 12px; margin-bottom: 20px; font-weight: 600; text-align: center;">
            ⚠️ {{ errorMsg }}
          </div>

          <div style="background: white; padding: 32px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); margin-bottom: 25px;">
            <h3 style="margin-top: 0;">📝 Informations Générales</h3>
            <form (ngSubmit)="enregistrerProfil()">
              <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 13px; font-weight: 600; color: #636e72; margin-bottom: 6px;">Nom Complet</label>
                <input type="text" [(ngModel)]="nom" name="nom" required style="width: 100%; padding: 13px; border: 1px solid #e1e8ef; border-radius: 12px;">
              </div>
              <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 13px; font-weight: 600; color: #636e72; margin-bottom: 6px;">Numéro de Téléphone</label>
                <input type="text" [(ngModel)]="telephone" name="telephone" required style="width: 100%; padding: 13px; border: 1px solid #e1e8ef; border-radius: 12px;">
              </div>
              <div style="margin-bottom: 18px;">
                <label style="display: block; font-size: 13px; font-weight: 600; color: #636e72; margin-bottom: 6px;">Adresse de Livraison par défaut</label>
                <textarea [(ngModel)]="adresse" name="adresse" rows="3" required style="width: 100%; padding: 13px; border: 1px solid #e1e8ef; border-radius: 12px; font-family: inherit;"></textarea>
              </div>
              <button type="submit" style="background: #27ae60; color: white; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 600; cursor: pointer; width: 100%;">
                Enregistrer les modifications
              </button>
            </form>
          </div>

          <div style="background: white; padding: 32px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border-top: 4px solid #1e272e;">
            <h3 style="margin-top: 0;">🔐 Sécurité du compte</h3>
            <form (ngSubmit)="changerMotDePasse()">
              <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 13px; font-weight: 600; color: #636e72; margin-bottom: 6px;">Ancien mot de passe</label>
                <input type="password" [(ngModel)]="oldPassword" name="oldPassword" required style="width: 100%; padding: 13px; border: 1px solid #e1e8ef; border-radius: 12px;">
              </div>
              <div style="margin-bottom: 18px;">
                <label style="display: block; font-size: 13px; font-weight: 600; color: #636e72; margin-bottom: 6px;">Nouveau mot de passe</label>
                <input type="password" [(ngModel)]="newPassword" name="newPassword" required minlength="6" style="width: 100%; padding: 13px; border: 1px solid #e1e8ef; border-radius: 12px;">
              </div>
              <button type="submit" style="background: #1e272e; color: white; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 600; cursor: pointer; width: 100%;">
                Changer mon mot de passe
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  `
})
export class MonCompteComponent implements OnInit {
  nom = '';
  telephone = '';
  adresse = '';
  oldPassword = '';
  newPassword = '';
  successMsg = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const u = this.auth.currentUser;
    if (u) {
      this.nom = u.nom;
      this.telephone = u.telephone || '';
      this.adresse = u.adresse || '';
    }
  }

  enregistrerProfil(): void {
    const u = this.auth.currentUser;
    if (!u) return;
    this.successMsg = '';
    this.errorMsg = '';
    this.auth.updateProfile(u.id, { nom: this.nom, telephone: this.telephone, adresse: this.adresse }).subscribe({
      next: res => (this.successMsg = res.message || 'Informations enregistrées avec succès !'),
      error: err => (this.errorMsg = err.error?.message || 'Erreur lors de la mise à jour.')
    });
  }

  changerMotDePasse(): void {
    const u = this.auth.currentUser;
    if (!u) return;
    this.successMsg = '';
    this.errorMsg = '';
    this.auth.updatePassword(u.id, this.oldPassword, this.newPassword).subscribe({
      next: res => {
        this.successMsg = res.message || 'Mot de passe modifié avec succès !';
        this.oldPassword = '';
        this.newPassword = '';
      },
      error: err => (this.errorMsg = err.error?.message || 'Ancien mot de passe incorrect.')
    });
  }

  deconnexion(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
