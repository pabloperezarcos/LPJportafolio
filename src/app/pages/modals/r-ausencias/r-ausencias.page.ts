import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AsistenciaService } from 'src/app/services/asistencias.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { PdfService } from 'src/app/services/pdf.service';
import { XlsxService } from 'src/app/services/xlsx.service';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, parseISO, getMonth } from 'date-fns';


@Component({
  selector: 'app-r-ausencias',
  templateUrl: './r-ausencias.page.html',
  styleUrls: ['./r-ausencias.page.scss'],
})
export class RAusenciasPage implements OnInit {

  report: any[];
  empleados: any[] = [];
  empleadoSeleccionado: number;
  seleccionarMes: string;
  inasistencias: { fecha: Date, inasistencia: boolean }[] = [];
  asistenciasFiltradas: any[];


  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private asistenciasService: AsistenciaService,
    private empleadosService: EmpleadosService,
    private pdfService: PdfService,
    private xlsxService: XlsxService
  ) { }

  ngOnInit() {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadosService.getEmpleados().subscribe(
      (empleados: any[]) => {
        this.empleados = empleados;
      },
      (error) => {
        console.error(error);
      }
    );
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

  obtenerAsistencias() {
    if (!this.empleadoSeleccionado || !this.seleccionarMes) {
      this.mostrarAlerta('Error', 'Debes seleccionar un empleado y un mes');
      return;
    }

    this.asistenciasService.getAsistencias().subscribe(
      (asistencias: any[]) => {
        console.log('Asistencias:', asistencias);

        const asistenciasFiltradas = asistencias.filter(asistencia => {
          const fecha = parseISO(asistencia.fecha_registro);
          const mes = getMonth(fecha);
          return asistencia.empleado === this.empleadoSeleccionado && mes === this.getMonthIndex(this.seleccionarMes);
        });

        console.log('Asistencias filtradas:', asistenciasFiltradas);

        const inasistencias = asistenciasFiltradas.reduce((acc, curr) => {
          const fecha = parseISO(curr.fecha_registro);
          const fechaRegistro = format(fecha, 'yyyy-MM-dd');

          if (!acc.some(item => item.fecha === fechaRegistro)) {
            acc.push({ fecha: fechaRegistro, inasistencia: false });
          }

          return acc;
        }, []);

        console.log('Inasistencias:', inasistencias);

        this.report = inasistencias.map(item => ({
          fecha: item.fecha,
          estado: item.inasistencia ? 'Ausente' : 'OK'
        }));

        this.asistenciasFiltradas = asistenciasFiltradas; // Agregar esta línea después de generar las inasistencias
      },
      (error) => {
        console.error(error);
        this.mostrarAlerta('Error', 'No se pudieron obtener las asistencias');
      }
    );
  }



  generarInasistencias(asistenciasFiltradas: any[]) {
    const diasEnMes = this.getDiasEnMes();
    const inasistencias = [];

    for (let i = 1; i <= diasEnMes; i++) {
      const fecha = new Date(this.obtenerAnio(), this.getMonthIndex(this.seleccionarMes), i);
      const esFinDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6;
      const fechaBuscar = format(fecha, 'yyyy-MM-dd'); // Convertir la fecha al formato "yyyy-MM-dd"
      const asistenciaExistente = this.existeAsistencia(fechaBuscar, asistenciasFiltradas); // Pasar la fecha convertida como argumento
      const inasistencia = esFinDeSemana && !asistenciaExistente;

      inasistencias.push({ fecha, inasistencia });
    }

    return inasistencias;
  }

  existeAsistencia(fecha: string, asistenciasFiltradas: any[]): boolean {
    if (!asistenciasFiltradas || asistenciasFiltradas.length === 0) {
      return false;
    }

    const fechaBuscar = new Date(fecha); // Convertir la cadena de texto a objeto Date

    return asistenciasFiltradas.some(asistencia => {
      const fechaAsistencia = new Date(asistencia.fecha_registro.split('T')[0]); // Convertir la cadena de texto a objeto Date
      return fechaAsistencia.toISOString().split('T')[0] === fechaBuscar.toISOString().split('T')[0]; // Comparar las fechas
    });
  }

  getDiasEnMes() {
    const fecha = new Date(this.obtenerAnio(), this.getMonthIndex(this.seleccionarMes), 1);
    return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
  }

  obtenerAnio() {
    return new Date().getFullYear();
  }

  getMonthIndex(monthName: string) {
    const monthNames = [
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
    return monthNames.indexOf(monthName.toLowerCase());
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