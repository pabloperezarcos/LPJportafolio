import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { RegistroasistenciaService } from 'src/app/services/registroasistencia.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnDestroy {

  usuario = JSON.parse(localStorage.getItem("usuario"));

  scanActive: boolean = false;
  scanResult: any;
  content_visibility = '';

  bd_asistencia: any = [];
  registro: string = "";
  //id: number = 0;

  constructor(
    public registroAsistencia: RegistroasistenciaService,
    public alertCtrl: AlertController
  ) {
    this.registroAsistencia.crearBaseDatos().then(() => {
      this.getAsistencia();
    });
  }

  getAsistencia() {
    this.registroAsistencia.getAsistencia().then((data) => {
      this.bd_asistencia = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.bd_asistencia.push(data.rows.item(i));
        }
      }
    });
  }

  ngOnDestroy() {
    this.stopScan();
  }

  async checkPermission() {
    try {
      // Verificar o solicitar permisos.
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // El usuario da los accesos.
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  async startScan() {
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
        this.registro = this.scanResult;
        console.log(this.scanResult);
        this.agregarAsistencia();
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  agregarAsistencia() {
    this.registroAsistencia.addAsistencia(this.registro).then((registro) => {
        this.registro = "";
        alert(registro);
        this.getAsistencia();
      });
  }

 /*  agregarAsistencia() {
    this.registroAsistencia.addAsistencia(this.registro).then((data) => {
      this.registro = "";
      alert(data);
      this.getAsistencia();
    });
  } */

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }

  async mostrarInfo() {
    const alert = await this.alertCtrl.create({
      header: 'Información',
      message: 'Para quedar presente en la clase, presionar el botón "Registrar asistencia" para luego escanear el código QR presentado por el profesor.',
      buttons: ['OK'],
    });
    await alert.present();
  }


}
