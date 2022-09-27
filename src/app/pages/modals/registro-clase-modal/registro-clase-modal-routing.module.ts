import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroClaseModalPage } from './registro-clase-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroClaseModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroClaseModalPageRoutingModule {}
