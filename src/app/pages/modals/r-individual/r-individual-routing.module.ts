import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RIndividualPage } from './r-individual.page';

const routes: Routes = [
  {
    path: '',
    component: RIndividualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RIndividualPageRoutingModule {}
