import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoaprobadoPageRoutingModule } from './noaprobado-routing.module';

import { NoaprobadoPage } from './noaprobado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoaprobadoPageRoutingModule
  ],
  declarations: [NoaprobadoPage]
})
export class NoaprobadoPageModule {}
