import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController, Platform, ModalController } from '@ionic/angular';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { AnimationController } from '@ionic/angular';
import { DetallesEmpleadosPage } from '../modals/detalles-empleados/detalles-empleados.page';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  empleados: any[];
  empleadosFiltrados: any[];
  textoBuscar: string = '';
  tipoUsuarioFiltrado: string = 'todos';
  estadoFiltrado: string = 'todos';

  constructor(
    public navCtrl: NavController,
    public empleadosService: EmpleadosService,
    public platform: Platform,
    public alertController: AlertController,
    private httpClient: HttpClient,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController
  ) {

  };

  ngOnInit() {
    this.getEmpleados();
  }

  ionViewWillEnter() {
    this.getEmpleados();
  }

  // Navegar a la página de creación de empleado
  crearEmpleado() {
    this.navCtrl.navigateForward(['/crear-empleado']);
  }

  //----------------------------------------------------------------
  // METODOS PARA FILTRAR LOS EMPLEADOS
  //----------------------------------------------------------------
  busquedaChange(event) {
    this.textoBuscar = event.detail.value;
    this.filtrarEmpleados();
  }

  filtrarPorTipoUsuario(tipo: string) {
    this.tipoUsuarioFiltrado = tipo;
    this.filtrarEmpleados();
  }

  filtrarPorEstado(estado: string) {
    this.estadoFiltrado = estado;
    this.filtrarEmpleados();
  }

  filtrarEmpleados() {
    this.empleadosFiltrados = this.empleados.filter((emp: any) => {
      if (this.tipoUsuarioFiltrado === 'todos' && this.estadoFiltrado === 'todos') {
        return true;
      }
      if (this.tipoUsuarioFiltrado !== 'todos' && this.estadoFiltrado !== 'todos') {
        return emp.tipo_usuario === this.tipoUsuarioFiltrado && emp.estado === this.estadoFiltrado;
      }
      if (this.tipoUsuarioFiltrado !== 'todos') {
        return emp.tipo_usuario === this.tipoUsuarioFiltrado;
      }
      if (this.estadoFiltrado !== 'todos') {
        return emp.estado === this.estadoFiltrado;
      }
    });
  }

  //----------------------------------------------------------------
  // GET: Obtener usuario de la base de datos
  //----------------------------------------------------------------
  getEmpleados() {
    this.empleadosService.getEmpleados().subscribe(
      (data: any) => {
        this.empleados = data;
        this.filtrarEmpleados();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //----------------------------------------------------------------
  // PUT: Actualizar usuario de la base de datos
  //----------------------------------------------------------------
  async putEmpleados(rut: string) {
    let empleadoActualizado: any = {};

    // Obtener el empleado existente
    this.empleadosService.getEmpleados().subscribe(
      (data: any) => {
        empleadoActualizado = data.find((empleado: any) => empleado.rut === rut);

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
  async delEmpleados(rut: string) {
    let empleadoEliminar: any = {};

    // Obtener el empleado existente
    this.empleadosService.getEmpleados().subscribe(
      (data: any) => {
        empleadoEliminar = data.find((empleado: any) => empleado.rut === rut);

        // Mostrar el AlertController para confirmar la eliminación
        this.mostrarAlertaEliminar(empleadoEliminar);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //----------------------------------------------------------------
  // ALERT CONTROLLER PARA EDITAR
  //----------------------------------------------------------------
  async mostrarAlertaEditar(emp: any) {
    const alert = await this.alertController.create({
      header: 'Editar empleado',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: emp.nombre,
          attributes: {
            required: true
          },
        },
        {
          name: 'apellidoPaterno',
          type: 'text',
          value: emp.ap_paterno,
          placeholder: 'Nuevo apellido paterno',
          attributes: {
            required: true
          }
        },
        {
          name: 'apellidoMaterno',
          type: 'text',
          value: emp.ap_materno,
          placeholder: 'Nuevo apellido materno',
          attributes: {
            required: true
          }
        },
        {
          name: 'rut',
          type: 'text',
          value: emp.rut,
          placeholder: 'Nuevo RUT',
          attributes: {
            required: true
          }
        },
        {
          name: 'direccion',
          type: 'text',
          value: emp.direccion,
          placeholder: 'Nueva dirección',
          attributes: {
            required: true
          }
        },
        {
          name: 'tipoUsuario',
          type: 'text',
          value: emp.tipo_usuario,
          placeholder: 'Nuevo tipo de usuario',
          attributes: {
            required: true
          }
        },
        {
          name: 'estado',
          type: 'text',
          value: emp.estado,
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

            this.httpClient.get(`http://144.22.40.186:8000/api/empleados?rut=${emp.rut}`).subscribe(
              (response: any[]) => {
                console.log('RUT A BUSCAR EL ID: ' + emp.rut);
                console.log('Respuesta de la consulta GET: ', response);
                const empleado = response.find((empleado: any) => empleado.rut === emp.rut);
                if (empleado) {
                  const empleadoId = empleado.id;
                  console.log('ID ENCONTRADO SEGÚN RUT: ' + empleadoId);

                  // Construir la URL de actualizacion con el ID del empleado
                  const url = `http://144.22.40.186:8000/api/empleados/${empleadoId}/`;


                  // Realizar la solicitud PUT con los nuevos datos
                  this.httpClient.put(url, {
                    nombre: nuevoNombre,
                    ap_paterno: nuevoApellidoPaterno,
                    ap_materno: nuevoApellidoMaterno,
                    rut: nuevoRut,
                    direccion: nuevaDireccion,
                    tipo_usuario: nuevoTipoUsuario,
                    estado: nuevoEstado
                  }).subscribe(
                    () => {
                      this.getEmpleados();
                      console.log('Empleado actualizado con éxito');
                    },
                    error => {
                      console.error('Error al actualizar el empleado', error);
                    }
                  );
                } else {
                  console.error('No se encontró ningún empleado con el RUT proporcionado');
                }
              },
              error => {
                console.error('Error al consultar la base de datos', error);
              }
            ); //aqui
          }
        }
      ]
    });
    await alert.present();
  }

  //----------------------------------------------------------------
  // ALERT CONTROLLER PARA ELIMINAR
  //----------------------------------------------------------------
  async mostrarAlertaEliminar(emp: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar empleado',
      message: `¿Estás seguro de que deseas eliminar al empleado ${emp.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Consultar la base de datos para obtener el ID del empleado por su RUT
            this.httpClient.get(`http://144.22.40.186:8000/api/empleados?rut=${emp.rut}`).subscribe(
              (response: any[]) => {
                console.log('RUT A BUSCAR EL ID: ' + emp.rut);
                console.log('Respuesta de la consulta GET: ', response);
                const empleado = response.find((empleado: any) => empleado.rut === emp.rut);
                if (empleado) {
                  const empleadoId = empleado.id;
                  console.log('ID ENCONTRADO SEGÚN RUT: ' + empleadoId);

                  // Construir la URL de eliminación con el ID del empleado
                  const url = `http://144.22.40.186:8000/api/empleados/${empleadoId}/`;

                  // Realizar la solicitud DELETE para eliminar al empleado
                  this.httpClient.delete(url).subscribe(
                    () => {
                      this.getEmpleados();
                      console.log('Empleado eliminado con éxito');
                    },
                    error => {
                      console.error('Error al eliminar el empleado', error);
                    }
                  );
                } else {
                  console.error('No se encontró ningún empleado con el RUT proporcionado');
                }
              },
              error => {
                console.error('Error al consultar la base de datos', error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  //----------------------------------------------------------------
  // LOGICA PARA ABRIR MODAL Y MOSTRAR INFO DE EMPLEADO SELECCIONADO
  //----------------------------------------------------------------
  async mostrarInformacionEmpleado(empleado: any) {
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

    const modal = await this.modalCtrl.create({
      component: DetallesEmpleadosPage,
      componentProps: {
        empleado: empleado
      },
      enterAnimation,
      leaveAnimation
    });

    await modal.present();
  }

  /* FIN EMPLEADOS.PAGE.TS */
}
