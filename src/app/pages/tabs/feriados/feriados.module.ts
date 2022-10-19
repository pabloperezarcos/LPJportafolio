import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeriadosPageRoutingModule } from './feriados-routing.module';

import { FeriadosPage } from './feriados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeriadosPageRoutingModule
  ],
  declarations: [FeriadosPage]
})
export class FeriadosPageModule {}
