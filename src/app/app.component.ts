import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isAdmin: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.checkUserRole();
  }

  checkUserRole() {
    const usuarioActual = this.authService.getUsuario();

    if (usuarioActual && usuarioActual.tipoempleado === 'administrador') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  salir() {
    // Lógica para cerrar sesión
  }


  /* FIN APP.COMPONENT.TS */
}

