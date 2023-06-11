import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RAtrasosPageRoutingModule } from './r-atrasos-routing.module';

import { RAtrasosPage } from './r-atrasos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RAtrasosPageRoutingModule
  ],
  declarations: [
    RAtrasosPage
  ],
  providers: [

  ],
})
export class RAtrasosPageModule { }
