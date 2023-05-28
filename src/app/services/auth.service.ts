/* 
Este Service almacena los datos del usuario logueado
para luego enviarlos al AppComponent y asi poder
identificar el tipo de menú lateral a mostrar
*/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usuarioActual: any;

  constructor() { }

  setUsuario(usuario: any) {
    this.usuarioActual = usuario;
  }

  getUsuario() {
    return this.usuarioActual;
  }
}
