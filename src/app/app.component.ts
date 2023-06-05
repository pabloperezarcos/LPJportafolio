import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  tipoUsuario = "";

  constructor(
    private storage: Storage
  ) {}

  ngOnInit() {
    this.tipoUsuario = localStorage.getItem('tipoUsuario') ?? '';
  }

  salir() {
    // Lógica para cerrar sesión
  }
}
