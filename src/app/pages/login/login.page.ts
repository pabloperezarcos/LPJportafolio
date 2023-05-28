import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController, NavController, AnimationController } from '@ionic/angular';
import { RecuperarPassModalPage } from '../modals/recuperar-pass-modal/recuperar-pass-modal.page';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


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
    private authService: AuthService
  ) {

  }

  ngOnInit() {
  }

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
      rutempleado: this.run,
      passwordhash: this.password
    };

    this.httpClient.post('http://144.22.40.186:8000/login/', credentials).subscribe(
      (response) => {
        // Aquí puedes manejar la respuesta del inicio de sesión exitoso
        console.log(response);
        // Realiza cualquier acción adicional que necesites, como redireccionar a la página principal
        this.authService.setUsuario(response);
        this.router.navigate(['/home-admin']);
      },
      (error) => {
        // Aquí puedes manejar el error de inicio de sesión
        console.error(error);
        this.presentAlert(); // Mostrar alerta de error
      }
    );
  }

  //----------------------------------------------------------------
  // lógica para recuperar contraseña en un modals.
  //----------------------------------------------------------------

  async recuperarPass() {
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

    const modal = await this.modalCtrl.create({
      component: RecuperarPassModalPage,
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  }



  /* FIN LOGIN.PAGE.TS */
}
