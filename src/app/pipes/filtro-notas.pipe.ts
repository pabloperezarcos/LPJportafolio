import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroNotas'
})
export class FiltroNotasPipe implements PipeTransform {

  transform(notas: any[], terminoBusqueda: string): any[] {
    if (!notas || !terminoBusqueda) {
      return notas;
    }

    terminoBusqueda = terminoBusqueda.toLowerCase();

    return notas.filter(nota =>
      nota.titulo.toLowerCase().includes(terminoBusqueda)
    );
  }
}