import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeriadosService } from 'src/app/services/feriados.service';

@Component({
  selector: 'app-feriados-modal',
  templateUrl: './feriados-modal.page.html',
  styleUrls: ['./feriados-modal.page.scss'],
})
export class FeriadosModalPage implements OnInit {

  apiFeriados: any;

  constructor(private modalCtrl: ModalController,
    private feriadosService: FeriadosService
  ) {
    this.listarFeriados();
  }

  ngOnInit() {
  }

  listarFeriados() {
    this.feriadosService.obtenerListadoFeriados()
      .then(data => {
        //console.log(data['data'])
        this.apiFeriados = data.data;
      },
        (error) => {
          console.error(error)
        });
  }

  salirMenuPrincipal() {
    this.modalCtrl.dismiss();
  }

}
