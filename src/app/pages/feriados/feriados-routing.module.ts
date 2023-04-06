import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeriadosPage } from './feriados.page';

const routes: Routes = [
  {
    path: '',
    component: FeriadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeriadosPageRoutingModule {}
