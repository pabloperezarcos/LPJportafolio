import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.page.html',
  styleUrls: ['./crear-empleado.page.scss'],
})
export class CrearEmpleadoPage implements OnInit {
  datos: any;
  apiEmpleados: any;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public empleadosService: EmpleadosService,
    public platform: Platform
  ) {
    this.obtenerEmpleados();
  }

  ngOnInit() {
    this.empleadosService.getDatos()
      .subscribe((data) => {
        this.datos = data;
      }, (error) => {
        console.log(error);
      });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Ups...',
      subHeader: 'Datos incorrectos.',
      message: 'Por favor, verifique que los datos coincidan con lo solicitado.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async successAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Éxito al guardar',
      subHeader: '',
      message: 'Empleado creado.',
      buttons: ['OK']
    });

    await alert.present();
  }

  //----------------------------------------------------------------
  // Obtener usuario de la base de datos
  //----------------------------------------------------------------

  obtenerEmpleados() {
    this.empleadosService.getEmpleados()
    .then(data => {
      //console.log(data['data'])
      this.apiEmpleados = data.data;
    },
      (error) => {
        console.error(error)
      });
}


  cancelar() {
    this.navCtrl.navigateBack(['../empleados']);
  }

}
