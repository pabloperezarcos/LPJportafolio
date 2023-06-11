import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ReportesService } from 'src/app/services/reportes.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { PdfService } from 'src/app/services/pdf.service';
import { XlsxService } from 'src/app/services/xlsx.service';

@Component({
  selector: 'app-r-individual',
  templateUrl: './r-individual.page.html',
  styleUrls: ['./r-individual.page.scss'],
})
export class RIndividualPage implements OnInit {

  report: any;
  empleados: any[] = [];
  empleadoSeleccionado: number;
  fechaInicio: string = null;
  fechaFin: string = null;
  asistenciasFiltradas: any[] = [];
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

  //----------------------------------------------------------------
  // Obtiene la lista de empleados desde el servicio de empleados
  //----------------------------------------------------------------
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

  //----------------------------------------------------------------
  // Obtiene las asistencias para un empleado y un rango de fechas desde el servicio de reportes
  //----------------------------------------------------------------
  obtenerAsistencias() {
    if (!this.empleadoSeleccionado) {
      this.mostrarAlerta('Error', 'No se ha seleccionado ningún empleado.');
      return;
    }

    if (!this.fechaInicio || !this.fechaFin) {
      this.mostrarAlerta('Error', 'No se han seleccionado las fechas.');
      return;
    }

    const empleadoId = this.empleadoSeleccionado.toString();
    const fechaInicioTimestamp = new Date(this.fechaInicio).getTime();
    const fechaFinTimestamp = new Date(this.fechaFin).getTime();

    this.reportesService.getAsistenciasPorEmpleado(empleadoId).subscribe(
      (asistencias: any) => {
        this.report = asistencias;
        this.asistenciasFiltradas = this.report.filter((asistencia) => {
          const fechaRegistroTimestamp = new Date(asistencia.fecha_registro).getTime();
          return fechaRegistroTimestamp >= fechaInicioTimestamp && fechaRegistroTimestamp <= fechaFinTimestamp;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //----------------------------------------------------------------
  // Muestra una alerta con un título y un mensaje
  //----------------------------------------------------------------
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
  }

  exportarXLSX() {
  }

  compartirWhatsApp() {
  }

  compartirGmail() {
  }

  //----------------------------------------------------------------
  // Esta función cierra el modal actual y lo descarta
  //----------------------------------------------------------------
  cerrar() {
    this.modalCtrl.dismiss();
  }
}