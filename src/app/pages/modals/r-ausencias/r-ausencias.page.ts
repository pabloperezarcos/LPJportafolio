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
  diasEnMes: Date[] = [];
  asistenciasFiltradas: any[] = [];

  feriadosChile: { fecha: string, nombre: string }[] = [
    { fecha: '2023-01-01', nombre: 'Año Nuevo' },
    { fecha: '2023-01-02', nombre: 'Feriado Adicional' },
    { fecha: '2023-04-07', nombre: 'Viernes Santo' },
    { fecha: '2023-04-08', nombre: 'Sábado Santo' },
    { fecha: '2023-05-01', nombre: 'Día Nacional del Trabajo' },
    { fecha: '2023-05-21', nombre: 'Día de las Glorias Navales' },
    { fecha: '2023-06-21', nombre: 'Día Nacional de los Pueblos Indígenas' },
    { fecha: '2023-06-26', nombre: 'San Pedro y San Pablo' },
    { fecha: '2023-07-16', nombre: 'Día de la Virgen del Carmen' },
    { fecha: '2023-08-15', nombre: 'Asunción de la Virgen' },
    { fecha: '2023-09-18', nombre: 'Independencia Nacional' },
    { fecha: '2023-09-19', nombre: 'Día de las Glorias del Ejército' },
    { fecha: '2023-10-09', nombre: 'Encuentro de Dos Mundos' },
    { fecha: '2023-10-27', nombre: 'Día de las Iglesias Evangélicas y Protestantes' },
    { fecha: '2023-11-01', nombre: 'Día de Todos los Santos' },
    { fecha: '2023-12-08', nombre: 'Inmaculada Concepción' },
    { fecha: '2023-12-25', nombre: 'Navidad' },
  ];

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

  //----------------------------------------------------------------
  // Obtiene la lista de empleados desde el servicio
  //----------------------------------------------------------------
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

  //----------------------------------------------------------------
  // Obtiene los nombres de los empleados para el reporte actual
  //----------------------------------------------------------------
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
  // Obtiene las asistencias para el empleado y mes seleccionados
  //----------------------------------------------------------------
  obtenerAsistencias() {
    // Verificar si no se ha seleccionado un empleado o un mes
    if (!this.empleadoSeleccionado || !this.seleccionarMes) {
      this.mostrarAlerta('Error', 'Debes seleccionar un empleado y un mes');
      return;
    }

    // Obtener las asistencias del servicio
    this.asistenciasService.getAsistencias().subscribe(
      (asistencias: any[]) => {

        // Filtrar las asistencias por empleado y mes seleccionado
        this.asistenciasFiltradas = asistencias.filter(asistencia => {
          const fecha = parseISO(asistencia.fecha_registro);
          const mes = getMonth(fecha);
          return asistencia.empleado === this.empleadoSeleccionado && mes === this.getMonthIndex(this.seleccionarMes);
        });

        // Calcular el primer y último día del mes seleccionado
        const primerDiaMes = startOfMonth(new Date(this.obtenerAnio(), this.getMonthIndex(this.seleccionarMes), 1));
        const ultimoDiaMes = endOfMonth(new Date(this.obtenerAnio(), this.getMonthIndex(this.seleccionarMes), 1));

        // Obtener todos los días del mes, excluyendo los fines de semana
        const diasEnMes = eachDayOfInterval({ start: primerDiaMes, end: ultimoDiaMes });
        this.diasEnMes = diasEnMes.filter(dia => !this.esFinDeSemana(dia));

        // Generar las inasistencias basadas en las asistencias filtradas
        const inasistencias = this.generarInasistencias(this.asistenciasFiltradas);

        // Generar el reporte con las fechas y el estado de las asistencias para cada día del mes
        this.report = this.diasEnMes.map(dia => ({
          fecha: format(dia, 'dd-MM-yyyy'),
          estado: this.getEstadoAsistencia(dia)
        }));

        // Obtener los nombres de los empleados
        this.obtenerNombresEmpleados();
      },
      (error) => {
        console.error(error);
        this.mostrarAlerta('Error', 'No se pudieron obtener las asistencias');
      }
    );
  }

  // Verificar si un día es fin de semana (sábado o domingo)
  esFinDeSemana(dia: Date): boolean {
    return dia.getDay() === 0 || dia.getDay() === 6;
  }

  //----------------------------------------------------------------
  // Genera las inasistencias para los días del mes seleccionado
  //----------------------------------------------------------------
  generarInasistencias(asistenciasFiltradas: any[]) {
    const inasistencias = [];

    // Recorrer cada día del mes
    for (const dia of this.diasEnMes) {
      const fechaRegistro = format(dia, 'yyyy-MM-dd');

      // Verificar si ya existe una asistencia para el día actual
      const asistenciaExistente = this.existeAsistencia(fechaRegistro, asistenciasFiltradas);

      // Determinar si es una inasistencia basada en la falta de asistencia registrada y si el día es fin de semana o feriado en Chile
      const inasistencia = !asistenciaExistente && (dia.getDay() === 0 || dia.getDay() === 6 || this.esFeriadoEnChile(fechaRegistro));

      // Agregar la fecha y el estado de inasistencia al arreglo de inasistencias
      inasistencias.push({ fecha: format(dia, 'yyyy-MM-dd'), inasistencia });
    }

    return inasistencias;
  }

  //----------------------------------------------------------------
  // Verifica si existe una asistencia para la fecha especificada
  //----------------------------------------------------------------
  existeAsistencia(fecha: string, asistenciasFiltradas: any[]): boolean {

    // Verificar si no hay asistencias filtradas o si está vacío
    if (!asistenciasFiltradas || asistenciasFiltradas.length === 0) {
      return false;
    }

    // Convertir la fecha a buscar al formato 'yyyy-MM-dd'
    const fechaBuscar = format(parseISO(fecha), 'yyyy-MM-dd');

    // Verificar si alguna de las asistencias filtradas coincide con la fecha buscada
    return asistenciasFiltradas.some(asistencia => {

      // Obtener la fecha de la asistencia y convertirla a objeto Date
      const fechaAsistencia = new Date(asistencia.fecha_registro.split('T')[0]);

      // Comparar la fecha de la asistencia con la fecha buscada, en el formato 'yyyy-MM-dd'
      return format(fechaAsistencia, 'yyyy-MM-dd') === format(parseISO(fechaBuscar), 'yyyy-MM-dd');
    });
  }

  //----------------------------------------------------------------
  // Obtiene el estado de la asistencia para el día especificado
  //----------------------------------------------------------------
  getEstadoAsistencia(dia: Date): string {

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Convertir la fecha del día al formato 'yyyy-MM-dd'
    const fechaRegistro = format(dia, 'yyyy-MM-dd');

    // Verificar si existe una asistencia para la fecha actual en las asistencias filtradas
    const asistenciaExistente = this.existeAsistencia(fechaRegistro, this.asistenciasFiltradas);

    // Verificar si el día es fin de semana (sábado o domingo)
    const esFinDeSemana = dia.getDay() === 0 || dia.getDay() === 6;

    // Verificar si el día es feriado en Chile
    const esFeriado = this.esFeriadoEnChile(fechaRegistro);

    // Determinar el estado de la asistencia en función de las condiciones
    if (dia > fechaActual) {
      return 'N/A'; // Día en el futuro
    } else if (esFeriado) {
      return 'Feriado';
    } else if (esFinDeSemana && !asistenciaExistente) {
      return 'Fin de semana';
    } else if (asistenciaExistente) {
      return 'Presente';
    } else {
      return 'Ausente';
    }
  }

  //----------------------------------------------------------------
  //Verifica si una fecha específica es un día feriado en Chile.
  //----------------------------------------------------------------
  esFeriadoEnChile(fecha: string): boolean {
    return this.feriadosChile.some(feriado => feriado.fecha === fecha);
  }

  //----------------------------------------------------------------
  // Obtiene el número de días en el mes seleccionado
  //----------------------------------------------------------------
  getDiasEnMes() {
    const fecha = new Date(this.obtenerAnio(), this.getMonthIndex(this.seleccionarMes), 1);
    return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
  }

  //----------------------------------------------------------------
  // Obtiene el año actual
  //----------------------------------------------------------------
  obtenerAnio() {
    return new Date().getFullYear();
  }

  //----------------------------------------------------------------
  // Obtiene el nombre del día de la semana para el día especificado
  //----------------------------------------------------------------
  obtenerDiaSemana(dia: Date): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const indiceDia = dia.getDay();
    return diasSemana[indiceDia];
  }

  //----------------------------------------------------------------
  // Obtiene el total de días ausentes en el mes seleccionado
  //----------------------------------------------------------------
  getTotalDiasAusentes(): number {
    let count = 0;

    // Recorrer cada día del mes
    for (const dia of this.diasEnMes) {

      // Verificar si el estado de la asistencia para el día es 'Ausente'
      if (this.getEstadoAsistencia(dia) === 'Ausente') {

        count++; // Incrementar el contador de días ausentes
      }
    }

    return count; // Devolver el total de días ausentes
  }

  //----------------------------------------------------------------
  // Obtiene el índice del mes a partir del nombre del mes
  //----------------------------------------------------------------
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

  //----------------------------------------------------------------
  // Exporta el reporte como PDF
  //----------------------------------------------------------------
  exportarPDF() {
  }

  //----------------------------------------------------------------
  // Exporta el reporte como archivo XLSX
  //----------------------------------------------------------------
  exportarXLSX() {
  }

  //----------------------------------------------------------------
  // Comparte el reporte a través de WhatsApp
  //----------------------------------------------------------------
  compartirWhatsApp() {
  }

  //----------------------------------------------------------------
  // Comparte el reporte a través de Gmail
  //----------------------------------------------------------------
  compartirGmail() {
  }

  //----------------------------------------------------------------
  // Esta función cierra el modal actual y lo descarta
  //----------------------------------------------------------------
  cerrar() {
    this.modalCtrl.dismiss();
  }
}
