import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RAusenciasPageRoutingModule } from './r-ausencias-routing.module';

import { RAusenciasPage } from './r-ausencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RAusenciasPageRoutingModule
  ],
  declarations: [RAusenciasPage]
})
export class RAusenciasPageModule {}
