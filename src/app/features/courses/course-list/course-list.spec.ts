import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.scss']
})
export class CourseListComponent {
  courses: Course[] = [
    {
      id: 1,
      title: 'architecture-logicielle',
      description: 'Maîtrisez la fragmentation, la réplication et la gestion des transactions distribuées sous Oracle.',
      instructor: 'M. Bousso',
      duration: '30 heures',
      category: 'Database',
      image: 'images/Architecture Logicielles .png'
    },
    {
      id: 2,
      title: 'Base de Données Distribuées',
      description: 'Apprenez à concevoir des applications web robustes avec les Standalone Components, RxJS et la gestion d\'état.',
      instructor: 'Mme. DIALLO',
      duration: '40 heures',
      category: 'Database',
      image: 'images/basse de donne distribuée.png'
    },
    {
      id: 3,
      title: 'Ingénierie Logicielle',
      description: 'Décrire les qualités d’un logiciel et les principes de base qui permettent de les réaliser..',
      instructor: 'Prof.SALL',
      duration: '25 heures',
      category: 'DevOps',
      image: 'images/Ingénierie Logicielle.jpg'
    },
    {
      id: 4,
      title: 'Programmation Native ',
      description: 'Définir l’environnement mobile et identifier ses acteurs; Créer un projet.',
      instructor: 'M. CISSE',
      duration: '25 heures',
      category: 'DevOps',
      image: 'images/Programmation Native d\'Application Mobile.jpg'
    },
    {
      id: 5,
      title: 'Webservices (REST, GraphQL) ',
      description: 'Comprendre la definition et le role des services web;Explorer les types de services web tels SOAP, REST et GraphQL.',
      instructor: 'M. DJIGA SENE',
      duration: '25 heures',
      category: 'DevOps',
      image: 'images/Webservices (REST, GraphQL).jpg'
    }
  ];

  viewCourse(courseId: number): void {
    console.log(`Navigation vers le cours ID: ${courseId}`);
  }

  openResource(resourceName: string, courseTitle: string, lessonTitle: string): void {
    const docContent = `
      <html>
      <head>
        <title>${resourceName}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; padding: 40px; background-color: #f8fafc; }
          .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border-top: 6px solid #0284c7; }
          .univ { font-size: 12px; font-weight: bold; color: #0284c7; text-transform: uppercase; letter-spacing: 1px; }
          h1 { color: #1e293b; font-size: 28px; margin-top: 5px; }
          h2 { color: #0f172a; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 30px; }
          .meta { font-style: italic; color: #64748b; margin-bottom: 30px; font-size: 14px; }
          ul { padding-left: 20px; }
          li { margin-bottom: 10px; }
          .highlight { background-color: #f0fdf4; padding: 15px; border-left: 4px solid #22c55e; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="univ">Espace Numérique d'Enseignement</div>
          <h1>${lessonTitle}</h1>
          <div class="meta">Module : ${courseTitle} | Ressource : ${resourceName}</div>
          
          <p>Bienvenue dans votre support de cours officiel. Ce document synthétise les concepts essentiels à retenir pour valider vos acquis.</p>
          
          <h2>1. Objectifs d'apprentissage</h2>
          <p>À la fin de cette section, vous serez capable de comprendre les architectures clés, d'analyser les flux de traitement associés et d'appliquer ces méthodologies dans vos projets de travaux pratiques.</p>
          
          <h2>2. Concept Fondamental</h2>
          <div class="highlight">
            <strong>Règle d'or :</strong> Une bonne implémentation repose sur la modularité, la haute disponibilité des architectures, la tolérance aux pannes et l'automatisation des processus de déploiement.
          </div>
          
          <h2>3. Développements et Démonstrations</h2>
          <p>Les infrastructures modernes demandent une rigueur absolue. Voici les trois piliers indispensables :</p>
          <ul>
            <li><strong>Fiabilité :</strong> Garantir l'exactitude des calculs et la cohérence des structures de données à chaque étape.</li>
            <li><strong>Performance :</strong> Optimiser l'utilisation des ressources système pour minimiser la latence des réponses.</li>
            <li><strong>Évolutivité :</strong> Concevoir le code pour qu'il supporte une charge utilisateur croissante sans réécriture majeure.</li>
          </ul>
          
          <br>
          <p align="center" style="color: #94a3b8; font-size: 12px;">© UNCHK E-Learning — Document d'étude académique</p>
        </div>
      </body>
      </html>
    `;

    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(docContent);
      newWindow.document.close();
    } else {
      alert("⚠️ Veuillez autoriser les fenêtres pop-up pour afficher le support de cours !");
    }
  }
}