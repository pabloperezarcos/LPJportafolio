import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscanearQrModalPage } from './escanear-qr-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EscanearQrModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscanearQrModalPageRoutingModule {}
