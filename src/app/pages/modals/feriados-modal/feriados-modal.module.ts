import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeriadosModalPageRoutingModule } from './feriados-modal-routing.module';

import { FeriadosModalPage } from './feriados-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeriadosModalPageRoutingModule
  ],
  declarations: [FeriadosModalPage]
})
export class FeriadosModalPageModule {}
