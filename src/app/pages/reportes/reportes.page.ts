import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { AlertController } from '@ionic/angular';
import { PdfService } from 'src/app/services/pdf.service';
import { XlsxService } from 'src/app/services/xlsx.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  report: any;
  employees: any[] = [];

  //empleadoSeleccionado: number;
  //fechaSeleccionada: string;
  //rutaArchivoXLSX: string;

  constructor(
    private reportesService: ReportesService,
    private empleadosService: EmpleadosService,
    private alertCtrl: AlertController,
    private pdfService: PdfService,
    private xlsxService: XlsxService
  ) {
  }

  ngOnInit() {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadosService.getEmpleados()
      .subscribe(
        (empleados: object) => {
          this.employees = empleados as any[];
        },
        (error) => {
          console.error(error);
        }
      );
  }

  obtenerAsistencias(empleadoId: number, fechaInicio: string, fechaFin: string) {
    this.reportesService.getAsistenciasPorEmpleadoYFechas(empleadoId, fechaInicio, fechaFin)
      .subscribe(
        (asistencias: object) => {
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

  exportarPDF() {
    if (!this.report || this.report.length === 0) {
      // Mostrar alerta si no hay reporte generado
      this.mostrarAlerta('Error', 'No se ha generado ningún reporte');
      return;
    }

    // Llamar al método exportarPDF() del PdfService
    this.pdfService.exportarPDF(this.report);
  }

  exportarXLSX() {
    if (!this.report || this.report.length === 0) {
      // Mostrar alerta si no hay reporte generado
      this.mostrarAlerta('Error', 'No se ha generado ningún reporte');
      return;
    }

    // Llamar al método exportarXLSX() del XlsxService
    this.xlsxService.exportarXLSX(this.report, 'reporte.xlsx');
  }

  compartirWhatsApp() {

  }

  compartirGmail() {

  }


  /* FIN REPORTES.PAGE.TS */
}