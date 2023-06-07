import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-r-individual',
  templateUrl: './r-individual.page.html',
  styleUrls: ['./r-individual.page.scss'],
})
export class RIndividualPage implements OnInit {

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