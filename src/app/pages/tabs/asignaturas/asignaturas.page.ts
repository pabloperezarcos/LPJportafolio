import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AsignaturasService } from 'src/app/services/asignaturas.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  bd_asignatura: any = [];
  textoBuscar: string = '';

  nombre: string = "";
  id: number = 0;

  constructor(
    public navCtrl: NavController,
    public asignaturaService: AsignaturasService,
    public platform: Platform,
    public alertController: AlertController
  ) {
    this.asignaturaService.crearBaseDatos().then(() => {
      this.getAsignatura();
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.asignaturaService.crearBaseDatos().then(() => {
      this.getAsignatura();
    });
  }

  busquedaChange(event) {
    this.textoBuscar = event.detail.value;
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getAsignatura();
      event.target.complete();
    }, 1500);
  }

  getAsignatura() {
    this.asignaturaService.getAsignatura().then((data) => {
      this.bd_asignatura = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.bd_asignatura.push(data.rows.item(i));
        }
      }
    });
  }

  editarAsignatura(data) {
    this.nombre = data.nombre;
    this.id = data.id;

    this.asignaturaService.editarAsignatura(this.nombre, this.id)
      .then((data) => {
        this.nombre = "";
        alert(data);
        this.asignaturaService.getAsignatura();
      });
  }

  async mostrarAlertaEditar(asignatura) {
    const alert = await this.alertController.create({
      header: 'Editar asignatura',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: asignatura.nombre,
          placeholder: 'asignatura'
        },
        {
          name: 'id',
          type: 'text',
          value: asignatura.id,
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
            this.editarAsignatura(data);
          }
        }
      ]
    });
    await alert.present();
  }

  borrarAsignatura(id: number) {
    this.asignaturaService.borrarAsignatura(id).then((data) => {
      alert(data);
      this.getAsignatura();
    });
  }

  async alertaEliminar(id: number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea borrar esta asignatura?',
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
            this.borrarAsignatura(id);
          }
        }
      ]
    });
    await alert.present();
  }

  agregarAsignatura(data) {
    this.nombre = data.nombre;

    this.asignaturaService.addAsignatura(this.nombre)
      .then((data) => {
        this.nombre = "";
        alert(data);
        this.getAsignatura();
      });
  }

  async mostrarAlertaAgregar() {
    const alert = await this.alertController.create({
      header: 'Crear asignatura',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Asignatura'
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
            this.agregarAsignatura(data);
          }
        }
      ]
    });

    await alert.present();
  }



}
