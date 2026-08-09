import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  // Exportation au format Excel (.xlsx)
  exportToExcel(data: any[], fileName: string): void {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Données');
    XLSX.writeFile(workbook, `${fileName}_${Date.now()}.xlsx`);
  }

  // Exportation au format PDF (.pdf)
  exportToPdf(data: any[], fileName: string): void {
    const doc = new jsPDF();
    
    // Titre du document
    doc.setFontSize(16);
    doc.text('Rapport - Gotechedu', 14, 15);

    if (data.length === 0) return;

    // Récupération dynamique des entêtes
    const headers = Object.keys(data[0]).filter(k => typeof data[0][k] !== 'object');
    const rows = data.map(item => headers.map(key => item[key]));

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 25,
      theme: 'grid',
      headStyles: { fillColor: [0, 122, 204] }
    });

    doc.save(`${fileName}_${Date.now()}.pdf`);
  }
}