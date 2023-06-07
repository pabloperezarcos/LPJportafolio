import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-r-ausencias',
  templateUrl: './r-ausencias.page.html',
  styleUrls: ['./r-ausencias.page.scss'],
})
export class RAusenciasPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }





  
  // Esta función cierra el modal actual y lo descarta
  cerrar() {
    this.modalCtrl.dismiss();
  }
}