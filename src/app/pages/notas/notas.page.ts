import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { NotasService } from 'src/app/services/notas.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  notas: any[];
  textoBuscar: string = '';

  constructor(
    public navCtrl: NavController,
    public notasService: NotasService,
    public platform: Platform,
    public alertController: AlertController,
    private httpClient: HttpClient,
    private storage: Storage
  ) {

  };

  ngOnInit() {
    this.getNotas();
  }

  ionViewWillEnter() {
    this.getNotas();
  }

  busquedaChange(event) {
    this.textoBuscar = event.detail.value;
  }

  crearNota() {
    this.navCtrl.navigateForward(['/crear-nota']);
  }

  //----------------------------------------------------------------
  // GET: Obtener nota de la base de datos
  //----------------------------------------------------------------

  getNotas() {
    this.notasService.getNotas().subscribe(
      (data: any) => {
        this.notas = data;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  //----------------------------------------------------------------
  // PUT: Actualizar nota de la base de datos
  //----------------------------------------------------------------

  async putEmpleados(id: number) {
    let notaActualizada: any = {};

    // Obtener la nota existente
    this.notasService.getNotas().subscribe(
      (data: any) => {
        notaActualizada = data.find((nota: any) => nota.id === id);

        // Obtener el rut del storage
        this.storage.get('rut').then((rut) => {
          // Mostrar el AlertController con los campos de entrada
          this.mostrarAlertaEditar(notaActualizada, rut);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //----------------------------------------------------------------
  // DEL: Borrar nota de la base de datos
  //----------------------------------------------------------------

  delNotas(id: number) {
    this.notasService.delNotas(id).subscribe(
      () => {
        console.log('Nota eliminada');
        // Realiza cualquier acción adicional después de eliminar la nota
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //----------------------------------------------------------------
  // SE CONFIGURAN LOS ALERT CONTROLLER PARA ACTUALIZAR 
  //----------------------------------------------------------------

  async mostrarAlertaEditar(nota: any, rut: string) {
    const alert = await this.alertController.create({
      header: 'Editar nota',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: nota.titulo,
          placeholder: 'Título de la nota'
        },
        {
          name: 'contenido',
          type: 'textarea',
          value: nota.contenido,
          placeholder: 'Contenido de la nota'
        },
        {
          name: 'rut',
          type: 'text',
          value: rut
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const notaActualizada = {
              id: nota.id,
              titulo: data.titulo,
              contenido: data.contenido,
              empleados_rut: rut
            };
            this.notasService.putNotas(notaActualizada.id, notaActualizada).subscribe(
              () => {
                console.log('Nota actualizada con éxito');
                this.getNotas();
              },
              (error) => {
                console.error('Error al actualizar la nota', error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarAlertaEliminar(idNota: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar nota',
      message: '¿Estás seguro de que quieres eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            const url = `http://144.22.40.186:8000/api/notas/${idNota}/`;

            this.httpClient.delete(url)
              .subscribe(
                () => {
                  this.getNotas();
                  console.log('Nota eliminada con éxito');
                },
                error => {
                  console.error('Error al eliminar la nota', error);
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }


  /* FIN NOTAS-RECORDATORIO.PAGE.TS */
}
