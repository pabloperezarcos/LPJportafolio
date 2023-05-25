import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotasRecordatorioPage } from './notas-recordatorio.page';

const routes: Routes = [
  {
    path: '',
    component: NotasRecordatorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasRecordatorioPageRoutingModule {}
