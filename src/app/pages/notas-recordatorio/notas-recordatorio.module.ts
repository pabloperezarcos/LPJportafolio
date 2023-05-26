import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotasRecordatorioPageRoutingModule } from './notas-recordatorio-routing.module';

import { NotasRecordatorioPage } from './notas-recordatorio.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PipesModule,
    HttpClientModule,
    NotasRecordatorioPageRoutingModule
  ],
  declarations: [NotasRecordatorioPage]
})
export class NotasRecordatorioPageModule {}
