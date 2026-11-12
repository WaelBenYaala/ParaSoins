import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: #f1f5f9;">
      <div style="width: 100%; max-width: 400px; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); text-align: center;">
        <div style="font-size: 24px; font-weight: 700; color: #1e293b; margin-bottom: 8px;">
          Para<span style="color: #27ae60;">Soins</span>
        </div>
        <h2 style="color: #64748b; font-size: 15px; margin-bottom: 28px; font-weight: 500;">Panel d'administration</h2>

        <div *ngIf="erreur" style="background: #fef2f2; color: #b91c1c; padding: 12px; border-radius: 8px; font-size: 13px; margin-bottom: 20px;">
          ⚠️ {{ erreur }}
        </div>

        <form (ngSubmit)="connexionAdmin()">
          <div style="text-align: left; margin-bottom: 18px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 6px;">Email Administrateur</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="admin@parasoins.tn"
                   style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px;">
          </div>

          <div style="text-align: left; margin-bottom: 20px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 6px;">Mot de passe</label>
            <input type="password" [(ngModel)]="motDePasse" name="motDePasse" required placeholder="••••••••"
                   style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px;">
          </div>

          <button type="submit" style="background: #1e293b; color: white; border: none; padding: 14px; width: 100%; border-radius: 10px; font-weight: 600; cursor: pointer;">
            Accéder au Dashboard
          </button>
        </form>

        <div style="margin-top: 22px; font-size: 13px;">
          <a routerLink="/" style="color: #27ae60; text-decoration: none;">← Retour au site public</a>
        </div>
      </div>
    </div>
  `
})
export class AdminLoginComponent {
  email = 'admin@parasoins.tn';
  motDePasse = '';
  erreur = '';

  constructor(private auth: AuthService, private router: Router) {}

  connexionAdmin(): void {
    this.erreur = '';
    this.auth.login(this.email, this.motDePasse).subscribe({
      next: user => {
        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.erreur = 'Accès refusé : Rôle Administrateur requis.';
        }
      },
      error: () => (this.erreur = 'Accès refusé : Identifiants incorrects.')
    });
  }
}
