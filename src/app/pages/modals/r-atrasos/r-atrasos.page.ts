import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-r-atrasos',
  templateUrl: './r-atrasos.page.html',
  styleUrls: ['./r-atrasos.page.scss'],
})
export class RAtrasosPage implements OnInit {

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
