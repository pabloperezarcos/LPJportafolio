import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage implements OnInit {

  bd_areas: any = [];
  textoBuscar: string = '';

  nombre: string = "";
  id: number = 0;

  constructor(
    public navCtrl: NavController,
    public areasService: AreasService,
    public platform: Platform,
    public alertController: AlertController
  ) {
    this.areasService.crearBaseDatos().then(() => {
      this.getAreas()
    });

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.areasService.crearBaseDatos().then(() => {
      this.getAreas();
    });
  }

  busquedaChange(event) {
    this.textoBuscar = event.detail.value;
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getAreas();
      event.target.complete();
    }, 1500);
  }

  getAreas() {
    this.areasService.getAreas().then((data) => {
      this.bd_areas = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.bd_areas.push(data.rows.item(i));
        }
      }
    });
  }

  editarArea(data) {
    this.nombre = data.nombre;
    this.id = data.id;

    this.areasService.editarArea(this.nombre, this.id)
      .then((data) => {
        this.nombre = "";
        alert(data);
        this.areasService.getAreas();
      });
  }

  async mostrarAlertaEditar(areas) {
    const alert = await this.alertController.create({
      header: 'Editar área',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: areas.nombre,
          placeholder: 'area'
        },
        {
          name: 'id',
          type: 'text',
          value: areas.id,
          label: 'ID: ',
          attributes: {
            disabled: true
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Editar',
          handler: (data) => {
            console.log('Confirm Ok');
            this.editarArea(data);
          }
        }
      ]
    });
    await alert.present();
  }

  borrarArea(id: number) {
    this.areasService.borrarArea(id).then((data) => {
      alert(data);
      this.getAreas();
    });
  }

  async alertaEliminar(id: number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea borrar esta área?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Eliminar',
          handler: (data) => {
            this.borrarArea(id);
          }
        }
      ]
    });
    await alert.present();
  }

  agregarArea(data) {
    this.nombre = data.nombre;

    this.areasService.addArea(this.nombre)
      .then((data) => {
        this.nombre = "";
        alert(data);
        this.getAreas();
      });
  }

  async mostrarAlertaAgregar() {
    const alert = await this.alertController.create({
      header: 'Crear area',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Area'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Agregar',
          handler: (data) => {
            console.log('Confirm Ok');
            this.agregarArea(data);
          }
        }
      ]
    });

    await alert.present();
  }



}
