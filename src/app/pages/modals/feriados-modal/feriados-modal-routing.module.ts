import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeriadosModalPage } from './feriados-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FeriadosModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeriadosModalPageRoutingModule {}
