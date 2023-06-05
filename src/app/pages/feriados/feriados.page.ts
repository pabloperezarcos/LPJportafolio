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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  listarFeriados() {
    this.feriadosService.obtenerListadoFeriados()
      .then(data => {
        this.apiFeriados = data.data;
        this.ordenarFeriadosPorFecha(); // Llamada al método para ordenar los feriados por fecha
      },
        (error) => {
          console.error(error);
        });
  }

  ordenarFeriadosPorFecha() {
    this.apiFeriados.sort((a, b) => {
      const fechaA = new Date(a.date);
      const fechaB = new Date(b.date);
      return fechaA.getTime() - fechaB.getTime();
    });
  }


}
