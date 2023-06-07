import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RAtrasosPage } from './r-atrasos.page';

const routes: Routes = [
  {
    path: '',
    component: RAtrasosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RAtrasosPageRoutingModule {}
