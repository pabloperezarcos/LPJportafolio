import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class XlsxService {

  constructor() { }

  exportarXLSX(report: any[], fileName: string) {
    if (!report || report.length === 0) {
      throw new Error('No hay datos para exportar');
    }

    const data: any[][] = [];

    // Agregar los encabezados de las columnas
    const headers = ['Fecha Registro', 'Hora Entrada', 'Hora Salida'];
    data.push(headers);

    // Agregar los datos del reporte
    report.forEach((entry: any) => {
      // Agregar cada entrada del reporte
      const row = [
        entry.fecha_registro,
        entry.hora_entrada,
        entry.hora_salida
      ];
      data.push(row);
    });

    // Generar el archivo XLSX
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const xlsxBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([xlsxBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }
}
