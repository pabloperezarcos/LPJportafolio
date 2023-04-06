import { Component, OnInit } from '@angular/core';
import { FeriadosService } from 'src/app/services/feriados.service';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.page.html',
  styleUrls: ['./feriados.page.scss'],
})
export class FeriadosPage implements OnInit {

  apiFeriados: any;

  constructor(
    private feriadosService: FeriadosService
  ) {
    this.listarFeriados();
  }

  ngOnInit() {
  }

  listarFeriados() {
    this.feriadosService.obtenerListadoFeriados()
      .then(data => {
        //console.log(data['data'])
        this.apiFeriados = data.data;
      },
        (error) => {
          console.error(error)
        });
  }

}
