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

  // Esta función capitaliza la primera letra de un valor de tipo string
  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  // Esta función cierra el modal actual y lo descarta
  cerrar() {
    this.modalCtrl.dismiss();
  }
  

  //----------------------------------------------------------------
  // FIN DETALLES-EMPEADOS-PAGE.TS
  //----------------------------------------------------------------
}