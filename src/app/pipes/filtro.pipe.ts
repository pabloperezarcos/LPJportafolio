import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  item = "";

  transform(arreglo: any[], texto: string = ''): any[] {

    if (texto === '') {
      return arreglo;
    }

    if (!arreglo) {
      return arreglo;
    }

    texto = texto.toLocaleLowerCase();

    console.log(arreglo);
    console.log(texto);

    return arreglo.filter(item => {
      if (item.nombreempleado && typeof item.nombreempleado === 'string') {
        return item.nombreempleado.toLocaleLowerCase().includes(texto);
      }
      return false;
    });
  }

}
