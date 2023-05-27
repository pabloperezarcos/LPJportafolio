import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesEmpleadosPage } from './detalles-empleados.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesEmpleadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesEmpleadosPageRoutingModule {}
