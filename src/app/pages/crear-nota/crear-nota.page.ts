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
  empleadoId: string;

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

  // Muestra una alerta de error genérica
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

  // Muestra una alerta de éxito al crear la nota
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

  // Resetea el formulario
  resetForm() {
    this.titulo = '';
    this.contenido = '';
  }

  // Cierra la ventana actual y regresa a la página de notas
  cerrar() {
    this.navCtrl.navigateBack(['../notas']);
  }

  //----------------------------------------------------------------
  // POS: Crear nota recordatorio en la base de datos
  //----------------------------------------------------------------

  crearNota() {
    if (this.titulo && this.contenido) {
      // Obtener el ID del empleado del localStorage
      this.storage.get('id').then((empleadoId) => {
        const nota = {
          titulo: this.titulo,
          contenido: this.contenido,
          empleado: empleadoId
        };

        this.notasService.posNotas(nota).subscribe(
          () => {
            this.resetForm();
            this.successAlert();
            this.navCtrl.navigateBack(['../notas']);
          },
          error => {
            console.error(error);
            this.presentAlert();
          }
        );
      });
    } else {
      this.presentAlert();
    }
  }



  /* FIN CREAR-NOTA.PAGE.TS */
}