import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  // Déclarations temporaires de l'état d'authentification
  isAuthenticated = signal<boolean>(true);
  currentUser = signal<{ fullName: string } | null>({ fullName: 'Khadidiatou Traore' });

  constructor(private router: Router) {}

  onLogout(): void {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}