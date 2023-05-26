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



  //----------------------------------------------------------------
  // PUT: Editar usuario de la base de datos
  //----------------------------------------------------------------



  //----------------------------------------------------------------
  // POS: Editar usuario de la base de datos
  //----------------------------------------------------------------







}