import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleadosbd: any = [];
  textoBuscar: string = '';

  nombre: string = "";
  apellidoPaterno: string = "";
  apellidoMaterno: string = "";
  id: number = 0;

  constructor(
    public navCtrl: NavController,
    public empleadosService: EmpleadosService,
    public platform: Platform,
    public alertController: AlertController
  ) {
    this.empleadosService.crearBaseDatos().then(() => {
      this.getEmpleados();
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.empleadosService.crearBaseDatos().then(() => {
      this.getEmpleados();
    });
  }

  busquedaChange(event) {
    this.textoBuscar = event.detail.value;
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getEmpleados();
      event.target.complete();
    }, 1500);
  }

  getEmpleados() {
    this.empleadosService.getEmpleados().then((data) => {
      this.empleadosbd = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.empleadosbd.push(data.rows.item(i));
        }
      }
    });
  }

  editarEmpleados(data) {
    this.nombre = data.nombre;
    this.apellidoPaterno = data.apellidoPaterno;
    this.apellidoMaterno = data.apellidoMaterno;
    this.id = data.id;

    this.empleadosService.editarEmpleados(this.nombre, this.id, this.apellidoPaterno, this.apellidoMaterno)
      .then((data) => {
        this.nombre = "";
        this.apellidoPaterno = "";
        this.apellidoMaterno = "";
        alert(data);
        this.empleadosService.getEmpleados();
      });
  }

  async mostrarAlertaEditar(empleado) {
    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: empleado.nombre,
          placeholder: 'Nombre'
        },
        {
          name: 'apellidoPaterno',
          type: 'text',
          value: empleado.apellidoPaterno,
          placeholder: 'Apellido paterno'
        },
        {
          name: 'apellidoMaterno',
          type: 'text',
          value: empleado.apellidoMaterno,
          placeholder: 'Apellido materno'
        },
        {
          name: 'id',
          type: 'text',
          value: empleado.id,
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
            this.editarEmpleados(data);
          }
        }
      ]
    });
    await alert.present();
  }


  borrarEmpleado(id: number) {
    this.empleadosService.borrarEmpleado(id).then((data) => {
      alert(data);
      this.getEmpleados();
    });
  }

  async alertaEliminar(id: number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea borrar este empleado?',
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
            this.borrarEmpleado(id);
          }
        }
      ]
    });
    await alert.present();
  }

  crearEmpleado() {
    this.navCtrl.navigateForward(['agregar-empleado/']);
  }

}
