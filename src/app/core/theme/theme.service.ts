import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal réactif pour le thème
  isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Synchronise la classe CSS et le localStorage à chaque changement du Signal
    effect(() => {
      const dark = this.isDarkMode();
      if (dark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('gotechedu_theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('gotechedu_theme', 'light');
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update(prev => !prev);
  }

  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem('gotechedu_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Vérification de la préférence système de l'utilisateur
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}