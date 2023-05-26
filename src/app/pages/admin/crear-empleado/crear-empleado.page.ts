import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.page.html',
  styleUrls: ['./crear-empleado.page.scss'],
})
export class CrearEmpleadoPage implements OnInit {

  /* apiEmpleados: any; */
  empleados: any[];


  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public empleadosService: EmpleadosService,
    public platform: Platform
  ) {
    /* this.listarEmpleados(); */
  }

  ngOnInit() {
    /* this.listarEmpleados(); */
    this.getEmpleados();
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

  getEmpleados(){
    this.empleadosService.getEmpleados().subscribe(
      (data: any) => {
        this.empleados = data;
      },
      (error) => {
        console.error(error);
      }
    )
  }

/*   listarEmpleados() {
    this.empleadosService.getEmpleados()
    .then(data => {
      //console.log(data['data'])
      this.apiEmpleados = data.data;
    },
      (error) => {
        console.error(error)
      });
} */


  cancelar() {
    this.navCtrl.navigateBack(['../empleados']);
  }

}
