import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UploadService } from '../../core/services/upload.service';

@Component({
  selector: 'app-assignment-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  template: `
    <div style="max-width: 1000px; margin: 30px auto; padding: 0 20px;">
      
      <div style="margin-bottom: 25px;">
        <h2 style="margin: 0; font-size: 1.8rem;">Dépôt des Travaux (PDF, ZIP, TP)</h2>
        <p style="color: gray; margin-top: 5px;">Téléversez vos fichiers et suivez l'état de correction par vos enseignants.</p>
      </div>

      <!-- Formulaire de Soumission -->
      <mat-card style="padding: 25px; margin-bottom: 35px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
          <mat-icon color="primary">upload_file</mat-icon> Soumettre un travail
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin-bottom: 15px;">
          <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Module / Cours</mat-label>
            <mat-select [(ngModel)]="selectedCourse">
              <mat-option value="Intégration Continue avec Jenkins">Intégration Continue avec Jenkins</mat-option>
              <mat-option value="Base de Données Distribuées">Base de Données Distribuées</mat-option>
              <mat-option value="Architecture Logicielles">Architecture Logicielles</mat-option>
              <mat-option value="Ingénierie Logicielle">Ingénierie Logicielle</mat-option>
              <mat-option value="Programmation Native d'Applications Mobiles">Programmation Native d'Applications Mobiles</mat-option>
              <mat-option value="Webservices (REST, GraphQL)">Webservices (REST, GraphQL)</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" style="width: 100%;">
            <mat-label>Intitulé du TP / Devoir</mat-label>
            <input matInput [(ngModel)]="assignmentTitle" placeholder="Ex: TP1 - Pipeline Jenkins">
          </mat-form-field>
        </div>

        <!-- Zone de glisser-déposer -->
        <div 
          (dragover)="onDragOver($event)" 
          (dragleave)="onDragLeave($event)" 
          (drop)="onDrop($event)"
          [style.border-color]="isDragging() ? '#007acc' : '#ccc'"
          style="border: 2px dashed #ccc; border-radius: 10px; padding: 35px 20px; text-align: center; background: var(--mat-sys-surface-variant); cursor: pointer; transition: all 0.3s;"
          (click)="fileInput.click()">
          
          <input #fileInput type="file" (change)="onFileSelected($event)" style="display: none;" accept=".pdf,.zip,.rar,.tar.gz">
          
          <mat-icon style="font-size: 48px; width: 48px; height: 48px; color: #007acc;">cloud_upload</mat-icon>
          <p style="font-size: 1.05rem; margin-top: 10px; margin-bottom: 5px;">Glissez-déposez votre fichier ici ou <strong style="color: #007acc;">parcourez vos dossiers</strong></p>
          <small style="color: gray;">Formats acceptés : PDF, ZIP, RAR, TAR.GZ (Max: 25 MB)</small>
        </div>

        <!-- Fichier sélectionné -->
        <div *ngIf="selectedFile()" style="margin-top: 20px; padding: 15px; border: 1px solid #007acc; background: #f0f7ff; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <mat-icon style="color: #007acc;">insert_drive_file</mat-icon>
            <div>
              <strong style="color: #333;">{{ selectedFile()?.name }}</strong>
              <div style="font-size: 0.85rem; color: gray;">{{ (selectedFile()!.size / (1024 * 1024)).toFixed(2) }} MB</div>
            </div>
          </div>
          
          <div style="display: flex; gap: 10px;">
            <button mat-button color="warn" (click)="selectedFile.set(null)" [disabled]="isUploading()">Annuler</button>
            <button mat-raised-button color="primary" [disabled]="isUploading()" (click)="uploadFile()">
              <mat-icon>send</mat-icon> Envoyer
            </button>
          </div>
        </div>

        <div *ngIf="isUploading()" style="margin-top: 20px;">
          <mat-progress-bar mode="determinate" [value]="uploadProgress()"></mat-progress-bar>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-top: 5px; color: gray;">
            <span>Envoi en cours...</span>
            <span>{{ uploadProgress() }}%</span>
          </div>
        </div>
      </mat-card>

      <!-- Historique des Livraisons -->
      <h3 style="margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
        <mat-icon color="accent">history</mat-icon> Suivi de vos livraisons
      </h3>

      <mat-card style="padding: 20px; overflow-x: auto;">
        <table *ngIf="uploadService.submissions().length > 0" style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 2px solid #e0e0e0; font-size: 0.9rem; color: gray;">
              <th style="padding: 12px 8px;">COURS & TRAVAIL</th>
              <th style="padding: 12px 8px;">FICHIER</th>
              <th style="padding: 12px 8px;">DATE</th>
              <th style="padding: 12px 8px;">STATUT</th>
              <th style="padding: 12px 8px;">NOTE</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of uploadService.submissions()" style="border-bottom: 1px solid #eee;">
              <td style="padding: 15px 8px;">
                <strong style="display: block;">{{ item.courseTitle }}</strong>
                <span style="font-size: 0.85rem; color: #666;">{{ item.assignmentTitle }}</span>
              </td>
              <td style="padding: 15px 8px;">
                <a [href]="item.fileUrl" target="_blank" style="text-decoration: none; color: #007acc; font-weight: 500;">
                  {{ item.fileName }}
                </a>
              </td>
              <td style="padding: 15px 8px; font-size: 0.85rem; color: #555;">
                {{ item.uploadDate | date:'dd/MM/yyyy HH:mm' }}
              </td>
              <td style="padding: 15px 8px;">
                <span [ngSwitch]="item.status">
                  <span *ngSwitchCase="'SUBMITTED'" style="padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; background: #e3f2fd; color: #0d47a1; font-weight: bold;">Soumis</span>
                  <span *ngSwitchCase="'GRADED'" style="padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; background: #e8f5e9; color: #1b5e20; font-weight: bold;">Évalué</span>
                </span>
              </td>
              <td style="padding: 15px 8px;">
                <span *ngIf="item.grade" style="font-weight: bold; color: #2e7d32; background: #e8f5e9; padding: 2px 8px; border-radius: 4px;">{{ item.grade }}</span>
                <span *ngIf="!item.grade" style="color: gray;">--</span>
              </td>
            </tr>
          </tbody>
        </table>
      </mat-card>

    </div>
  `
})
export class AssignmentUploadComponent {
  uploadService = inject(UploadService);

  selectedCourse = 'Intégration Continue avec Jenkins';
  assignmentTitle = 'TP1 - Pipeline CI/CD';
  
  selectedFile = signal<File | null>(null);
  isDragging = signal<boolean>(false);
  isUploading = signal<boolean>(false);
  uploadProgress = signal<number>(0);

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File): void {
    if (file.size > 25 * 1024 * 1024) {
      alert('Le fichier dépasse la limite de 25 MB.');
      return;
    }
    this.selectedFile.set(file);
  }

  uploadFile(): void {
    const file = this.selectedFile();
    if (!file) return;

    this.isUploading.set(true);
    this.uploadProgress.set(0);

    const interval = setInterval(() => {
      this.uploadProgress.update(val => {
        if (val >= 100) {
          clearInterval(interval);
          this.uploadService.addSubmission(this.selectedCourse, this.assignmentTitle, file);
          this.isUploading.set(false);
          this.selectedFile.set(null);
          this.assignmentTitle = '';
          return 100;
        }
        return val + 25;
      });
    }, 200);
  }
}