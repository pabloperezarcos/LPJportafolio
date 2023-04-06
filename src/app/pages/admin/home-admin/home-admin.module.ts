import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeAdminPageRoutingModule } from './home-admin-routing.module';
import { HomeAdminPage } from './home-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomeAdminPageRoutingModule,
  ],
  declarations: [HomeAdminPage]
})
export class HomeAdminPageModule {}
