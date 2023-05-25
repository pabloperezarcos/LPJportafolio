import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotasRecordatorioPageRoutingModule } from './notas-recordatorio-routing.module';

import { NotasRecordatorioPage } from './notas-recordatorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotasRecordatorioPageRoutingModule
  ],
  declarations: [NotasRecordatorioPage]
})
export class NotasRecordatorioPageModule {}
