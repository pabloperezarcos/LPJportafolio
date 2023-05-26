import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearNotaPageRoutingModule } from './crear-nota-routing.module';

import { CrearNotaPage } from './crear-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearNotaPageRoutingModule
  ],
  declarations: [CrearNotaPage]
})
export class CrearNotaPageModule {}
