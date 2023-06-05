import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { AlertController } from '@ionic/angular';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as XLSX from 'xlsx';
//import * as pdfMake from 'pdfmake/build/pdfmake';
//import * as pdfFonts from 'node_modules/pdfmake/build/vfs_fonts'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  empleadoSeleccionado: number;
  fechaSeleccionada: string;
  report: any;
  rutaArchivoPDF: string;
  rutaArchivoXLSX: string;
  employees: any[];

  constructor(
    private reportesService: ReportesService,
    private empleadosService: EmpleadosService,
    private socialSharing: SocialSharing,
    private alertCtrl: AlertController
  ) {
   // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadosService.getEmpleados()
      .subscribe(
        (empleados: any[]) => {
          this.employees = empleados;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  obtenerAsistencias(empleadoId: number, fechaInicio: string, fechaFin: string) {
    this.reportesService.getAsistenciasPorEmpleadoYFechas(empleadoId, fechaInicio, fechaFin)
      .subscribe(
        (asistencias: any[]) => {
          this.report = asistencias;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

/*   exportarPDF() {
    if (!this.report || this.report.length === 0) {
      // Mostrar alerta si no hay reporte generado
      this.mostrarAlerta('Error', 'No se ha generado ningún reporte');
      return;
    }

    const content = [];

    // Agregar el encabezado del reporte
    content.push({ text: 'Reporte de asistencias', style: 'header' });

    // Agregar los datos del reporte
    if (this.report) {
      this.report.forEach((entry: any) => {
        // Agregar cada entrada del reporte
        const row = [
          entry.fecha_registro,
          entry.hora_entrada,
          entry.hora_salida
        ];
        content.push(row);
      });
    }

    // Definir la configuración del documento PDF
    const documentDefinition = {
      content: content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
        }
      }
    };

    // Generar el archivo PDF
    pdfMake.createPdf(documentDefinition).getBlob((blob) => {
      const rutaArchivoPDF = URL.createObjectURL(blob);
      window.open(rutaArchivoPDF); // Abre el archivo PDF en una nueva pestaña (opcional)
    });
  } */

  exportarXLSX() {
    if (!this.report || this.report.length === 0) {
      // Mostrar alerta si no hay reporte generado
      this.mostrarAlerta('Error', 'No se ha generado ningún reporte');
      return;
    }

    const data: any[][] = [];

    // Agregar los encabezados de las columnas
    const headers = ['Fecha Registro', 'Hora Entrada', 'Hora Salida'];
    data.push(headers);

    // Agregar los datos del reporte
    if (this.report) {
      this.report.forEach((entry: any) => {
        // Agregar cada entrada del reporte
        const row = [
          entry.fecha_registro,
          entry.hora_entrada,
          entry.hora_salida
        ];
        data.push(row);
      });
    }

    // Generar el archivo XLSX
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const xlsxBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([xlsxBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const rutaArchivoXLSX = URL.createObjectURL(blob);
    XLSX.writeFile(workbook, 'reporte.xlsx');
  }


  compartirWhatsApp(tipoArchivo: string) {
    const mensaje = '¡Hola! Aquí está el reporte que solicitaste.';
    let archivo: string;

    if (tipoArchivo === 'pdf') {
      archivo = this.rutaArchivoPDF;
    } else if (tipoArchivo === 'xlsx') {
      archivo = this.rutaArchivoXLSX;
    } else {
      console.error('Tipo de archivo no válido');
      return;
    }

    this.socialSharing.shareViaWhatsApp(mensaje, archivo)
      .then(() => {
        console.log('Mensaje compartido por WhatsApp');
      })
      .catch((error) => {
        console.error('Error al compartir por WhatsApp', error);
      });
  }

  compartirGmail(tipoArchivo: string) {
    const asunto = 'Reporte de asistencias';
    const cuerpo = '¡Hola! Adjunto encontrarás el reporte de asistencias solicitado.';
    let archivo: string;

    if (tipoArchivo === 'pdf') {
      archivo = this.rutaArchivoPDF;
    } else if (tipoArchivo === 'xlsx') {
      archivo = this.rutaArchivoXLSX;
    } else {
      console.error('Tipo de archivo no válido');
      return;
    }

    this.socialSharing.shareViaEmail(cuerpo, asunto, null, null, null, archivo)
      .then(() => {
        console.log('Mensaje compartido por Gmail');
      })
      .catch((error) => {
        console.error('Error al compartir por Gmail', error);
      });
  }








  /* FIN REPORTES.PAGE.TS */
}