import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.page.html',
  styleUrls: ['./crear-empleado.page.scss'],
})
export class CrearEmpleadoPage implements OnInit {

  formularioRegistro: FormGroup;

  nombre: string = "";
  apellidoPaterno: string = "";
  apellidoMaterno: string = "";

  empleadosbd: any = [];

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public empleadosService: EmpleadosService,
    public platform: Platform,
    public fb: FormBuilder
  ) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellidoPaterno': new FormControl("", Validators.required),
      'apellidoMaterno': new FormControl("", Validators.required)
    });
    this.empleadosService.crearBaseDatos().then(() => {
      this.getEmpleados();
    });
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

  crearEmpleado() {
    this.empleadosService.addTest(this.nombre, this.apellidoPaterno, this.apellidoMaterno).then((data) => {
      this.nombre = "";
      this.apellidoPaterno = "";
      this.apellidoMaterno = "";
      alert(data);
      this.getEmpleados();
    });
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

  cancelar() {
    this.navCtrl.navigateBack(['../empleados']);
  }

}
