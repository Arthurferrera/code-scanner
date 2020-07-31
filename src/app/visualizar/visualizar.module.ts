import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarPageRoutingModule } from './visualizar-routing.module';

import { VisualizarPage } from './visualizar.page';
import { ComponentesModule } from 'src/app/components/components.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    NgxQRCodeModule,

    VisualizarPageRoutingModule
  ],
  declarations: [VisualizarPage]
})
export class VisualizarPageModule { }
