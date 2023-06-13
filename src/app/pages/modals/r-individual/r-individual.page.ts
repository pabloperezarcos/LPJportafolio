import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ReportesService } from 'src/app/services/reportes.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { AsistenciaService } from 'src/app/services/asistencias.service';
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
  reportObtenido: boolean = false;
  registroEditado: any = {};

  constructor(
    private reportesService: ReportesService,
    private modalCtrl: ModalController,
    private empleadosService: EmpleadosService,
    private alertCtrl: AlertController,
    private asistenciaService: AsistenciaService,
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

        if (this.asistenciasFiltradas && this.asistenciasFiltradas.length === 0) {
          this.mostrarAlerta('Información', 'No existen registros.');
        }

        this.reportObtenido = true; // Establecer reportObtenido como true
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

  //----------------------------------------------------------------
  // Muestra una alerta antes de eliminar un registro.
  //----------------------------------------------------------------
  async eliminarRegistro(asistenciaId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar registro',
      message: '¿Estás seguro de que deseas eliminar este registro de asistencia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.asistenciaService.deleteAsistencia(asistenciaId).subscribe(
              () => {
                // Eliminación exitosa, puedes realizar cualquier acción adicional necesaria
                console.log('Registro de asistencia eliminado correctamente');
                this.obtenerAsistencias();
              },
              (error) => {
                console.error('Error al eliminar el registro de asistencia:', error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  //----------------------------------------------------------------
  // Muestra una alerta para editar un registro.
  //----------------------------------------------------------------
  async editarRegistro(registro: any) {
    const alert = await this.alertCtrl.create({
      header: 'Editar registro',
      inputs: [
        {
          name: 'fecha_registro',
          type: 'date',
          value: registro.fecha_registro
        },
        {
          name: 'hora_entrada',
          type: 'time',
          value: registro.hora_entrada.substring(11, 16)
        },
        {
          name: 'hora_salida',
          type: 'time',
          value: registro.hora_salida ? registro.hora_salida.substring(11, 16) : null
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edición cancelada');
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.guardarEdicion(registro.id, data);
          }
        }
      ]
    });

    await alert.present();
  }

  guardarEdicion(registroId: number, data: any) {
    this.registroEditado.fecha_registro = data.fecha_registro;
    this.registroEditado.hora_entrada = new Date(data.fecha_registro + ' ' + data.hora_entrada);
    this.registroEditado.hora_salida = data.hora_salida ? new Date(data.fecha_registro + ' ' + data.hora_salida) : null;
    this.registroEditado.empleado = this.empleadoSeleccionado;

    this.asistenciaService.updateAsistencia(registroId, this.registroEditado).subscribe(
      () => {
        console.log('Registro de asistencia actualizado correctamente');
        this.obtenerAsistencias();
      },
      (error) => {
        console.error('Error al actualizar el registro de asistencia:', error);
      }
    );
  }





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