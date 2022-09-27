import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { EscanearQrModalPage } from '../modals/escanear-qr-modal/escanear-qr-modal.page';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit {

  usuario = JSON.parse(localStorage.getItem("usuario"));

  constructor(private modalCtr: ModalController,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {

  }

  async escanearQR() {
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

    const modal = await this.modalCtr.create({
      component: EscanearQrModalPage,
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  }

}
