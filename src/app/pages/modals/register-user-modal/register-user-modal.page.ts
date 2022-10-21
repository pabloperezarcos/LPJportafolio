import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user-modal',
  templateUrl: './register-user-modal.page.html',
  styleUrls: ['./register-user-modal.page.scss'],
})
export class RegisterUserModalPage implements OnInit {

  formularioRegistro: FormGroup;
  inputOption: string;

  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public fb: FormBuilder
  ) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'inputOption': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'password2': new FormControl("", Validators.required)
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
      message: 'Datos correctos.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async guardarRegistro() {

    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      this.presentAlert();
    } else if (f.password == f.password2) {
      var usuario = {
        email: f.email,
        password: f.password,
        nombre: f.nombre,
        apellido: f.apellido,
        inputOption: f.inputOption
      }
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.successAlert();
      this.modalCtrl.dismiss();
    } else {
      this.presentAlert();
    }

  }

  salirMenuPrincipal() {

    this.modalCtrl.dismiss();

  }

}
