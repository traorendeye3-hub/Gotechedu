import { Injectable } from '@angular/core';

export interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  duration: string;
  chapters: string[];
  quiz: Question[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseStoreService {
  
  private courses: Course[] = [
    {
      id: 1,
      title: 'Intégration Continue avec Jenkins',
      category: 'DevOps',
      description: 'Mise en place d\'une chaîne CI/CD : Configuration de Jenkins, automatisation des builds avec Maven, ngrok, et gestion des Webhooks GitHub.',
      duration: '12h',
      chapters: [
        'Chapitre 1 : Introduction à l\'Intégration Continue (CI)',
        'Chapitre 2 : Installation et configuration de Jenkins',
        'Chapitre 3 : Automatisation des étapes de Build (Compilation & Tests Maven)',
        'Chapitre 4 : Validation de la conformité du code (Étape de Linting)',
        'Chapitre 5 : Interconnexion GitHub via Webhooks et tunnels ngrok'
      ],
      quiz: [
        {
          questionText: 'Dans un Jenkinsfile en syntaxe déclarative, quelle section obligatoire regroupe l\'ensemble des étapes d\'exécution ?',
          options: ['steps {}', 'stages {}', 'pipeline {}', 'agent {}'],
          correctAnswer: 'stages {}',
          explanation: 'Le bloc "stages" contient une suite d\'une ou plusieurs étapes décrivant le workflow du pipeline.'
        },
        {
          questionText: 'À quoi sert principalement l\'utilitaire ngrok lors de l\'intégration avec GitHub en local ?',
          options: [
            'À compiler le code Java plus rapidement',
            'À exposer le serveur Jenkins local aux Webhooks de GitHub via un tunnel sécurisé',
            'À analyser la qualité de code (Linting)',
            'À déployer l\'application en production'
          ],
          correctAnswer: 'À exposer le serveur Jenkins local aux Webhooks de GitHub via un tunnel sécurisé',
          explanation: 'ngrok fournit une URL publique temporaire pointant vers votre localhost, permettant à GitHub d\'envoyer des notifications de push.'
        }
      ]
    },
    {
      id: 2,
      title: 'Bases de Données Distribuées Oracle',
      category: 'Databases',
      description: 'Modélisation, fragmentation et gestion de l\'architecture répartie appliquée aux systèmes d\'information complexes.',
      duration: '18h',
      chapters: [
        'Chapitre 1 : Concepts fondamentaux des bases de données réparties',
        'Chapitre 2 : Fragmentation horizontale, verticale et mixte',
        'Chapitre 3 : Transparence de localisation et protocole 2PC'
      ],
      quiz: [
        {
          questionText: 'Qu\'est-ce que garantit le protocole Two-Phase Commit (2PC) dans une base de données distribuée ?',
          options: [
            'Que la requête s\'exécute deux fois plus vite',
            'L\'atomicité des transactions impliquant plusieurs nœuds (tout valider ou tout annuler)',
            'La fragmentation automatique des tables',
            'Le chiffrement des connexions'
          ],
          correctAnswer: 'L\'atomicité des transactions impliquant plusieurs nœuds (tout valider ou tout annuler)',
          explanation: 'Le protocole 2PC s\'assure que tous les serveurs participants valident ou abandonnent la transaction de manière synchrone.'
        }
      ]
    },
    {
      id: 3,
      title: 'Architecture Web avec Angular',
      category: 'Frontend',
      description: 'Création d\'interfaces dynamiques d\'apprentissage. Gestion du routage, des modules et des composants réutilisables.',
      duration: '15h',
      chapters: [
        'Chapitre 1 : Introduction à l\'écosystème Angular et architecture Standalone',
        'Chapitre 2 : Gestion des composants et liaison de données (Data Binding)',
        'Chapitre 3 : Routage applicatif et gestion du conteneur <router-outlet>'
      ],
      quiz: [
        {
          questionText: 'Quelle propriété d\'un composant Standalone Angular permet d\'inclure d\'autres directives ou composants ?',
          options: ['declarations', 'providers', 'imports', 'exports'],
          correctAnswer: 'imports',
          explanation: 'Dans les composants standalone, le tableau "imports" remplace les déclarations des NgModule.'
        }
      ]
    }
  ];

  getCourses(): Course[] {
    return this.courses;
  }
}