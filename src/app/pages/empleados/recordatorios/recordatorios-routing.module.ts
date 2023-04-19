import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordatoriosPage } from './recordatorios.page';

const routes: Routes = [
  {
    path: '',
    component: RecordatoriosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordatoriosPageRoutingModule {}
