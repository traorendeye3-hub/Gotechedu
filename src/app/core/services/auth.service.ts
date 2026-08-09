import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // Signals d'état global d'authentification
  currentUser = signal<User | null>(this.getStoredUser());
  token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
  isAuthenticated = computed(() => !!this.token());

  constructor(private router: Router) {}

  login(email: string, pass: string): boolean {
    let authenticatedUser: User | null = null;

    // 1. Votre compte personnel
    if (email === 'khadidiatou.traore3@unchk.edu.sn' && pass === '1234') {
      authenticatedUser = {
        id: 1,
        email: email,
        fullName: 'Khadidiatou Traore',
        role: 'STUDENT'
      };
    } 
    // 2. Compte étudiant générique
    else if (email === 'etudiant@unchk.sn' && pass === '1234') {
      authenticatedUser = {
        id: 2,
        email: email,
        fullName: 'Étudiant UNCHK',
        role: 'STUDENT'
      };
    }

    // Validation et enregistrement si un compte correspond
    if (authenticatedUser) {
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockTokenValue12345';

      localStorage.setItem(this.TOKEN_KEY, mockToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(authenticatedUser));

      this.token.set(mockToken);
      this.currentUser.set(authenticatedUser);
      return true;
    }

    // Si aucun identifiant ne correspond
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.token.set(null);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.token();
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
}