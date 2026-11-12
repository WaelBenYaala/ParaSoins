import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Produit } from '../models/parasoins.models';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private readonly storageKey = 'parasoins_panier';
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  public items$ = this.itemsSubject.asObservable();

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  private loadCart(): CartItem[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  ajouterAuPanier(produit: Produit, quantite: number = 1): { success: boolean; message: string } {
    const current = [...this.items];
    const index = current.findIndex(i => i.produit.id === produit.id);
    const dejaAuPanier = index >= 0 ? current[index].quantite : 0;

    if (dejaAuPanier + quantite > produit.stock) {
      return {
        success: false,
        message: `Stock limité : il ne reste que ${produit.stock} unité(s) de "${produit.nom}".`
      };
    }

    if (index >= 0) {
      current[index].quantite += quantite;
    } else {
      current.push({ produit, quantite });
    }

    this.saveCart(current);
    return { success: true, message: 'Produit ajouté au panier !' };
  }

  modifierQuantite(produitId: number, delta: number): void {
    const current = [...this.items];
    const index = current.findIndex(i => i.produit.id === produitId);
    if (index < 0) return;

    const nouvelleQte = current[index].quantite + delta;
    if (nouvelleQte <= 0) {
      current.splice(index, 1);
    } else if (nouvelleQte <= current[index].produit.stock) {
      current[index].quantite = nouvelleQte;
    }
    this.saveCart(current);
  }

  supprimerArticle(produitId: number): void {
    const filtered = this.items.filter(i => i.produit.id !== produitId);
    this.saveCart(filtered);
  }

  viderPanier(): void {
    this.saveCart([]);
  }

  get nombreArticles(): number {
    return this.items.reduce((acc, item) => acc + item.quantite, 0);
  }

  get sousTotal(): number {
    return this.items.reduce((acc, item) => acc + item.produit.prix * item.quantite, 0);
  }

  get fraisLivraison(): number {
    if (this.items.length === 0) return 0;
    return this.sousTotal >= 100 ? 0 : 7;
  }

  get totalTtc(): number {
    return this.sousTotal + this.fraisLivraison;
  }
}
