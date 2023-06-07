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

  notas: any[] = [];
  titulo: string = '';
  contenido: string = '';
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

  // Actualiza el valor de la variable 'textoBuscar' al cambiar el contenido del campo de búsqueda
/*   busquedaChange(event) {
    this.textoBuscar = event.detail.value;
  } */

  // Navega hacia la página de crear una nueva nota
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
  putEmpleados(id: number) {
    let notaActualizada: any = {};

    this.notasService.getNotas().subscribe(
      (data: any) => {
        notaActualizada = data.find((nota: any) => nota.id === id);

        this.storage.get('id').then((empleadoId) => {
          this.mostrarAlertaEditar(notaActualizada, empleadoId);
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
  async mostrarAlertaEditar(nota: any, empleadoIdParam: any) {

    const alert = await this.alertController.create({
      header: 'Editar nota',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: nota.titulo,
          placeholder: 'Título de la nota',
        },
        {
          name: 'contenido',
          type: 'textarea',
          value: nota.contenido,
          placeholder: 'Contenido de la nota',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            this.storage.get('id').then((empleadoId) => {
              console.log('Valor del empleado almacenado:', empleadoId);

              const notaActualizada = {
                id: nota.id,
                titulo: data.titulo,
                contenido: data.contenido,
                empleado: empleadoId,
              };
              console.log('Nota actualizada:', notaActualizada);

              this.notasService.putNotas(notaActualizada.id, notaActualizada).subscribe(
                () => {
                  console.log('Nota actualizada con éxito');
                  this.getNotas();
                },
                (error) => {
                  console.error('Error al actualizar la nota', error);
                }
              );
            });
          },
        },
      ],
    });

    await alert.present();
  }


  //----------------------------------------------------------------
  // SE CONFIGURAN LOS ALERT CONTROLLER PARA ELIMINAR
  //----------------------------------------------------------------
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
