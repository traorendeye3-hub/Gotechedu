import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface QuizItem {
  id: number;
  category: string;
  moduleTitle: string;
  questions: Question[];
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss'
})
export class QuizComponent {

  quizzes: QuizItem[] = [
    {
      id: 1,
      category: 'ARCHITECTURE LOGICIELLE',
      moduleTitle: 'Architecture Logicielle',
      questions: [
        {
          id: 1,
          questionText: 'Qu\'est-ce qu\'un patron de conception (Design Pattern) ?',
          options: ['Une solution réutilisable à un problème courant', 'Un langage de programmation', 'Un serveur web', 'Une base de données'],
          correctAnswer: 'Une solution réutilisable à un problème courant'
        },
        {
          id: 2,
          questionText: 'Quel patron de conception permet de créer un seul objet unique dans toute l\'application ?',
          options: ['Factory', 'Singleton', 'Observer', 'Strategy'],
          correctAnswer: 'Singleton'
        },
        {
          id: 3,
          questionText: 'Quel modèle favorise le découplage des composants ?',
          options: ['Monolithique', 'Injection de dépendances', 'Code spaghetti', 'Base centrale unique'],
          correctAnswer: 'Injection de dépendances'
        },
        {
          id: 4,
          questionText: 'Dans l\'architecture MVC, que gère le "Controller" ?',
          options: ['L\'affichage visuel', 'La logique métier et les interactions', 'Le stockage des données', 'Les requêtes SQL uniquement'],
          correctAnswer: 'La logique métier et les interactions'
        },
        {
          id: 5,
          questionText: 'Quel est le rôle principal d\'un patron de structure comme Adapter ?',
          options: ['Créer des objets', 'Adapter des interfaces incompatibles entre elles', 'Gérer l\'état d\'un objet', 'Sécuriser une API'],
          correctAnswer: 'Adapter des interfaces incompatibles entre elles'
        },
        {
          id: 6,
          questionText: 'Lequel est un exemple de patron comportemental ?',
          options: ['Observer', 'Builder', 'Abstract Factory', 'Prototype'],
          correctAnswer: 'Observer'
        },
        {
          id: 7,
          questionText: 'Que signifie le principe SOLID : Single Responsibility Principle (SRP) ?',
          options: ['Une classe ne doit avoir qu\'une seule raison de changer', 'Une méthode doit contenir au moins 10 lignes', 'Une classe doit hériter de toutes les sous-classes', 'Un projet ne doit avoir qu\'un seul fichier'],
          correctAnswer: 'Une classe ne doit avoir qu\'une seule raison de changer'
        },
        {
          id: 8,
          questionText: 'Quel patron permet de notifier plusieurs objets lors d\'un changement d\'état ?',
          options: ['Observer', 'Decorator', 'Facade', 'Proxy'],
          correctAnswer: 'Observer'
        },
        {
          id: 9,
          questionText: 'Quel patron fournit une interface simplifiée vers un sous-système complexe ?',
          options: ['Facade', 'Bridge', 'Composite', 'Flyweight'],
          correctAnswer: 'Facade'
        },
        {
          id: 10,
          questionText: 'Dans une architecture en couches (N-Tier), la couche de présentation communique directement avec :',
          options: ['La couche de données (DAO)', 'La couche métier (Business Service)', 'Directement avec la base de données', 'Le matériel serveur'],
          correctAnswer: 'La couche métier (Business Service)'
        }
      ]
    },
    {
      id: 2,
      category: 'BASES DE DONNÉES',
      moduleTitle: 'Bases de Données Distribuées',
      questions: [
        {
          id: 1,
          questionText: 'Qu\'est-ce que la fragmentation horizontale ?',
          options: ['Découpage en colonnes', 'Découpage en tuples (lignes)', 'Indexation d\'un tableau', 'Clustering d\'instances'],
          correctAnswer: 'Découpage en tuples (lignes)'
        },
        {
          id: 2,
          questionText: 'Qu\'est-ce que la fragmentation verticale ?',
          options: ['Découpage en sous-ensembles d\'attributs (colonnes)', 'Découpage par critères de lignes', 'Sauvegarde sur bande', 'Division physique du disque'],
          correctAnswer: 'Découpage en sous-ensembles d\'attributs (colonnes)'
        },
        {
          id: 3,
          questionText: 'Que signifie le théorème CAP pour les systèmes distribués ?',
          options: ['Consistency, Availability, Partition Tolerance', 'Control, Access, Performance', 'Centralization, Autonomy, Process', 'Calculus, Algorithme, Paramètres'],
          correctAnswer: 'Consistency, Availability, Partition Tolerance'
        },
        {
          id: 4,
          questionText: 'Quel protocole garantit l\'atomité des transactions distribuées ?',
          options: ['2PC (Two-Phase Commit)', 'HTTP/2', 'TCP/IP', 'DHCP'],
          correctAnswer: '2PC (Two-Phase Commit)'
        },
        {
          id: 5,
          questionText: 'Qu\'est-ce que la réplication de données ?',
          options: ['La suppression de doublons', 'La copie de données sur plusieurs nœuds du réseau', 'La compression d\'un fichier SQL', 'Le chiffrement des tables'],
          correctAnswer: 'La copie de données sur plusieurs nœuds du réseau'
        },
        {
          id: 6,
          questionText: 'Dans un système distribué, la transparence de localisation signifie que :',
          options: ['L\'utilisateur doit connaître l\'adresse IP exacte du serveur', 'L\'utilisateur accède aux données sans savoir où elles sont stockées', 'Les cartes réseau sont masquées', 'Le SGBD est uniquement hébergé en local'],
          correctAnswer: 'L\'utilisateur accède aux données sans savoir où elles sont stockées'
        },
        {
          id: 7,
          questionText: 'Qu\'est-ce qu\'une vue matérialisée dans une base de données ?',
          options: ['Un écran graphique utilisateur', 'Le résultat d\'une requête stocké physiquement sous forme de table', 'Une vue temporaire effacée après lecture', 'Un schéma UML'],
          correctAnswer: 'Le résultat d\'une requête stocké physiquement sous forme de table'
        },
        {
          id: 8,
          questionText: 'Quel est l\'avantage principal d\'une base de données distribuée ?',
          options: ['Une complexité de gestion réduite', 'Une haute disponibilité et une tolérance aux pannes', 'L\'absence de réseau nécessaire', 'Une sécurité minimale'],
          correctAnswer: 'Une haute disponibilité et une tolérance aux pannes'
        },
        {
          id: 9,
          questionText: 'En NoSQL, que signifie le modèle "BASE" opposé à "ACID" ?',
          options: ['Basically Available, Soft-state, Eventual consistency', 'Binary, Access, Storage, Execution', 'Basic Application System Environment', 'Backup, Archive, Security, Encryption'],
          correctAnswer: 'Basically Available, Soft-state, Eventual consistency'
        },
        {
          id: 10,
          questionText: 'Quel mécanisme permet d\'exécuter des transactions parallèles sans interférence ?',
          options: ['Le contrôle de concurrence (Verrouillage / TimeStamping)', 'Le formatage du disque', 'La défragmentation', 'Le multiplexage réseau'],
          correctAnswer: 'Le contrôle de concurrence (Verrouillage / TimeStamping)'
        }
      ]
    },
    {
      id: 3,
      category: 'INGÉNIERIE LOGICIELLE',
      moduleTitle: 'Ingénierie Logicielle',
      questions: [
        {
          id: 1,
          questionText: 'Quelle est la première phase du cycle de vie d\'un logiciel ?',
          options: ['Codage', 'Analyse des besoins et spécification', 'Tests unitaires', 'Maintenance'],
          correctAnswer: 'Analyse des besoins et spécification'
        },
        {
          id: 2,
          questionText: 'Lequel est une méthode agile très répandue ?',
          options: ['Scrum', 'Cascade (Waterfall)', 'V-Model', 'Séquentiel strict'],
          correctAnswer: 'Scrum'
        },
        {
          id: 3,
          questionText: 'Dans Scrum, quelle réunion quotidienne permet de faire le point sur l\'avancement ?',
          options: ['Sprint Review', 'Daily Stand-up', 'Sprint Planning', 'Retrospective'],
          correctAnswer: 'Daily Stand-up'
        },
        {
          id: 4,
          questionText: 'Que vise l\'Intégration Continue (CI) ?',
          options: ['Automatiser la compilation et les tests à chaque commit', 'Écrire la documentation utilisateur', 'Designer des maquettes UI', 'Planifier le budget projet'],
          correctAnswer: 'Automatiser la compilation et les tests à chaque commit'
        },
        {
          id: 5,
          questionText: 'Quel outil est couramment utilisé comme serveur d\'intégration continue ?',
          options: ['Jenkins', 'Photoshop', 'Excel', 'Postman'],
          correctAnswer: 'Jenkins'
        },
        {
          id: 6,
          questionText: 'En UML, quel diagramme modélise les interactions entre acteurs et fonctionnalités ?',
          options: ['Diagramme de classes', 'Diagramme de cas d\'utilisation (Use Case)', 'Diagramme de déploiement', 'Diagramme de composants'],
          correctAnswer: 'Diagramme de cas d\'utilisation (Use Case)'
        },
        {
          id: 7,
          questionText: 'Qu\'est-ce que la méthode TDD (Test Driven Development) ?',
          options: ['Écrire les tests avant le code de fonctionnalité', 'Écrire les tests à la fin du projet', 'Ne jamais faire de tests automatisés', 'Tester uniquement via l\'interface graphique'],
          correctAnswer: 'Écrire les tests avant le code de fonctionnalité'
        },
        {
          id: 8,
          questionText: 'Quel est le rôle du Product Owner dans Scrum ?',
          options: ['Développer le code backend', 'Maximiser la valeur du produit et gérer le Backlog', 'Configurer les serveurs Linux', 'Réaliser la recette fonctionnelle finale'],
          correctAnswer: 'Maximiser la valeur du produit et gérer le Backlog'
        },
        {
          id: 9,
          questionText: 'Quelle est la durée moyenne recommandée d\'un Sprint dans Scrum ?',
          options: ['1 à 4 semaines', '6 mois', '1 jour', '1 an'],
          correctAnswer: '1 à 4 semaines'
        },
        {
          id: 10,
          questionText: 'Que mesure le terme "dette technique" dans un projet logiciel ?',
          options: ['Le coût des ordinateurs des développeurs', 'Le coût futur du refactoring lié à des choix de code rapides et imparfaits', 'Le salaire des testeurs', 'La facture d\'hébergement cloud'],
          correctAnswer: 'Le coût futur du refactoring lié à des choix de code rapides et imparfaits'
        }
      ]
    },
    {
      id: 4,
      category: 'APPLICATIONS MOBILES',
      moduleTitle: 'Programmation Native d\'Applications Mobiles',
      questions: [
        {
          id: 1,
          questionText: 'En Android native moderne, quel framework UI déclaratif remplace les layouts XML ?',
          options: ['Jetpack Compose', 'Java Swing', 'Flutter', 'React Native'],
          correctAnswer: 'Jetpack Compose'
        },
        {
          id: 2,
          questionText: 'Quel langage est aujourd\'hui officiellement recommandé par Google pour Android ?',
          options: ['Kotlin', 'C++', 'Python', 'PHP'],
          correctAnswer: 'Kotlin'
        },
        {
          id: 3,
          questionText: 'Quel composant Android représente un écran avec une interface utilisateur ?',
          options: ['Activity', 'Service', 'BroadcastReceiver', 'ContentProvider'],
          correctAnswer: 'Activity'
        },
        {
          id: 4,
          questionText: 'Quel composant Android s\'exécute en arrière-plan sans interface graphique ?',
          options: ['Service', 'Activity', 'Layout', 'Fragment'],
          correctAnswer: 'Service'
        },
        {
          id: 5,
          questionText: 'Dans le cycle de vie d\'une Activity, quelle méthode est appelée lors de la création initiale ?',
          options: ['onCreate()', 'onStart()', 'onResume()', 'onDestroy()'],
          correctAnswer: 'onCreate()'
        },
        {
          id: 6,
          questionText: 'À quoi sert un "Intent" sous Android ?',
          options: ['À faire communiquer des composants (passer d\'un écran à un autre)', 'À compiler le fichier APK', 'À gérer la base de données', 'À concevoir les icônes'],
          correctAnswer: 'À faire communiquer des composants (passer d\'un écran à un autre)'
        },
        {
          id: 7,
          questionText: 'Quel est l\'outil de build principal utilisé par Android Studio ?',
          options: ['Gradle', 'Maven', 'Ant', 'Webpack'],
          correctAnswer: 'Gradle'
        },
        {
          id: 8,
          questionText: 'Quelle bibliothèque d\'architecture Android gère les données observables sensibles au cycle de vie ?',
          options: ['LiveData / StateFlow', 'Room', 'Retrofit', 'Dagger'],
          correctAnswer: 'LiveData / StateFlow'
        },
        {
          id: 9,
          questionText: 'Quelle bibliothèque ORM officielle est recommandée pour la persistance SQLite sur Android ?',
          options: ['Room', 'Realm', 'CoreData', 'Hibernate'],
          correctAnswer: 'Room'
        },
        {
          id: 10,
          questionText: 'Dans Jetpack Compose, quelle annotation indique qu\'une fonction définit un élément d\'interface UI ?',
          options: ['@Composable', '@Component', '@Inject', '@Activity'],
          correctAnswer: '@Composable'
        }
      ]
    },
    {
      id: 5,
      category: 'APPLICATIONS MOBILES',
      moduleTitle: 'Webservices (REST, GraphQL)',
      questions: [
        {
          id: 1,
          questionText: 'Quelle méthode HTTP est principalement utilisée pour créer une nouvelle ressource dans REST ?',
          options: ['POST', 'GET', 'PUT', 'DELETE'],
          correctAnswer: 'POST'
        },
        {
          id: 2,
          questionText: 'Quelle méthode HTTP met à jour une ressource existante dans REST ?',
          options: ['PUT / PATCH', 'GET', 'POST', 'OPTIONS'],
          correctAnswer: 'PUT / PATCH'
        },
        {
          id: 3,
          questionText: 'Quel code de statut HTTP indique que la ressource a été créée avec succès ?',
          options: ['201 Created', '200 OK', '404 Not Found', '500 Internal Server Error'],
          correctAnswer: '201 Created'
        },
        {
          id: 4,
          questionText: 'Quel code HTTP indique qu\'une ressource est introuvable ?',
          options: ['404', '401', '403', '502'],
          correctAnswer: '404'
        },
        {
          id: 5,
          questionText: 'Quel format de données léger est le plus utilisé dans les échanges API REST ?',
          options: ['JSON', 'XML', 'CSV', 'YAML'],
          correctAnswer: 'JSON'
        },
        {
          id: 6,
          questionText: 'Quel est l\'avantage principal de GraphQL par rapport à REST ?',
          options: ['Demander exactement les champs nécessaires et éviter le over-fetching', 'Consommer plus de bande passante', 'Ne pas utiliser de requêtes HTTP', 'Fonctionner uniquement sans serveur'],
          correctAnswer: 'Demander exactement les champs nécessaires et éviter le over-fetching'
        },
        {
          id: 7,
          questionText: 'Dans une API GraphQL, quelle opération est utilisée pour modifier des données ?',
          options: ['Mutation', 'Query', 'Subscription', 'Schema'],
          correctAnswer: 'Mutation'
        },
        {
          id: 8,
          questionText: 'Dans GraphQL, quelle opération permet d\'écouter des données en temps réel ?',
          options: ['Subscription', 'Query', 'Mutation', 'Fetcher'],
          correctAnswer: 'Subscription'
        },
        {
          id: 9,
          questionText: 'Que signifie l\'acronyme REST ?',
          options: ['Representational State Transfer', 'Remote Execution Standard Tools', 'Realtime Embedded System Transfer', 'Relational Endpoint Service Type'],
          correctAnswer: 'Representational State Transfer'
        },
        {
          id: 10,
          questionText: 'Quelle bibliothèque HTTP est populaire sur Android pour consommer des API REST ?',
          options: ['Retrofit', 'Glide', 'Room', 'Gson'],
          correctAnswer: 'Retrofit'
        }
      ]
    }
  ];

  selectedQuiz = signal<QuizItem | null>(null);
  currentQuestionIndex = signal<number>(0);
  userAnswers = signal<{ [questionIndex: number]: string }>({});
  quizFinished = signal<boolean>(false);

  currentQuestion = computed(() => {
    const quiz = this.selectedQuiz();
    if (!quiz) return null;
    return quiz.questions[this.currentQuestionIndex()] || null;
  });

  score = computed(() => {
    const quiz = this.selectedQuiz();
    if (!quiz) return 0;
    
    const answers = this.userAnswers();
    let totalScore = 0;

    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        totalScore++;
      }
    });

    return totalScore;
  });

  constructor(private router: Router) {}

  startQuiz(quiz: QuizItem): void {
    this.selectedQuiz.set(quiz);
    this.currentQuestionIndex.set(0);
    this.userAnswers.set({});
    this.quizFinished.set(false);
  }

  selectOption(option: string): void {
    const index = this.currentQuestionIndex();
    this.userAnswers.update(answers => ({
      ...answers,
      [index]: option
    }));
  }

  nextQuestion(): void {
    const quiz = this.selectedQuiz();
    if (!quiz) return;

    if (this.currentQuestionIndex() < quiz.questions.length - 1) {
      this.currentQuestionIndex.update(idx => idx + 1);
    } else {
      this.quizFinished.set(true);
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.update(idx => idx - 1);
    }
  }

  resetQuiz(): void {
    this.selectedQuiz.set(null);
    this.currentQuestionIndex.set(0);
    this.userAnswers.set({});
    this.quizFinished.set(false);
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}