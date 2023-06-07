import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.page.html',
  styleUrls: ['./crear-empleado.page.scss'],
})
export class CrearEmpleadoPage implements OnInit {

  nombre: string = '';
  ap_paterno: string = '';
  ap_materno: string = '';
  direccion: string = '';
  rut: string = '';
  password: string = '';
  pass2: string = '';
  tipo_usuario: string = 'administrador';
  estado: string = 'activo';

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public empleadosService: EmpleadosService,
    public platform: Platform
  ) {
  }

  ngOnInit() {
  }

  // Muestra una alerta de error genérica
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

  // Muestra una alerta de éxito al guardar el empleado
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

  // Muestra una alerta de error específica para el campo RUN
  async mostrarAlertaRun() {
    const alert = await this.alertCtrl.create({
      header: 'Error de RUN',
      message: 'El RUN ingresado no es válido.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  // Resetea el formulario
  resetForm() {
    this.nombre = '';
    this.ap_paterno = '';
    this.ap_materno = '';
    this.direccion = '';
    this.rut = '';
    this.password = '';
    this.pass2 = '';
    this.estado = 'administrador';
    this.tipo_usuario = 'activo';
  }

  // Cierra la ventana actual y regresa a la página de empleados
  async cerrar() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar cierre',
      message: '¿Estás seguro de que quieres cerrar la ventana?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateBack(['../empleados']);
          }
        }
      ]
    });

    await alert.present();
  }

  //----------------------------------------------------------------
  // POS: Crear usuario en la base de datos
  //----------------------------------------------------------------

  crearEmpleado() {
    // Verifica si las contraseñas coinciden
    if (this.password !== this.pass2) {
      this.presentAlert();
      return;
    }

    // Valida el campo RUN
    if (this.validarRut(this.rut)) {
      const empleado = {
        nombre: this.nombre,
        ap_paterno: this.ap_paterno,
        ap_materno: this.ap_materno,
        direccion: this.direccion,
        rut: this.rut,
        password: this.password,
        tipo_usuario: this.tipo_usuario,
        estado: this.estado
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

    } else {
      this.mostrarAlertaRun();
    }

  }

  //----------------------------------------------------------------
  // CALIDACIÓN PARA CAMPO RUN - CHILE
  //----------------------------------------------------------------

  validarRut(rut: string): boolean {
    // Remover puntos y guión del RUT
    rut = rut.replace(/\./g, '').replace(/-/g, '');

    // Validar longitud mínima del RUT
    if (rut.length < 2) {
      return false;
    }

    // Obtener el dígito verificador
    const dv = rut.slice(-1).toUpperCase();
    const num = parseInt(rut.slice(0, -1), 10);

    // Calcular el dígito verificador esperado
    const expectedDv = this.calcularDigitoVerificador(num);

    // Comparar el dígito verificador ingresado con el esperado
    return dv === expectedDv;
  }

  calcularDigitoVerificador(rut: number): string {
    let sum = 0;
    let factor = 2;

    while (rut > 0) {
      const digit = rut % 10;
      sum += digit * factor;
      rut = Math.floor(rut / 10);
      factor = factor === 7 ? 2 : factor + 1;
    }

    const remainder = sum % 11;
    const verificador = 11 - remainder;

    if (verificador === 11) {
      return '0';
    } else if (verificador === 10) {
      return 'K';
    } else {
      return verificador.toString();
    }
  }



  /* FIN CREAR-EMPLEADO.PAGE.TS */
}
