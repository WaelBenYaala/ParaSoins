import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../models/parasoins.models';

@Injectable({ providedIn: 'root' })
export class CommandeService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  passerCommande(payload: {
    clientId?: number;
    nomClient: string;
    telephone: string;
    adresse: string;
    modePaiement: string;
    articles: { produitId: number; quantite: number }[];
  }): Observable<Commande> {
    return this.http.post<Commande>(`${this.apiUrl}/commandes`, payload);
  }

  getCommandesClient(clientId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/commandes/client/${clientId}`);
  }

  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/commandes/${id}`);
  }

  getAllCommandesAdmin(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/admin/commandes`);
  }

  updateStatutCommande(id: number, statut: string): Observable<Commande> {
    return this.http.patch<Commande>(`${this.apiUrl}/admin/commandes/${id}/statut`, { statut });
  }
}
