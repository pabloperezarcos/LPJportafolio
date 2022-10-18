import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit {

  usuario = JSON.parse(localStorage.getItem("usuario"));
  scanResult: any;

  constructor(
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {

  }

  async checkPermission() {
    try {
      //Revisar o solicitar permisos
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        //El usuario otorga permiso
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
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
      const result = await BarcodeScanner.startScan();
      console.log(result);
      if (result?.hasContent) {
        this.scanResult = result.content;
        BarcodeScanner.showBackground();
        document.querySelector('body').classList.remove('scanner-active');
        console.log(this.scanResult);
      }
    } catch (error) {
      console.log(error);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
  }

}
