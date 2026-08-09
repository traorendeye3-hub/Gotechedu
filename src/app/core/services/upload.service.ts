import { Injectable, signal } from '@angular/core';

export interface SubmittedAssignment {
  id: string;
  courseTitle: string;
  assignmentTitle: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  uploadDate: Date;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'GRADED';
  grade?: string;
  feedback?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  submissions = signal<SubmittedAssignment[]>([
    {
      id: '1',
      courseTitle: 'Intégration Continue avec Jenkins',
      assignmentTitle: 'TP 1 - Configuration du Pipeline CI/CD',
      fileName: 'Traore_Khadidiatou_TP_Jenkins.pdf',
      fileSize: '2.4 MB',
      fileUrl: '#',
      uploadDate: new Date(),
      status: 'GRADED',
      grade: '18/20',
      feedback: 'Très bon travail sur la structuration du fichier Jenkinsfile.'
    }
  ]);

  addSubmission(courseTitle: string, assignmentTitle: string, file: File): void {
    const objectUrl = URL.createObjectURL(file);

    const newSubmission: SubmittedAssignment = {
      id: Date.now().toString(),
      courseTitle,
      assignmentTitle: assignmentTitle || 'Devoir / TP',
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      fileUrl: objectUrl,
      uploadDate: new Date(),
      status: 'SUBMITTED'
    };

    this.submissions.update(list => [newSubmission, ...list]);
  }
}