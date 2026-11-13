import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f4f7f6; padding: 20px;">
      <div style="background: white; padding: 40px; border-radius: 25px; box-shadow: 0 15px 35px rgba(0,0,0,0.05); text-align: center; max-width: 450px; width: 100%;">
        <div style="width: 80px; height: 80px; background: #e8fcf0; color: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; margin: 0 auto 20px;">
          ✓
        </div>
        <h1>Merci pour votre commande !</h1>
        <p>Votre commande a été validée et le stock a été mis à jour sous le numéro :</p>
        <div style="background: #f1f2f6; color: #2d3436; padding: 8px 18px; border-radius: 10px; font-weight: 700; display: inline-block; margin: 10px 0;">
          N° #{{ commandeId }}
        </div>
        <p style="color: #636e72; font-size: 14px;">Vous pouvez suivre son état d'avancement dans votre espace client.</p>
        <a routerLink="/mes-commandes" style="display: block; background: #27ae60; color: white; padding: 15px; border-radius: 12px; text-decoration: none; font-weight: 600; margin-top: 22px;">
          Suivre ma commande
        </a>
        <a routerLink="/" style="display: block; color: #636e72; margin-top: 12px; text-decoration: none; font-size: 13px;">
          Continuer mes achats
        </a>
      </div>
    </div>
  `
})
export class ConfirmationComponent implements OnInit {
  commandeId = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.commandeId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
