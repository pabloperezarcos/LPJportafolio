import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { NotasService } from 'src/app/services/notas.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notas-recordatorio',
  templateUrl: './notas-recordatorio.page.html',
  styleUrls: ['./notas-recordatorio.page.scss'],
})
export class NotasRecordatorioPage implements OnInit {

  notas: any[];
  textoBuscar: string = '';

  constructor(
    public navCtrl: NavController,
    public notasService: NotasService,
    public platform: Platform,
    public alertController: AlertController,
    private httpClient: HttpClient
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
  // GET: Obtener usuario de la base de datos
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
  // PUT: Actualizar usuario de la base de datos
  //----------------------------------------------------------------

  async putEmpleados(id: number) {
    let notaActualizada: any = {};

    // Obtener la nota existente
    this.notasService.getNotas().subscribe(
      (data: any) => {
        notaActualizada = data.find((nota: any) => nota.id === id);

        // Mostrar el AlertController con los campos de entrada
        this.mostrarAlertaEditar(notaActualizada);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //----------------------------------------------------------------
  // DEL: Borrar usuario de la base de datos
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

  async mostrarAlertaEditar(nota: any) {
    const alert = await this.alertController.create({
      header: 'Editar nota',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: nota.titulo, // Asigna el valor actual del título de la nota al campo de entrada
          placeholder: 'Título de la nota'
        },
        {
          name: 'contenido',
          type: 'textarea',
          value: nota.contenido, // Asigna el valor actual del contenido de la nota al campo de entrada
          placeholder: 'Contenido de la nota'
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
              contenido: data.contenido
            };

            this.notasService.putNotas(nota.id).subscribe(
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
