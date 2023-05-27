import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  logout() {
    // Aquí realizas la llamada al endpoint de tu API para cerrar la sesión
    this.http.post('http://144.22.40.186:8000/logout/', {}).subscribe(
      (response) => {
        // Manejas la respuesta del cierre de sesión exitoso, como eliminar tokens, limpiar datos de usuario, etc.
        // Por ejemplo, puedes eliminar el token de acceso guardado en el localStorage
        localStorage.removeItem('accessToken');
        // Rediriges a la página de inicio de sesión
        this.router.navigate(['/login']);
      },
      (error) => {
        // Manejas el error del cierre de sesión
        console.error(error);
      }
    );
  }
}