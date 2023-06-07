import { Component, OnInit } from '@angular/core';
import { FeriadosService } from 'src/app/services/feriados.service';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.page.html',
  styleUrls: ['./feriados.page.scss'],
})
export class FeriadosPage implements OnInit {

  apiFeriados: any; // Almacena la lista de feriados obtenida desde el servicio

  constructor(
    private feriadosService: FeriadosService
  ) {
    this.listarFeriados();
  }

  ngOnInit() {
  }


  // Formatea una fecha en formato de fecha localizado.
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }


  // Obtiene y muestra los feriados llamando al servicio FeriadosService.
  // Ordena los feriados por fecha.
  listarFeriados() {
    this.feriadosService.obtenerListadoFeriados()
      .then(data => {
        this.apiFeriados = data.data;
        this.ordenarFeriadosPorFecha();
      })
      .catch(error => {
        console.error(error);
      });
  }


  // Ordena los feriados almacenados en apiFeriados por fecha en orden ascendente.
  ordenarFeriadosPorFecha() {
    this.apiFeriados.sort((a, b) => {
      const fechaA = new Date(a.date);
      const fechaB = new Date(b.date);
      return fechaA.getTime() - fechaB.getTime();
    });
  }
}
