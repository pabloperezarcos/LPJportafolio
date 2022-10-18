import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { RegistroClaseModalPage } from '../modals/registro-clase-modal/registro-clase-modal.page';
import { FeriadosModalPage } from '../modals/feriados-modal/feriados-modal.page';
import { parseISO } from 'date-fns';
import format from 'date-fns/format';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {

  usuario = JSON.parse(localStorage.getItem("usuario"));
  myDate: string;
  nuevaFecha: string;
  inputOption: string;

  constructor(private modalCtr: ModalController,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  };

  change() {
    const formattedString = format(parseISO(this.myDate), 'dd-MM-yyyy; HH:mm');
    this.myDate = formattedString;
    this.nuevaFecha = this.myDate;
    console.log(formattedString);
    console.log(this.inputOption);
  }

  async iniciarRegistro() {
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
      component: RegistroClaseModalPage,
      componentProps: {
        'nuevaFecha': this.nuevaFecha,
        'inputOption': this.inputOption
      },
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  }

  async consultarFeriados() {
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
      component: FeriadosModalPage,
      componentProps: {},
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  }




}
