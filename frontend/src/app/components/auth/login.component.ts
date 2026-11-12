import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 20px;">
      <div style="width: 100%; max-width: 420px; background: rgba(255,255,255,0.92); padding: 40px; border-radius: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center;">
        <h1 style="font-size: 28px; color: #2d3436; margin: 0 0 25px 0;">Para<span style="color: #27ae60;">Soins</span></h1>
        <h2 style="font-size: 22px; color: #2d3436; margin-bottom: 8px;">Bon retour !</h2>
        <p style="color: #636e72; font-size: 14px; margin-bottom: 25px;">Connectez-vous pour accéder à votre espace sécurisé.</p>

        <div *ngIf="erreur" style="background: #fff1f0; color: #e74c3c; padding: 12px; border-radius: 12px; font-size: 13px; margin-bottom: 20px; border: 1px solid #ffa39e;">
          ⚠️ {{ erreur }}
        </div>

        <form (ngSubmit)="seConnecter()">
          <div style="text-align: left; margin-bottom: 18px;">
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">Adresse e-mail</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="exemple@parasoins.tn"
                   style="width: 100%; padding: 14px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 14px;">
          </div>

          <div style="text-align: left; margin-bottom: 20px;">
            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">Mot de passe</label>
            <input type="password" [(ngModel)]="motDePasse" name="motDePasse" required placeholder="••••••••"
                   style="width: 100%; padding: 14px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 14px;">
          </div>

          <button type="submit" style="width: 100%; background: #27ae60; color: white; padding: 15px; border: none; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer;">
            SE CONNECTER
          </button>
        </form>

        <div style="margin-top: 25px; font-size: 14px; color: #636e72;">
          Pas encore membre ? <a routerLink="/inscription" style="color: #27ae60; font-weight: 600; text-decoration: none;">Créer un compte</a>
        </div>
        <a routerLink="/" style="display: inline-block; margin-top: 15px; font-size: 13px; color: #636e72; text-decoration: none;">← Retour à la boutique</a>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  motDePasse = '';
  erreur = '';

  constructor(private auth: AuthService, private router: Router) {}

  seConnecter(): void {
    this.erreur = '';
    this.auth.login(this.email, this.motDePasse).subscribe({
      next: user => {
        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: err => {
        this.erreur = err.error?.message || 'Email ou mot de passe incorrect.';
      }
    });
  }
}
