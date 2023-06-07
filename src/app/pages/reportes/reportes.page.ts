import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AnimationController, ModalController } from '@ionic/angular';
import { RMensualPage } from '../modals/r-mensual/r-mensual.page';
import { RIndividualPage } from '../modals/r-individual/r-individual.page';
import { RAtrasosPage } from '../modals/r-atrasos/r-atrasos.page';
import { RAusenciasPage } from '../modals/r-ausencias/r-ausencias.page';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  report: any;
  employees: any[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private animationCtrl: AnimationController,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {

  }

  async seleccionarReporte() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Mensual',
          icon: 'document-text-outline',
          handler: () => {
            this.mostrarRmensual();
          }
        },
        {
          text: 'Individual',
          icon: 'document-text-outline',
          handler: () => {
            this.mostrarRindividual();
          }
        },
        {
          text: 'Atrasos',
          icon: 'document-text-outline',
          handler: () => {
            this.mostrarRatrasos();
          }
        },
        {
          text: 'Ausencias',
          icon: 'document-text-outline',
          handler: () => {
            this.mostrarRausencias();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar Action Sheet');
          }
        },
      ],
    });

    await actionSheet.present();
  }


  async mostrarRmensual() {
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
      component: RMensualPage,
      componentProps: {
      },
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  }

  async mostrarRindividual() {
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
      component: RIndividualPage,
      componentProps: {
      },
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  }


  async mostrarRausencias() {
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
      component: RAusenciasPage,
      componentProps: {
      },
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  }


  async mostrarRatrasos() {
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
      component: RAtrasosPage,
      componentProps: {
      },
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  }


  /* FIN REPORTES.PAGE.TS */
}