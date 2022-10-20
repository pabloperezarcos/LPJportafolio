import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  category_id: number = 0;
  alumnosbd: any = [];

  selected_category_id: number = 0;

  constructor(
    public navCtrl: NavController,
    public alumnosService: AlumnosService,
    public platform: Platform
  ) {
    this.alumnosService.crearBaseDatos().then(() => {
      this.getTest();
    });
  }

  ngOnInit() {
  }

  getTest() {
    this.alumnosService.getTest().then((data) => {
      this.alumnosbd = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.alumnosbd.push(data.rows.item(i));
        }
      }
    });
  }

  crearAlumno() {
    this.navCtrl.navigateForward(['agregar-alumno/']);
  }

}
