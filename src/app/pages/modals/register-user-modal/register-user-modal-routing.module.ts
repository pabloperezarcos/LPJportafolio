import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterUserModalPage } from './register-user-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterUserModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterUserModalPageRoutingModule {}
