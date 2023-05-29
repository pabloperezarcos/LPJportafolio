import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController, Platform, ModalController } from '@ionic/angular';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { DetallesEmpleadosPage } from '../../modals/detalles-empleados/detalles-empleados.page';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados: any[];
  textoBuscar: string = '';

  constructor(
    public navCtrl: NavController,
    public empleadosService: EmpleadosService,
    public platform: Platform,
    public alertController: AlertController,
    private httpClient: HttpClient,
    private modalController: ModalController
  ) {

  };

  ngOnInit() {
    this.getEmpleados();
  }

  ionViewWillEnter() {
    this.getEmpleados();
  }

  busquedaChange(event) {
    this.textoBuscar = event.detail.value;
  }

  crearEmpleado() {
    this.navCtrl.navigateForward(['/crear-empleado']);
  }

  //----------------------------------------------------------------
  // GET: Obtener usuario de la base de datos
  //----------------------------------------------------------------

  getEmpleados() {
    this.empleadosService.getEmpleados().subscribe(
      (data: any) => {
        this.empleados = data;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  //----------------------------------------------------------------
  // PUT: Actualizar usuario de la base de datos
  //----------------------------------------------------------------

  async putEmpleados(rutempleado: string) {
    let empleadoActualizado: any = {};

    // Obtener el empleado existente
    this.empleadosService.getEmpleados().subscribe(
      (data: any) => {
        empleadoActualizado = data.find((empleado: any) => empleado.rutempleado === rutempleado);

        // Mostrar el AlertController con los campos de entrada
        this.mostrarAlertaEditar(empleadoActualizado);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //----------------------------------------------------------------
  // DEL: Borrar usuario de la base de datos
  //----------------------------------------------------------------

  delEmpleados(rutempleado: string) {
    console.log(rutempleado);
    this.empleadosService.delEmpleados(rutempleado).subscribe(
      () => {
        console.log('Empleado eliminado');
        // Realiza cualquier acción adicional después de eliminar el empleado
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //----------------------------------------------------------------
  // SE CONFIGURAN LOS ALERT CONTROLLER PARA ACTUALIZAR Y ELIMINAR
  //----------------------------------------------------------------

  async mostrarAlertaEditar(emp: any) {
    console.log(emp);
    const alert = await this.alertController.create({
      header: 'Editar empleado',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: emp.nombreempleado,
          placeholder: 'Nuevo nombre',
          attributes: {
            required: true
          }
        },
        {
          name: 'apellidoPaterno',
          type: 'text',
          value: emp.ap_paternoempleado,
          placeholder: 'Nuevo apellido paterno',
          attributes: {
            required: true
          }
        },
        {
          name: 'apellidoMaterno',
          type: 'text',
          value: emp.ap_maternoempleado,
          placeholder: 'Nuevo apellido materno',
          attributes: {
            required: true
          }
        },
        {
          name: 'rut',
          type: 'text',
          value: emp.rutempleado,
          placeholder: 'Nuevo RUT',
          attributes: {
            required: true
          }
        },
        {
          name: 'direccion',
          type: 'text',
          value: emp.direccionempleado,
          placeholder: 'Nueva dirección',
          attributes: {
            required: true
          }
        },
        {
          name: 'tipoUsuario',
          type: 'text',
          value: emp.tipousuario,
          placeholder: 'Nuevo tipo de usuario',
          attributes: {
            required: true
          }
        },
        {
          name: 'estado',
          type: 'text',
          value: emp.estadoempleado,
          placeholder: 'Nuevo estado',
          attributes: {
            required: true
          }
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
            // Obtener los nuevos valores del formulario de la alerta
            const nuevoNombre = data.nombre;
            const nuevoApellidoPaterno = data.apellidoPaterno;
            const nuevoApellidoMaterno = data.apellidoMaterno;
            const nuevoRut = data.rut;
            const nuevaDireccion = data.direccion;
            const nuevoTipoUsuario = data.tipoUsuario;
            const nuevoEstado = data.estado;

            // Construir la URL de actualización con el id del empleado
            const url = `http://144.22.40.186:8000/api/empleados/${emp.rutempleado}/`;

            // Realizar la solicitud PUT con los nuevos datos
            this.httpClient.put(url, {
              nombreempleado: nuevoNombre,
              ap_paternoempleado: nuevoApellidoPaterno,
              ap_maternoempleado: nuevoApellidoMaterno,
              rutempleado: nuevoRut,
              direccionempleado: nuevaDireccion,
              tipousuario: nuevoTipoUsuario,
              estadoempleado: nuevoEstado
            }).subscribe(
              () => {
                this.getEmpleados();
                console.log('Empleado actualizado con éxito');
              },
              error => {
                console.error('Error al actualizar el empleado', error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarAlertaEliminar(rutempleado: string) {
    console.log(rutempleado);
    const alert = await this.alertController.create({
      header: 'Eliminar empleado',
      message: '¿Estás seguro de que quieres eliminar a este empleado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            const url = `http://144.22.40.186:8000/api/empleados/${rutempleado}/`;

            this.httpClient.delete(url)
              .subscribe(
                () => {
                  this.getEmpleados();
                  console.log('Empleado eliminado con éxito');
                },
                error => {
                  console.error('Error al eliminar el empleado', error);
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }

  //----------------------------------------------------------------
  // SE CREA UN MODAL PARA MOSTRAR LA INFO COMPLETA DEL EMPLEADO
  //----------------------------------------------------------------

  async mostrarInformacionEmpleado(empleado: any) {
    const modal = await this.modalController.create({
      component: DetallesEmpleadosPage,
      componentProps: {
        empleado: empleado
      }
    });
  
    await modal.present();
  }


  /* FIN EMPLEADOS.PAGE.TS */
}
