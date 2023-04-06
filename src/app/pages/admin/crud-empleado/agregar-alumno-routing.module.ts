import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAlumnoPage } from './agregar-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAlumnoPageRoutingModule {}
