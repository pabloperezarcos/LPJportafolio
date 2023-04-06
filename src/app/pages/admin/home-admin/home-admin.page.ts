import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { RegistroClaseModalPage } from '../../modals/registro-clase-modal/registro-clase-modal.page';
import { format, parseISO } from 'date-fns';
import { AsignaturasService } from 'src/app/services/asignaturas.service';



@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  usuario = JSON.parse(localStorage.getItem("usuario"));
  myDate: string;
  nuevaFecha: string;
  inputOption: string;
  bd_asignatura: any = [];

  constructor(private modalCtr: ModalController,
    private animationCtrl: AnimationController,
    public asignaturaService: AsignaturasService
  ) {
    this.asignaturaService.crearBaseDatos().then(() => {
      this.getAsignatura();
    });
  }
  //asdddasdasdasd
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.asignaturaService.crearBaseDatos().then(() => {
      this.getAsignatura();
    });
  }

  getAsignatura() {
    this.asignaturaService.getAsignatura().then((data) => {
      this.bd_asignatura = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.bd_asignatura.push(data.rows.item(i));
        }
      }
    });
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0;
  };

  change() {
    const dateFromIonDatetime = this.myDate;
    const formattedString = format(parseISO(dateFromIonDatetime), 'dd-MM-yyyy - HH:mm');
    this.nuevaFecha = formattedString;
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

}
