import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.page.html',
  styleUrls: ['./crear-empleado.page.scss'],
})
export class CrearEmpleadoPage implements OnInit {

  nombreempleado: string = '';
  ap_paternoempleado: string = '';
  ap_maternoempleado: string = '';
  direccionempleado: string = '';
  rutempleado: string = '';
  passwordhash: string = '';
  pass2: string = '';
  tipousuario: string = 'administrador';
  estadoempleado: string = 'activo';

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

  resetForm() {
    this.nombreempleado = '';
    this.ap_paternoempleado = '';
    this.ap_maternoempleado = '';
    this.direccionempleado = '';
    this.rutempleado = '';
    this.passwordhash = '';
    this.pass2 = '';
    this.estadoempleado = 'administrador';
    this.tipousuario = 'activo';
  }

  cancelar() {
    this.navCtrl.navigateBack(['../empleados']);
  }

  //----------------------------------------------------------------
  // POS: Crear usuario en la base de datos
  //----------------------------------------------------------------

  crearEmpleado() {
    if (this.passwordhash !== this.pass2) {
      this.presentAlert();
      return;
    }

    const empleado = {
      nombreempleado: this.nombreempleado,
      ap_paternoempleado: this.ap_paternoempleado,
      ap_maternoempleado: this.ap_maternoempleado,
      direccionempleado: this.direccionempleado,
      rutempleado: this.rutempleado,
      passwordhash: this.passwordhash,
      tipousuario: this.tipousuario,
      estadoempleado: this.estadoempleado
    };

    this.empleadosService.posEmpleados(empleado)
      .subscribe(
        () => {
          console.log('Empleado creado con éxito');
          this.successAlert();
          this.resetForm();
        },
        error => {
          console.error('Error al crear el empleado', error);
        }
      );
  }

  /* FIN CREAR-EMPLEADO.PAGE.TS */
}
