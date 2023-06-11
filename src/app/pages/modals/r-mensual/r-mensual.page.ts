import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AsistenciaService } from 'src/app/services/asistencias.service';
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

  report: any[];
  seleccionarMes: string;

  constructor(
    private asistenciaService: AsistenciaService,
    private empleadosService: EmpleadosService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private pdfService: PdfService,
    private xlsxService: XlsxService
  ) { }

  ngOnInit() {
  }

  //----------------------------------------------------------------
  // Obtiene las asistencias para un empleado y un rango de fechas desde el servicio de reportes
  //----------------------------------------------------------------
  obtenerAsistencias() {
    this.asistenciaService.getAsistencias().subscribe(
      (asistencias: any[]) => {
        if (asistencias && asistencias.length > 0) {
          const empleadosIds = asistencias.map((asistencia) => asistencia.empleado);
          this.empleadosService.getEmpleados().subscribe(
            (empleados: any[]) => {
              const empleadosMap = new Map(empleados.map((empleado) => [empleado.id, empleado]));
              this.report = asistencias
                .filter((asistencia) => {
                  const fecha = new Date(asistencia.fecha_registro);
                  const month = fecha.getMonth();
                  const monthName = this.getMonthName(month);
                  return monthName.toLowerCase() === this.seleccionarMes.toLowerCase();
                })
                .map((asistencia) => {
                  const empleado = empleadosMap.get(asistencia.empleado);
                  const nombreCompleto = `${empleado.nombre} ${empleado.ap_paterno}`;
                  return { ...asistencia, nombreCompleto };
                });
            },
            (error) => {
              console.error('Error al obtener los empleados:', error);
              this.mostrarAlerta('Error', 'No se pudieron obtener los empleados');
            }
          );
        } else {
          this.report = [];
        }
      },
      (error) => {
        console.error('Error al obtener las asistencias:', error);
        this.mostrarAlerta('Error', 'No se pudieron obtener las asistencias');
      }
    );
  }

  getMonthName(month: number): string {
    const months = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ];
    return months[month];
  }

  obtenerNombresEmpleados() {
    this.empleadosService.getEmpleados().subscribe(
      (data: any[]) => {
        this.report.forEach((asistencia) => {
          const empleado = data.find((emp) => emp.id === asistencia.id_empleado);
          if (empleado) {
            asistencia.nombre_empleado = empleado.nombre;
          }
        });
      },
      (error) => {
        console.error(error);
        this.mostrarAlerta('Error', 'No se pudo obtener los nombres de los empleados');
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

  //----------------------------------------------------------------
  // Esta función cierra el modal actual y lo descarta
  //----------------------------------------------------------------
  cerrar() {
    this.modalCtrl.dismiss();
  }
}
