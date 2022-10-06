import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-registro-clase-modal',
  templateUrl: './registro-clase-modal.page.html',
  styleUrls: ['./registro-clase-modal.page.scss'],
})
export class RegistroClaseModalPage implements OnInit {

  qrCodeString = "";
  asignatura: string;
  fechaClase: string;

  constructor(private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    console.log(navParams.get('inputOption'));
    console.log(navParams.get('nuevaFecha'));
  }

  ngOnInit() {
    
    this.qrCodeString = this.navParams.get('inputOption')+' '+this.navParams.get('nuevaFecha') ;
    this.asignatura = this.navParams.get('inputOption');
    this.fechaClase = this.navParams.get('nuevaFecha');
  }



  salirMenuPrincipal() {
    this.modalCtrl.dismiss();
  }

}
