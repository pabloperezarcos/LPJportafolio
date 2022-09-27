import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-registro-clase-modal',
  templateUrl: './registro-clase-modal.page.html',
  styleUrls: ['./registro-clase-modal.page.scss'],
})
export class RegistroClaseModalPage implements OnInit {

  qrCodeString = 'asistencia a IONIC Angular';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  salirMenuPrincipal() {
    this.modalCtrl.dismiss();
  }

}
