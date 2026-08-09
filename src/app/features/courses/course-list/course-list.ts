import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CourseStoreService } from '../../../core/services/course-store.service';

export interface Sequence {
  title: string;
  pdfUrl: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  category: string;
  image: string;
  lessons: number;
  enrolled: string;
  progress?: number;
  sequences: Sequence[];
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.scss']
})
export class CourseListComponent {
  private router = inject(Router);
  private courseStore = inject(CourseStoreService);

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('All');
  selectedSequencePdf = signal<string | null>(null);

  // Remplace le tableau statique par le Signal réactif du Store ou la liste locale
  courses = signal<Course[]>([
    {
      id: 1,
      title: 'Architecture Logicielles',
      description: 'Maîtrisez la fragmentation, la réplication et la gestion des transactions.',
      instructor: 'M. Bousso',
      duration: '30 heures',
      category: 'Database',
      image: encodeURI('images/Architecture Logicielles .png'),
      lessons: 4,
      enrolled: '1.2k+',
      progress: 45,
      sequences: [
        { title: 'Séquence 1', pdfUrl: encodeURI('cours/architecture-logicielle/Sequence1_Introduction.pdf') },
        { title: 'Séquence 2', pdfUrl: encodeURI('cours/architecture-logicielle/Sequence2_Modele Complexe.pdf') },
        { title: 'Séquence 3', pdfUrl: encodeURI('cours/architecture-logicielle/sequence3_delegation.pdf') },
        { title: 'Séquence 4', pdfUrl: encodeURI('cours/architecture-logicielle/sequence4_Patron Creationnel.pdf') }
      ]
    },
    {
      id: 2,
      title: 'Base de Données Distribuées',
      description: 'Apprenez à concevoir des bases de données réparties et performantes.',
      instructor: 'Mme. DIALLO',
      duration: '40 heures',
      category: 'Database',
      image: encodeURI('images/basse de donne distribuée.png'),
      lessons: 4,
      enrolled: '980+',
      progress: 78,
      sequences: [
        { title: 'Séquence 1', pdfUrl: encodeURI('cours/bdd/sequence 1.pdf') },
        { title: 'Séquence 2', pdfUrl: encodeURI('cours/bdd/sequence 2.pdf') },
        { title: 'Séquence 3', pdfUrl: encodeURI('cours/bdd/sequence 3.pdf') },
        { title: 'Séquence 4', pdfUrl: encodeURI('cours/bdd/sequence 4.pdf') }
      ]
    },
    {
      id: 3,
      title: 'Ingénierie Logicielle',
      description: 'Décrire les qualités d’un logiciel et les principes de base.',
      instructor: 'Prof. SALL',
      duration: '25 heures',
      category: 'DevOps',
      image: encodeURI('images/Ingénierie Logicielle.jpg'),
      lessons: 5,
      enrolled: '1.5k+',
      progress: 60,
      sequences: [
        { title: 'Séquence 1', pdfUrl: encodeURI('cours/Ingénierie Logicielle/Séquence 1.pdf') },
        { title: 'Séquence 2', pdfUrl: encodeURI('cours/Ingénierie Logicielle/Séquence 2.pdf') },
        { title: 'Séquence 3', pdfUrl: encodeURI('cours/Ingénierie Logicielle/Séquence 3.pdf') },
        { title: 'Séquence 4', pdfUrl: encodeURI('cours/Ingénierie Logicielle/Sequence 4.pdf') },
        { title: 'Séquence 5', pdfUrl: encodeURI('cours/Ingénierie Logicielle/Sequence 5.pdf') }
      ]
    },
    {
      id: 4,
      title: "Programmation Native d'Applications Mobiles",
      description: 'Développement d applications performantes pour les environnements mobiles.',
      instructor: 'M. CISSE',
      duration: '15 heures',
      category: 'Mobile',
      image: encodeURI("images/Programmation Native d'Applications Mobiles.png"),
      lessons: 5,
      enrolled: '850+',
      sequences: [
        { title: 'Séquence 1', pdfUrl: encodeURI("cours/Programmation Native d'Applications Mobiles/sequence1.pdf") },
        { title: 'Séquence 2', pdfUrl: encodeURI("cours/Programmation Native d'Applications Mobiles/sequence2.pdf") },
        { title: 'Séquence 3', pdfUrl: encodeURI("cours/Programmation Native d'Applications Mobiles/sequence3.pdf") },
        { title: 'Séquence 4', pdfUrl: encodeURI("cours/Programmation Native d'Applications Mobiles/sequence4.pdf") },
        { title: 'Séquence 5', pdfUrl: encodeURI("cours/Programmation Native d'Applications Mobiles/sequence5.pdf") }
      ]
    },
    {
      id: 5,
      title: 'Webservices (REST, GraphQL)',
      description: 'Découverte des architectures distribuées REST et GraphQL.',
      instructor: 'M. DJIGA SENE',
      duration: '20 heures',
      category: 'Web',
      image: encodeURI('images/Webservices (REST, GraphQL).jpg'),
      lessons: 4,
      enrolled: '1.1k+',
      progress: 80,
      sequences: [
        { title: 'Séquence 1', pdfUrl: encodeURI('cours/Webservices (REST, GraphQL)/sequence1.pdf') },
        { title: 'Séquence 2', pdfUrl: encodeURI('cours/Webservices (REST, GraphQL)/sequence2.pdf') },
        { title: 'Séquence 3', pdfUrl: encodeURI('cours/Webservices (REST, GraphQL)/sequence3.pdf') },
        { title: 'Séquence 4', pdfUrl: encodeURI('cours/Webservices (REST, GraphQL)/sequence4.pdf') }
      ]
    }
  ]);

  // Extraction dynamique de la liste des catégories uniques
  categories = computed(() => {
    const cats = this.courses().map(c => c.category);
    return ['All', ...new Set(cats)];
  });

  // Filtrage combiné (Texte + Catégorie)
  filteredCourses = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.courses().filter(course => {
      const matchesQuery = 
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query);

      const matchesCategory = category === 'All' || course.category === category;

      return matchesQuery && matchesCategory;
    });
  });

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  openCourse(course: Course): void {
    if (course.sequences && course.sequences.length > 0) {
      window.open(course.sequences[0].pdfUrl, '_blank');
    } else {
      alert('Aucun document PDF disponible pour ce cours.');
    }
  }

  openSequence(pdfUrl: string): void {
    this.selectedSequencePdf.set(pdfUrl);
    window.open(pdfUrl, '_blank');
  }

  viewCourse(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }
}