import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterUserModalPageRoutingModule } from './register-user-modal-routing.module';

import { RegisterUserModalPage } from './register-user-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterUserModalPageRoutingModule
  ],
  declarations: [RegisterUserModalPage]
})
export class RegisterUserModalPageModule {}
