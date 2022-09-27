import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroClaseModalPageRoutingModule } from './registro-clase-modal-routing.module';
import { RegistroClaseModalPage } from './registro-clase-modal.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroClaseModalPageRoutingModule,
    QRCodeModule
  ],
  declarations: [RegistroClaseModalPage]
})
export class RegistroClaseModalPageModule {}
