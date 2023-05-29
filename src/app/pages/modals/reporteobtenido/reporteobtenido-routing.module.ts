import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteobtenidoPage } from './reporteobtenido.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteobtenidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteobtenidoPageRoutingModule {}
