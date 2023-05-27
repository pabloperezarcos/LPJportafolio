import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeEmpleadoPageRoutingModule } from './home-empleado-routing.module';
import { HomeEmpleadoPage } from './home-empleado.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeEmpleadoPageRoutingModule
  ],
  declarations: [HomeEmpleadoPage]
})
export class HomeEmpleadoPageModule {}
