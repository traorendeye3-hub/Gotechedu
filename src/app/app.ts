import { Component } from '@angular/core';
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
  title = 'Gotechedu-Frontend';

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    return true; // Ou la logique de votre service d'authentification
  }

  // Ajoutez cette méthode si elle est absente ou renommez-la si vous utilisiez onLogout()
  logout(): void {
    // Logique de déconnexion (ex: suppression du token)
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}