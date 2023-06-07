import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RMensualPageRoutingModule } from './r-mensual-routing.module';

import { RMensualPage } from './r-mensual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RMensualPageRoutingModule
  ],
  declarations: [RMensualPage]
})
export class RMensualPageModule {}
