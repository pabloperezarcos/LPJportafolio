import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  category_id: number = 0;
  alumnosbd: any = [];
  textoBuscar: string='';
  //selected_category_id: number = 0;

  constructor(
    public navCtrl: NavController,
    public alumnosService: AlumnosService,
    public platform: Platform,
    public alertController: AlertController
  ) {
    this.alumnosService.crearBaseDatos().then(() => {
      this.getAlumno();
    });
  }

  ngOnInit() {
  }

  busquedaChange(event){
    this.textoBuscar = event.detail.value;
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getAlumno();
      event.target.complete();
    }, 1500);
  }

  getAlumno() {
    this.alumnosService.getAlumno().then((data) => {
      this.alumnosbd = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.alumnosbd.push(data.rows.item(i));
        }
      }
    });
  }

  borrarAlumno(id: number) {
    this.alumnosService.borrarAlumno(id).then((data) => {
      alert(data);
      this.getAlumno();
    });
  }

  async alertaEliminar(id: number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea borrar este alumno?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Eliminar',
          handler: (data) => {
            this.borrarAlumno(id);
          }
        }
      ]
    });
    await alert.present();
  }

  crearAlumno() {
    this.navCtrl.navigateForward(['agregar-alumno/']);
  }

}
