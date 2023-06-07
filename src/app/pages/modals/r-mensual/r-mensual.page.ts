import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReportesService } from 'src/app/services/reportes.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { AlertController } from '@ionic/angular';
import { PdfService } from 'src/app/services/pdf.service';
import { XlsxService } from 'src/app/services/xlsx.service';

@Component({
  selector: 'app-r-mensual',
  templateUrl: './r-mensual.page.html',
  styleUrls: ['./r-mensual.page.scss'],
})
export class RMensualPage implements OnInit {

  report: any;
  empleados: any[] = [];

  myDate: string;

  empleadoSeleccionado: number;
  fechaSeleccionada: string;

  showCalendarInicio: boolean = false;
  showCalendarFin: boolean = false;

  constructor(
    private reportesService: ReportesService,
    private modalCtrl: ModalController,
    private empleadosService: EmpleadosService,
    private alertCtrl: AlertController,
    private pdfService: PdfService,
    private xlsxService: XlsxService
  ) { }

  ngOnInit() {
    this.obtenerEmpleados();
  }



  showCalendar(field: string) {
    if (field === 'inicio') {
      this.showCalendarInicio = true;
    } else if (field === 'fin') {
      this.showCalendarFin = true;
    }
  }

  hideCalendar(field: string) {
    if (field === 'inicio') {
      this.showCalendarInicio = false;
    } else if (field === 'fin') {
      this.showCalendarFin = false;
    }
  }

  // Obtiene la lista de empleados desde el servicio de empleados
  obtenerEmpleados() {
    this.empleadosService.getEmpleados().subscribe(
      (empleados: object) => {
        this.empleados = empleados as any[];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Obtiene las asistencias para un empleado y un rango de fechas desde el servicio de reportes
  obtenerAsistencias() {
    if (!this.empleadoSeleccionado) {
      this.mostrarAlerta('Error', 'No se ha seleccionado ningún empleado.');
      return; // No se ha seleccionado ningún empleado, salir del método
    }

    const empleadoId = this.empleadoSeleccionado.toString(); // Convertir a cadena de texto
    console.log('Empleado ID:', empleadoId);

    this.reportesService.getAsistenciasPorEmpleado(empleadoId).subscribe(
      (asistencias: any) => {
        this.report = asistencias;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  // Muestra una alerta con un título y un mensaje
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0;
  };


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





  // Esta función cierra el modal actual y lo descarta
  cerrar() {
    this.modalCtrl.dismiss();
  }
}
