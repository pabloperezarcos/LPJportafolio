import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.page.html',
  styleUrls: ['./crear-nota.page.scss'],
})
export class CrearNotaPage implements OnInit {

  titulonota: string = '';
  contenidonota: string = '';
  fechacreacion: string = '';
 /*  fechavencimiento: Date = null;
  empleado_idempleado: number = 23; */

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public notasService: NotasService,
    public platform: Platform
  ) {
    this.obtenerFechaActual();
  }

  ngOnInit() {
    this.setFechaCreacion();
  }

  obtenerFechaActual() {
    const fechaActual = new Date();
    this.fechacreacion = fechaActual.toISOString();
  }

  setFechaCreacion() {
    const currentDate = new Date();
    this.fechacreacion = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Ups...',
      subHeader: 'Datos incorrectos.',
      message: 'Por favor, verifica que los datos sean correctos.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async successAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Éxito al crear',
      subHeader: '',
      message: 'Nota creada correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  resetForm() {
    this.titulonota = '';
    this.contenidonota = '';
    this.fechacreacion = '';
/*     this.fechavencimiento = null;
    this.empleado_idempleado = 0; */
  }

  cerrar() {
    this.navCtrl.navigateBack(['../notas-recordatorio']);
  }

  //----------------------------------------------------------------
  // POS: Crear nota recordatorio en la base de datos
  //----------------------------------------------------------------

  crearNota() {
/* 
    const fechaVencimiento = new Date(this.fechavencimiento);
    const nota = {
      titulonota: this.titulonota,
      contenidonota: this.contenidonota,
      fechacreacion: this.fechacreacion,
      fechavencimiento: fechaVencimiento.toISOString().split('T')[0], // Formato YYYY-MM-DD
      empleado_idempleado: this.empleado_idempleado
    };

    this.notasService.posNotas(nota)
      .subscribe(
        () => {
          console.log('Nota creada exitosamente');
          this.successAlert();
          this.resetForm();
        },
        error => {
          console.error('Error al crear la nota', error);
        }
      ); */
  }


  /* FIN CREAR-NOTA.PAGE.TS */
}