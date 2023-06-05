import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { NotasService } from 'src/app/services/notas.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.page.html',
  styleUrls: ['./crear-nota.page.scss'],
})
export class CrearNotaPage implements OnInit {

  titulo: string = '';
  contenido: string = '';

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public notasService: NotasService,
    public platform: Platform,
    private storage: Storage
  ) {
  }

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
    this.titulo = '';
    this.contenido = '';
  }

  cerrar() {
    this.navCtrl.navigateBack(['../notas']);
  }

  //----------------------------------------------------------------
  // POS: Crear nota recordatorio en la base de datos
  //----------------------------------------------------------------

  crearNota() {
    this.storage.get('rut').then((rut) => {
      const nota = {
        titulo: this.titulo,
        contenido: this.contenido,
        empleados_rut: rut
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
        );
    });
  }
  



  /* FIN CREAR-NOTA.PAGE.TS */
}