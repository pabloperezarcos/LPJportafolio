import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  urlBase = "http://144.22.40.186:8000/api/";

  constructor(private httpClient: HttpClient) { }

  getAsistenciasPorEmpleado(empleadoId: string) {
    const url = `${this.urlBase}asistencias/?empleado=${empleadoId}`;
    console.log('URL:', url);
    return this.httpClient.get(url);
  }
  
  


}
