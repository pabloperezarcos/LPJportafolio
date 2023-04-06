import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
/* import { ModalController,AnimationController } from '@ionic/angular';
import { RegisterUserModalPage } from '../modals/register-user-modal/register-user-modal.page'; */

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(/* private modalCtrl: ModalController,
              private animationCtrl: AnimationController, */
              public navCtrl: NavController
              ) { }

  ngOnInit() {
  }

  //FUNCIONALIDAD POR VERIFICAR SI SIGUE O NO
  
/*   async registerUser() {
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
      component: RegisterUserModalPage,
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  } */

}
