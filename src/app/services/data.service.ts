import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMenuOpts(){
    //Esto va a retornar un arreglo de Componente.
    return this.http.get<Componente[]>('/assets/data/menu-opts.json');
  }


}
