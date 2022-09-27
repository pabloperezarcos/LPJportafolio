import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscanearQrModalPageRoutingModule } from './escanear-qr-modal-routing.module';
import { EscanearQrModalPage } from './escanear-qr-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscanearQrModalPageRoutingModule
  ],
  declarations: [EscanearQrModalPage]
})
export class EscanearQrModalPageModule {}
