import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  urlBase = "http://144.22.40.186:8000/api/asistencias/";

  constructor(
    private httpClient: HttpClient
  ) { }

  //----------------------------------------------------------------
  // GET: Obtener usuario de la base de datos
  //----------------------------------------------------------------
  
  getAsistencias() {
    return this.httpClient.get(this.urlBase);
  }

  //----------------------------------------------------------------
  // DEL: Borrar usuario de la base de datos
  //----------------------------------------------------------------

  deleteAsistencia(id: number) {
    const url = `${this.urlBase}${id}/`;
    return this.httpClient.delete(url);
  }

  //----------------------------------------------------------------
  // PUT: Actualizar usuario de la base de datos
  //----------------------------------------------------------------

  updateAsistencia(id: number, asistencia: any) {
    const url = `${this.urlBase}${id}/`;
    return this.httpClient.put(url, asistencia);
  }

  //----------------------------------------------------------------
  // POS: Crear usuario de la base de datos
  //----------------------------------------------------------------

  createAsistencia(asistencia: any) {
    return this.httpClient.post(this.urlBase, asistencia);
  }

  //----------------------------------------------------------------
  // FIN SERVICE
  //----------------------------------------------------------------
}
