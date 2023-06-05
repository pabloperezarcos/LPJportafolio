import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  
  urlBase = "http://144.22.40.186:8000/api/";

  constructor(private httpClient: HttpClient) { }

  getAsistenciasPorEmpleadoYFechas(empleadoId: number, fechaInicio: string, fechaFin: string) {
    const url = `${this.urlBase}asistencias/`;
    let params = new HttpParams();
    params = params.set('empleado', empleadoId.toString());
    params = params.set('fecha_registro__gte', fechaInicio);
    params = params.set('fecha_registro__lte', fechaFin);

    return this.httpClient.get(url, { params: params });
  }
}
