import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RIndividualPageRoutingModule } from './r-individual-routing.module';

import { RIndividualPage } from './r-individual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RIndividualPageRoutingModule
  ],
  declarations: [RIndividualPage]
})
export class RIndividualPageModule {}
