import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EmpleadosService {

  private apiEmp = 'http://144.22.40.186:8000/api/empleados';
  //private apiEmp = 'http://144.22.40.186:8000/api/?format=api';

  constructor(private httpClient: HttpClient) { }

  //----------------------------------------------------------------
  // Obtener usuario de la base de datos
  //----------------------------------------------------------------

  getEmpleados(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.apiEmp)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  };

  getDatos() {
    return this.httpClient.get(this.apiEmp);
  }

  //----------------------------------------------------------------
  // Borrar usuario de la base de datos
  //----------------------------------------------------------------

  eliminarEmpleado(id: number): Observable<any> {
    const url = `${this.apiEmp}/${id}`;
    return this.httpClient.delete(url);
  }

  //----------------------------------------------------------------
  // Editar usuario de la base de datos
  //----------------------------------------------------------------

  actualizarEmpleado(id: number, empleado: any): Observable<any> {
    const url = `${this.apiEmp}/${id}`;
    return this.httpClient.put(url, empleado);
  }

}