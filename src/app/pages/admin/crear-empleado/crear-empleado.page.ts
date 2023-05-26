import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.page.html',
  styleUrls: ['./crear-empleado.page.scss'],
})
export class CrearEmpleadoPage implements OnInit {

  empleados: any[];

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public empleadosService: EmpleadosService,
    public platform: Platform
  ) {
    
  }

  ngOnInit() {

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


  cancelar() {
    this.navCtrl.navigateBack(['../empleados']);
  }

}
