import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearNotaPage } from './crear-nota.page';

const routes: Routes = [
  {
    path: '',
    component: CrearNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearNotaPageRoutingModule {}
