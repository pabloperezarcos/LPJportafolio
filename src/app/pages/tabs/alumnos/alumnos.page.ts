import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  alumnosbd: any = [];
  textoBuscar: string = '';

  nombre: string = "";
  apellidoPaterno: string = "";
  apellidoMaterno: string = "";
  id: number = 0;

  constructor(
    public navCtrl: NavController,
    public alumnosService: AlumnosService,
    public platform: Platform,
    public alertController: AlertController
  ) {
    this.alumnosService.crearBaseDatos().then(() => {
      this.getAlumno();
    });
  }

  ngOnInit() {
  }

  busquedaChange(event) {
    this.textoBuscar = event.detail.value;
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getAlumno();
      event.target.complete();
    }, 1500);
  }

  getAlumno() {
    this.alumnosService.getAlumno().then((data) => {
      this.alumnosbd = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.alumnosbd.push(data.rows.item(i));
        }
      }
    });
  }

  editarAlumno(data) {
    this.nombre = data.nombre;
    this.apellidoPaterno = data.apellidoPaterno;
    this.apellidoMaterno = data.apellidoMaterno;
    this.id = data.id;

    this.alumnosService.editarAlumno(this.nombre, this.id, this.apellidoPaterno, this.apellidoMaterno)
      .then((data) => {
        this.nombre = "";
        this.apellidoPaterno = "";
        this.apellidoMaterno = "";
        alert(data);
        this.alumnosService.getAlumno();
      });
  }

  async mostrarAlertaEditar(alumno) {
    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: alumno.nombre,
          placeholder: 'Nombre'
        },
        {
          name: 'apellidoPaterno',
          type: 'text',
          value: alumno.apellidoPaterno,
          placeholder: 'Apellido paterno'
        },
        {
          name: 'apellidoMaterno',
          type: 'text',
          value: alumno.apellidoMaterno,
          placeholder: 'Apellido materno'
        },
        {
          name: 'id',
          type: 'text',
          value: alumno.id,
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
            this.editarAlumno(data);
          }
        }
      ]
    });
    await alert.present();
  }


  borrarAlumno(id: number) {
    this.alumnosService.borrarAlumno(id).then((data) => {
      alert(data);
      this.getAlumno();
    });
  }

  async alertaEliminar(id: number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea borrar este alumno?',
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
            this.borrarAlumno(id);
          }
        }
      ]
    });
    await alert.present();
  }

  crearAlumno() {
    this.navCtrl.navigateForward(['agregar-alumno/']);
  }

}
