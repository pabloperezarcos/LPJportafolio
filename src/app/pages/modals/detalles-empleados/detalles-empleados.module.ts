import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesEmpleadosPageRoutingModule } from './detalles-empleados-routing.module';

import { DetallesEmpleadosPage } from './detalles-empleados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesEmpleadosPageRoutingModule
  ],
  declarations: [DetallesEmpleadosPage]
})
export class DetallesEmpleadosPageModule {}
