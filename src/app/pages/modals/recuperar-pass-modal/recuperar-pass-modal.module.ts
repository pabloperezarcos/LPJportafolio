import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarPassModalPageRoutingModule } from './recuperar-pass-modal-routing.module';

import { RecuperarPassModalPage } from './recuperar-pass-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarPassModalPageRoutingModule
  ],
  declarations: [RecuperarPassModalPage]
})
export class RecuperarPassModalPageModule {}
