import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  exportarPDF(report: any[]) {
    if (!report || report.length === 0) {
      console.error('No se ha generado ningún reporte');
      return;
    }

    const doc = new jsPDF();

    // Agregar los encabezados de las columnas
    doc.setFontSize(12);
    doc.setFont('Arial', 'bold');
    let y = 20;
    doc.text('Fecha Registro', 20, y);
    doc.text('Hora Entrada', 70, y);
    doc.text('Hora Salida', 120, y);

    y += 10;

    // Agregar los datos del reporte
    doc.setFontSize(10);
    doc.setFont('Arial', 'bold');
    report.forEach((entry: any) => {
      doc.text(entry.fecha_registro, 20, y);

      if (entry.hora_entrada) {
        doc.text(entry.hora_entrada, 70, y);
      }

      if (entry.hora_salida) {
        doc.text(entry.hora_salida, 120, y);
      }

      y += 10;
    });

    doc.save('reporte.pdf');
  }




}
