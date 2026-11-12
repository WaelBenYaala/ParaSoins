import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/parasoins.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly storageKey = 'parasoins_user';
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadStoredUser(): User | null {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : null;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser?.token;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  login(email: string, motDePasse: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, motDePasse }).pipe(
      tap(user => {
        localStorage.setItem(this.storageKey, JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  register(payload: { nom: string; email: string; motDePasse: string; telephone: string; adresse: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, payload).pipe(
      tap(user => {
        localStorage.setItem(this.storageKey, JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  updateProfile(id: number, data: { nom: string; telephone: string; adresse: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile/${id}`, data).pipe(
      tap(res => {
        if (this.currentUser) {
          const updated: User = {
            ...this.currentUser,
            nom: res.nom,
            telephone: res.telephone,
            adresse: res.adresse
          };
          localStorage.setItem(this.storageKey, JSON.stringify(updated));
          this.currentUserSubject.next(updated);
        }
      })
    );
  }

  updatePassword(id: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile/${id}/password`, { oldPassword, newPassword });
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUserSubject.next(null);
  }
}
