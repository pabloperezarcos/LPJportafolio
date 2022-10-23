import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeriadosService {

  urlBase = "https://api.victorsanmartin.com/feriados/en.json";
  //urlBase = "https://www.feriadosapp.com/api/holidays-2019.json";

  constructor(private httpClient: HttpClient) { }

  //GET
  obtenerListadoFeriados(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.urlBase)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  };


}
