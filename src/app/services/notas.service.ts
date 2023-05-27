import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class NotasService {

private urlBase = "http://144.22.40.186:8000/api/notas/";

  constructor(private httpClient: HttpClient) { }

 //----------------------------------------------------------------
  // GET: Obtener nota recordatorio de la base de datos
  //----------------------------------------------------------------

  getNotas() {
    return this.httpClient.get(this.urlBase);
  }

  //----------------------------------------------------------------
  // DEL: Borrar nota recordatorio de la base de datos
  //----------------------------------------------------------------

  delNotas(id: number) {
    const url = `${this.urlBase}${id}/`;
    return this.httpClient.delete(url);
  }

  //----------------------------------------------------------------
  // PUT: Actualizar nota recordatorio de la base de datos
  //----------------------------------------------------------------

  putNotas(id: number) {
    const url = `${this.urlBase}${id}/`;
    return this.httpClient.put(url, {});
  }
  

  //----------------------------------------------------------------
  // POS: Crear nota recordatorio de la base de datos
  //----------------------------------------------------------------

  posNotas(nota: any) {
    return this.httpClient.post(this.urlBase, nota);
  }

  //----------------------------------------------------------------
  // FIN SERVICE
  //----------------------------------------------------------------
}