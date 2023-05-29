import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { ReporteobtenidoPage } from '../../modals/reporteobtenido/reporteobtenido.page';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  
  empleadoSeleccionado: number;
  fechaSeleccionada: string;
  report: any;

  constructor(
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,

  ) { }

  ngOnInit() {
  }

  async obtenerReporte() {
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
      component: ReporteobtenidoPage,
      componentProps: {
        selectedEmployee: this.empleadoSeleccionado,
        selectedDate: this.fechaSeleccionada
      },
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation
    });


    await modal.present();
  }

}
