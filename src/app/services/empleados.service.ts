import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EmpleadosService {

  private urlBase = "http://144.22.40.186:8000/api/empleados/";

  constructor(private httpClient: HttpClient) { }

  //----------------------------------------------------------------
  // GET: Obtener usuario de la base de datos
  //----------------------------------------------------------------

  getEmpleados() {
    return this.httpClient.get(this.urlBase);
  }

  //----------------------------------------------------------------
  // DEL: Borrar usuario de la base de datos
  //----------------------------------------------------------------

  /*   eliminarEmpleado(id: number): Observable<any> {
      const url = `${this.apiEmp}/${id}`;
      return this.httpClient.delete(url);
    } */

  //----------------------------------------------------------------
  // PUT: Editar usuario de la base de datos
  //----------------------------------------------------------------

  /*   actualizarEmpleado(id: number, empleado: any): Observable<any> {
      const url = `${this.apiEmp}/${id}`;
      return this.httpClient.put(url, empleado);
    } */

  //----------------------------------------------------------------
  // PUT: Editar usuario de la base de datos
  //----------------------------------------------------------------






  
}