import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RMensualPage } from './r-mensual.page';

const routes: Routes = [
  {
    path: '',
    component: RMensualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RMensualPageRoutingModule {}
