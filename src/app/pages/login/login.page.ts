import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, AnimationController } from '@ionic/angular';
import { RecuperarPassModalPage } from '../modals/recuperar-pass-modal/recuperar-pass-modal.page';
import { Storage } from '@ionic/storage-angular';
import { EmpleadosService } from 'src/app/services/empleados.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  run: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private animationCtrl: AnimationController,
    private httpClient: HttpClient,
    private router: Router,
    private storage: Storage,
    private empleadosService: EmpleadosService
  ) {
    this.storage.create();
  }

  ngOnInit() {
  }

  // Esta función muestra una alerta de error al iniciar sesión
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'Usuario o contraseña incorrectos.',
      message: 'Por favor, vuelva a ingresar los datos.',
      buttons: ['OK']
    });

    await alert.present();
  }

  //----------------------------------------------------------------
  // lógica para iniciar sesión.
  //----------------------------------------------------------------
  async iniciarSesion() {
    const credentials = {
      rut: this.run,
      password: this.password
    };
    this.httpClient.post('http://144.22.40.186:8000/login/', credentials).subscribe(
      (response) => {
        console.log(response);
        this.storage.set('rut', this.run).then(() => {
          console.log('Dato almacenado en Storage:', this.run);
          this.router.navigate(['/home']);

          // Obtener empleados y buscar el empleado con el rut
          this.empleadosService.getEmpleados().subscribe(
            (empleados: any[]) => {
              let empleadoEncontrado: any = null;
              empleados.forEach((empleado: any) => {
                if (empleado.rut === this.run) {
                  empleadoEncontrado = empleado;
                }
              });

              if (empleadoEncontrado) {
                const empleadoId = empleadoEncontrado.id;
                const tipoUsuario = empleadoEncontrado.tipo_usuario;
                // Guardar empleadoId y tipoUsuario en otras variables del local storage
                this.storage.set('id', empleadoId).then(() => {
                  console.log('Valor id almacenado en el local storage:', empleadoId);
                }).catch((error) => {
                  console.error('Error al almacenar el valor id en el local storage:', error);
                });

                this.storage.set('tipoUsuario', tipoUsuario).then(() => {
                  console.log('Valor tipoUsuario almacenado en el local storage:', tipoUsuario);
                }).catch((error) => {
                  console.error('Error al almacenar el valor tipoUsuario en el local storage:', error);
                });
              }
            },
            (error) => {
              console.error(error);
            }
          );
        });
      },
      (error) => {
        console.error(error);
        this.presentAlert(); // Mostrar alerta de error
      }
    );
  }

  //----------------------------------------------------------------
  // lógica para recuperar contraseña en un modals.
  //----------------------------------------------------------------

  async recuperarPass() {

    // Animaciones para mostrar el modal
    const enterAnimation = (baseEl: any) => {
      const root = baseEl.shadowRoot;
      const backdropAnimation = this.animationCtrl.create()
        .addElement(root.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl.create()
        .addElement(root.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' }
        ]);

      return this.animationCtrl.create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    const leaveAnimation = (baseEl: any) => {
      return enterAnimation(baseEl).direction('reverse');
    }

    // Crear y mostrar el modal
    const modal = await this.modalCtrl.create({
      component: RecuperarPassModalPage,
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  }



  /* FIN LOGIN.PAGE.TS */
}
