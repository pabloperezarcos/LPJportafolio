import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.page.html',
  styleUrls: ['./agregar-alumno.page.scss'],
})
export class AgregarAlumnoPage implements OnInit {

  formularioRegistro: FormGroup;

  nombre: string = "";
  apellidoPaterno: string = "";
  apellidoMaterno: string = "";

  alumnosbd: any = [];
/*   editMode: boolean = false;
  editId: number = 0; */

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public alumnosService: AlumnosService,
    public platform: Platform,
    public fb: FormBuilder
  ) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellidoPaterno': new FormControl("", Validators.required),
      'apellidoMaterno': new FormControl("", Validators.required)
    });
    this.alumnosService.crearBaseDatos().then(() => {
      this.getAlumno();
    });
  }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Ups...',
      subHeader: 'Datos incorrectos.',
      message: 'Por favor, verifique que los datos coincidan con lo solicitado.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async successAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Éxito al guardar',
      subHeader: '',
      message: 'Alumno creado.',
      buttons: ['OK']
    });

    await alert.present();
  }

  crearAlumno() {
    this.alumnosService.addTest(this.nombre, this.apellidoPaterno, this.apellidoMaterno).then((data) => {
      this.nombre = "";
      this.apellidoPaterno = "";
      this.apellidoMaterno = "";
      alert(data);
      this.getAlumno();
    });
  }

  getAlumno() {
    this.alumnosService.getAlumno().then((data) => {
      this.alumnosbd = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.alumnosbd.push(data.rows.item(i));
        }
      }
    });
  }

/*   editTest(category: any) {
    this.editMode = true;
    this.nombre = category.nombre;
    this.apellidoPaterno = category.apellidoPaterno;
    this.apellidoMaterno = category.apellidoMaterno;
    this.editId = category.id;
  } */

  cancelar() {
    this.navCtrl.navigateForward(['home-docente/alumnos']);
  }

}
