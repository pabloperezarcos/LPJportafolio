import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalles-empleados',
  templateUrl: './detalles-empleados.page.html',
  styleUrls: ['./detalles-empleados.page.scss'],
})
export class DetallesEmpleadosPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }  

  cerrar() {
    this.modalCtrl.dismiss();
  }

  //----------------------------------------------------------------
  // FIN DETALLES-EMPEADOS-PAGE.TS
  //----------------------------------------------------------------
}
