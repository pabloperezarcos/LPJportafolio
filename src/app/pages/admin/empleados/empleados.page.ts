import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleadosbd: any = [];
  textoBuscar: string = '';

  nombre: string = "";
  apellidoPaterno: string = "";
  apellidoMaterno: string = "";
  id: number = 0;

  constructor(
    public navCtrl: NavController,
    public empleadosService: EmpleadosService,
    public platform: Platform,
    public alertController: AlertController
  ) { };


  ngOnInit() {
  }

  /*   ionViewWillEnter() {
      this.empleadosService.crearBaseDatos().then(() => {
        this.getEmpleados();
      });
    } */

  /*   busquedaChange(event) {
      this.textoBuscar = event.detail.value;
    } */

  /*   doRefresh(event) {
      setTimeout(() => {
        this.getEmpleados();
        event.target.complete();
      }, 1500);
    } */




  crearEmpleado() {
    this.navCtrl.navigateForward(['/crear-empleado']);
  }

}
