import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie, Marque, Produit, SousCategorie } from '../models/parasoins.models';

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Catégories & Marques (Story #2)
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories`);
  }

  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/categories/${id}`);
  }

  getSousCategories(): Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>(`${this.apiUrl}/categories/sous-categories`);
  }

  getSousCategorieById(id: number): Observable<SousCategorie> {
    return this.http.get<SousCategorie>(`${this.apiUrl}/categories/sous-categories/${id}`);
  }

  getMarques(): Observable<Marque[]> {
    return this.http.get<Marque[]>(`${this.apiUrl}/marques`);
  }

  createCategorie(cat: Partial<Categorie>): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.apiUrl}/admin/categories`, cat);
  }

  updateCategorie(id: number, cat: Partial<Categorie>): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/admin/categories/${id}`, cat);
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/categories/${id}`);
  }

  // Produits & Stock (Story #8)
  getProduits(params?: { categorieId?: number; sousCategorieId?: number; marqueId?: number }): Observable<Produit[]> {
    let query = '';
    if (params?.categorieId) query = `?categorieId=${params.categorieId}`;
    else if (params?.sousCategorieId) query = `?sousCategorieId=${params.sousCategorieId}`;
    else if (params?.marqueId) query = `?marqueId=${params.marqueId}`;
    return this.http.get<Produit[]>(`${this.apiUrl}/produits${query}`);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/produits/${id}`);
  }

  createProduit(payload: any): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/admin/produits`, payload);
  }

  updateProduit(id: number, payload: any): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/admin/produits/${id}`, payload);
  }

  updateStock(id: number, stock: number): Observable<Produit> {
    return this.http.patch<Produit>(`${this.apiUrl}/admin/produits/${id}/stock`, { stock });
  }

  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/produits/${id}`);
  }
}
