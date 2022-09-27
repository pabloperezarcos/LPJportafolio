import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarPassModalPage } from './recuperar-pass-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarPassModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarPassModalPageRoutingModule {}
