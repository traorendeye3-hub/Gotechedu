import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CourseModule {
  category: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {

  activeTab: string = 'dashboard'; 
  selectedTopic: string = '';

  courses: CourseModule[] = [
    {
      category: 'ARCHITECTURE LOGICIELLE',
      title: 'Architecture Logicielle',
      description: 'Étude approfondie des concepts clés de l\'architecture des applications complexes. Analyse des modèles de conception, mécanismes de délégation et structures d\'intégration.',
      duration: '18h',
      topics: ['Séquence 1 : Introduction', 'Séquence 2 : Modèle Complexe', 'Séquence 3 : Délégation', 'Séquence 4 : Patron Créationnel']
    },
    {
      category: 'BASES DE DONNÉES',
      title: 'Base de Données Distribueés',
      description: 'Conception et gestion des systèmes de bases de données réparties. Fragmentation, réplication, transparence de localisation et traitement des requêtes distribuées.',
      duration: '16h',
      topics: ['BDD : Séquence 1', 'BDD : Séquence 2', 'BDD : Séquence 3', 'BDD : Séquence 4']
    },
    {
      category: 'INGÉNIERIE LOGICIELLE',
      title: 'Ingénierie Logicielle',
      description: 'Processus et méthodes de développement logiciel rigoureux. Analyse des besoins, spécifications techniques, cycle de vie du logiciel et méthodologies de gestion de projet.',
      duration: '15h',
      topics: ['IL : Séquence 1', 'IL : Séquence 2', 'IL : Séquence 3', 'IL : Séquence 4', 'IL : Séquence 5']
    },
    {
      category: 'APPLICATIONS MOBILES',
      title: 'Programmation Native d\'Applications Mobiles',
      description: 'Développement d\'applications performantes pour les environnements mobiles. Gestion du cycle de vie des activités, persistance des données et interfaces utilisateurs fluides.',
      duration: '20h',
      topics: ['Mobile : Séquence 1', 'Mobile : Séquence 2', 'Mobile : Séquence 3', 'Mobile : Séquence 4', 'Mobile : Séquence 5']
    },
    {
      category: 'APPLICATIONS MOBILES',
      title: 'Webservices (REST, GraphQL)',
      description: 'Développement d\'applications performantes pour les environnements mobiles. Gestion du cycle de vie des activités, persistance des données et interfaces utilisateurs fluides.',
      duration: '20h',
      topics: ['Mobile : Séquence 1', 'Mobile : Séquence 2', 'Mobile : Séquence 3', 'Mobile : Séquence 4', 'Mobile : Séquence 5']
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToPage(path: string): void {
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: path } });
    } else {
      this.router.navigate([path]).catch(err => console.error('Erreur de navigation :', err));
    }
  }

  selectTab(tabName: string): void {
    this.activeTab = tabName;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  login(): void {
    localStorage.setItem('token', 'fake-jwt-token-pour-le-test');
    this.activeTab = 'dashboard';
  }

  // Méthode appelée par (click)="viewLesson(topic)" dans dashboard.html
  viewLesson(topicName: string): void {
    if (topicName === 'Séquence 1 : Introduction') {
      window.open('/cours/architecture-logicielle/Sequence1_Introduction.pdf', '_blank');
    } else if (topicName === 'Séquence 2 : Modèle Complexe') {
      window.open('/cours/architecture-logicielle/Sequence2_Modele Complexe.pdf', '_blank');
    } else if (topicName === 'Séquence 3 : Délégation') {
      window.open('/cours/architecture-logicielle/sequence3_delegation.pdf', '_blank');
    } else if (topicName === 'Séquence 4 : Patron Créationnel') {
      window.open('/cours/architecture-logicielle/sequence4_Patron Creationnel.pdf', '_blank');
    } else if (topicName === 'BDD : Séquence 1') {
      window.open('/cours/bdd/sequence 1.pdf', '_blank');
    } else if (topicName === 'BDD : Séquence 2') {
      window.open('/cours/bdd/sequence 2.pdf', '_blank');
    } else if (topicName === 'BDD : Séquence 3') {
      window.open('/cours/bdd/sequence 3.pdf', '_blank');
    } else if (topicName === 'BDD : Séquence 4') {
      window.open('/cours/bdd/sequence 4.pdf', '_blank');
    } else if (topicName === 'IL : Séquence 1') {
      window.open('/cours/' + encodeURIComponent('Ingénierie Logicielle') + '/Séquence 1.pdf', '_blank');
    } else if (topicName === 'IL : Séquence 2') {
      window.open('/cours/' + encodeURIComponent('Ingénierie Logicielle') + '/Séquence 2.pdf', '_blank' ); 
    } else if (topicName === 'IL : Séquence 3') {
      window.open('/cours/' + encodeURIComponent('Ingénierie Logicielle') + '/Séquence 3.pdf', '_blank'); 
    } else if (topicName === 'IL : Séquence 4') {
      window.open('/cours/' + encodeURIComponent('Ingénierie Logicielle') + '/Sequence 4.pdf', '_blank');
    } else if (topicName === 'IL : Séquence 5') {
      window.open('/cours/' + encodeURIComponent('Ingénierie Logicielle') + '/Sequence 5.pdf', '_blank');
    } else if (topicName === 'Mobile : Séquence 1') {
      window.open('/cours/' + encodeURIComponent("Programmation Native d'Applications Mobiles") + '/sequence1.pdf', '_blank');
    } else if (topicName === 'Mobile : Séquence 2') {
      window.open('/cours/' + encodeURIComponent("Programmation Native d'Applications Mobiles") + '/sequence2.pdf', '_blank');
    } else if (topicName === 'Mobile : Séquence 3') {
      window.open('/cours/' + encodeURIComponent("Programmation Native d'Applications Mobiles") + '/sequence3.pdf', '_blank');
    } else if (topicName === 'Mobile : Séquence 4') {
      window.open('/cours/' + encodeURIComponent("Programmation Native d'Applications Mobiles") + '/sequence4.pdf', '_blank');
    } else if (topicName === 'Mobile : Séquence 5') {
      window.open('/cours/' + encodeURIComponent("Programmation Native d'Applications Mobiles") + '/sequence5.pdf', '_blank');
    } else {
      this.selectedTopic = topicName;
      this.activeTab = 'lecon';
    }
  }
}