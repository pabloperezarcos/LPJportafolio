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
  fechavencimiento: string = '';
  empleado_idempleado: number = 0;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public notasService: NotasService,
    public platform: Platform
  ) { }

  ngOnInit() {
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
    this.fechavencimiento = '';
    this.empleado_idempleado = 0;
  }

  cerrar() {
    this.navCtrl.navigateBack(['../notas-recordatorio']);
  }

  //----------------------------------------------------------------
  // POS: Crear nota recordatorio en la base de datos
  //----------------------------------------------------------------

  crearNota() {
    if (!this.titulonota || !this.contenidonota || !this.fechacreacion || !this.fechavencimiento || !this.empleado_idempleado) {
      this.presentAlert();
      return;
    }

    const nota = {
      titulonota: this.titulonota,
      contenidonota: this.contenidonota,
      fechacreacion: this.fechacreacion,
      fechavencimiento: this.fechavencimiento,
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
          // Agrega aquí cualquier manejo de error adicional
        }
      );
  }


  /* FIN CREAR-NOTA.PAGE.TS */
}
