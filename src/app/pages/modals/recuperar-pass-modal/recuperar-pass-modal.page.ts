import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-pass-modal',
  templateUrl: './recuperar-pass-modal.page.html',
  styleUrls: ['./recuperar-pass-modal.page.scss'],
})
export class RecuperarPassModalPage implements OnInit {

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  salirMenuPrincipal(){

    this.modalCtrl.dismiss();

  }

}
