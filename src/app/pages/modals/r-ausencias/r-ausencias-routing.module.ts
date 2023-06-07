import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RAusenciasPage } from './r-ausencias.page';

const routes: Routes = [
  {
    path: '',
    component: RAusenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RAusenciasPageRoutingModule {}
