import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { InscriptionComponent } from './components/auth/inscription.component';
import { MonCompteComponent } from './components/auth/mon-compte.component';
import { AdminLoginComponent } from './components/admin/admin-login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'mon-compte', component: MonCompteComponent, canActivate: [authGuard] },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: '**', redirectTo: 'connexion' }
];
