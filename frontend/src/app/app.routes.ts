import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { BoutiqueComponent } from './components/boutique/boutique.component';
import { ProduitDetailComponent } from './components/produit-detail/produit-detail.component';
import { LoginComponent } from './components/auth/login.component';
import { InscriptionComponent } from './components/auth/inscription.component';
import { MonCompteComponent } from './components/auth/mon-compte.component';
import { AdminLoginComponent } from './components/admin/admin-login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categorie/:id', component: CategorieComponent },
  { path: 'boutique/:id', component: BoutiqueComponent },
  { path: 'produit/:id', component: ProduitDetailComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'mon-compte', component: MonCompteComponent, canActivate: [authGuard] },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
