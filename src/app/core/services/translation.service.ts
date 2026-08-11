import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'fr' | 'en';

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  fr: {
    'dashboard.welcome': 'Content de vous revoir !',
    'dashboard.subtitle': 'Explorez vos modules d\'enseignement et suivez votre progression en temps réel.',
    'dashboard.courses': 'Cours disponibles',
    'dashboard.learning_time': 'Temps d\'apprentissage',
    'dashboard.certifications': 'Certifications',
    'nav.logout': 'Déconnexion'
  },
  en: {
    'dashboard.welcome': 'Welcome back!',
    'dashboard.subtitle': 'Explore your learning modules and track your progress in real time.',
    'dashboard.courses': 'Available courses',
    'dashboard.learning_time': 'Learning time',
    'dashboard.certifications': 'Certifications',
    'nav.logout': 'Logout'
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang = signal<Lang>('fr');

  // Dictionnaire réactif calculé
  private activeTranslations = computed(() => TRANSLATIONS[this.currentLang()]);

  setLanguage(lang: Lang): void {
    this.currentLang.set(lang);
  }

  translate(key: string): string {
    return this.activeTranslations()[key] || key;
  }
}