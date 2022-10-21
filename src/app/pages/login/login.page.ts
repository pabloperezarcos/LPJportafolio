import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ModalController, NavController, AnimationController } from '@ionic/angular';
import { RecuperarPassModalPage } from '../modals/recuperar-pass-modal/recuperar-pass-modal.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulariologin: FormGroup;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private animationCtrl: AnimationController,
    public fb: FormBuilder
  ) {
    this.formulariologin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'ERROR',
      subHeader: 'Usuario o contraseña incorrectos.',
      message: 'Por favor, vuelva a ingresar los datos.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async iniciarSesion() {
    
    var f = this.formulariologin.value;
    
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    
    if (usuario.email == f.email && usuario.password == f.password) {
      
      localStorage.setItem('ingresado', 'true');
      
      if (usuario.inputOption == "profesor") {
        this.navCtrl.navigateForward(['home-docente/'])  
      } else if (usuario.inputOption == "alumno"){
        this.navCtrl.navigateForward(['home-alumno/'])
      }
    } else {
      this.presentAlert();
    }
  }

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



}
