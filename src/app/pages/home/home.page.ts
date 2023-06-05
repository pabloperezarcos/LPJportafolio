import { Component, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

import { AsistenciaService } from 'src/app/services/asistencias.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {

  content_visibility = '';
  asistencias: any[] = [];
  scanActive: boolean = false;
  scanResult: any;
  horaEntrada: string;
  horaSalida: string;
  entradaRegistrada: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    private asistenciaService: AsistenciaService,
    private storage: Storage
  ) {
  }

  ngOnDestroy() {
    this.stopScan();
  }

  ionViewWillEnter() {
    //Esto realiza el GET de asistencias al entrar al momento de entrar a la page.
    this.obtenerAsistencias();
  }

  //----------------------------------------------------------------
  // lógica para el botón para registrar las entradas.
  //----------------------------------------------------------------
  async registrarEntrada() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scanResult = result.content;
        this.horaEntrada = this.scanResult;
        this.entradaRegistrada = true;

        const idEmpleado = await this.storage.get('id');

        const nuevaAsistencia = {
          hora_entrada: this.horaEntrada,
          hora_salida: null,
          empleado: idEmpleado
        };

        this.asistenciaService.createAsistencia(nuevaAsistencia).subscribe(
          (response) => {
            console.log('Asistencia creada:', response);
            this.obtenerAsistencias();
          },
          (error) => {
            console.error('Error al crear asistencia:', error);
          }
        );

        await this.mostrarAlerta('Entrada registrada', `Hora de entrada: ${this.horaEntrada}`);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  //----------------------------------------------------------------
  // lógica para el botón para registrar las salidas.
  //----------------------------------------------------------------
  async registrarSalida() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scanResult = result.content;
        this.horaSalida = this.scanResult;
        this.entradaRegistrada = false;

        const idEmpleado = await this.storage.get('id');

        const nuevaAsistencia = {
          hora_entrada: null,
          hora_salida: this.horaSalida,
          empleado: idEmpleado
        };

        this.asistenciaService.createAsistencia(nuevaAsistencia).subscribe(
          (response) => {
            console.log('Asistencia creada:', response);
            this.obtenerAsistencias();
          },
          (error) => {
            console.error('Error al crear asistencia:', error);
          }
        );

        await this.mostrarAlerta('Salida registrada', `Hora de salida: ${this.horaSalida}`);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  //----------------------------------------------------------------
  // GET a la API para traer los registros del empleado logueado.
  //----------------------------------------------------------------
  obtenerAsistencias() {
    this.storage.get('id').then((idEmpleado) => {
      //console.log('ID EMPLEADO ANTES DEL FILTRO:', idEmpleado);

      this.asistenciaService.getAsistencias().subscribe(
        (response: any) => {
          // Ordenar por ID de forma ascendente
          this.asistencias = response
            .filter((asistencia) => asistencia.empleado === idEmpleado)
            .sort((a, b) => a.id - b.id);

          // console.log('ID EMPLEADO DESPUES DEL FILTRO:', idEmpleado);
          // console.log('Asistencias obtenidas:', this.asistencias);

          this.asistencias.forEach((asistencia) => {
            asistencia.hora_entrada = this.convertirFormatoHora(asistencia.hora_entrada);
            asistencia.hora_salida = this.convertirFormatoHora(asistencia.hora_salida);
          });
        },
        (error) => {
          console.error('Error al obtener asistencias:', error);
        }
      );
    }).catch((error) => {
      console.error('Error al obtener el ID del empleado:', error);
    });
  }

  //----------------------------------------------------------------
  // FUNCIONES VARIAS
  //----------------------------------------------------------------
  convertirFormatoHora(hora: string): string {
    //Transforma la hora recibida de la base de datos a formato horas:minutos 00:00
    if (hora) {
      const fechaHora = new Date(hora);
      const horas = fechaHora.getHours();
      const minutos = fechaHora.getMinutes();
      return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    }
    return '';
  }

  formatDate(dateString: string): string {
    //Transforma la fecha recibida de la base de datos a formato dia/mes/año 01/01/2000
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  async checkPermission() {
    //Esto verifica si la aplicación tiene los permisos para acceder a la cámara.
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    //Esto muestra una alerta positiva o negativa de cuando alguien registra entrada o salida.
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  stopScan() {
    //Esto se ejecuta para cerrar la camara una vez que captó informacion en el codigo QR.
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }


  /* FIN HOME.PAGE.TS */
}
