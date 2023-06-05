import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EmpleadosService {

  urlBase = "http://144.22.40.186:8000/api/empleados/";

  constructor(
    private httpClient: HttpClient
  ) { }

  //----------------------------------------------------------------
  // GET: Obtener usuario de la base de datos
  //----------------------------------------------------------------

  getEmpleados() {
    return this.httpClient.get(this.urlBase);
  }

  //----------------------------------------------------------------
  // DEL: Borrar usuario de la base de datos
  //----------------------------------------------------------------

  delEmpleados(rut: string) {
    const url = `${this.urlBase}${rut}/`;
    return this.httpClient.delete(url);
  }

  //----------------------------------------------------------------
  // PUT: Actualizar usuario de la base de datos
  //----------------------------------------------------------------

  putEmpleados(rut: string, empleado: any) {
    const url = `${this.urlBase}${rut}/`;
    return this.httpClient.put(url, empleado);
  }

  //----------------------------------------------------------------
  // POS: Crear usuario de la base de datos
  //----------------------------------------------------------------

  posEmpleados(empleado: any) {
    return this.httpClient.post(this.urlBase, empleado);
  }

  //----------------------------------------------------------------
  // FIN SERVICE
  //----------------------------------------------------------------
}