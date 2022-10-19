import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  formularioRegistro: FormGroup;

  nombre: string = "";
  apellido: string = "";
  correo: string = "";
  password: string = "";

  categories: any = [];
  editMode: boolean = false;
  editId: number = 0;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public alumnosService: AlumnosService,
    public platform: Platform,
    public fb: FormBuilder
  ) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'password2': new FormControl("", Validators.required)
    });
    this.alumnosService.crearBaseDatos().then(() => {
      this.getTest();
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

  registrarUsuario() {

    this.alumnosService.addTest(this.nombre, this.apellido, this.correo, this.password).then((data) => {
      this.nombre = "";
      this.apellido = "";
      this.correo = "";
      this.password = "";
      alert(data);
      this.getTest();
    });
  }

  getTest() {
    this.alumnosService.getTest().then((data) => {
      this.categories = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.categories.push(data.rows.item(i));
        }
      }
    });
  }

  deleteTest(id: number) {
    this.alumnosService.deleteTest(id).then((data) => {
      alert(data);
      this.getTest();
    });
  }

  editTest(category: any) {
    this.editMode = true;
    this.nombre = category.nombre;
    this.apellido = category.apellido;
    this.editId = category.id;
  }

  goToLogin() {
    this.navCtrl.navigateForward(['login/']);
  }

}
