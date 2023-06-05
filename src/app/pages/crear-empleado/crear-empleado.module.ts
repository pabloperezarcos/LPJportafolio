import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEmpleadoPageRoutingModule } from './crear-empleado-routing.module';

import { CrearEmpleadoPage } from './crear-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrearEmpleadoPageRoutingModule
  ],
  declarations: [CrearEmpleadoPage]
})
export class CrearEmpleadoPageModule {}
