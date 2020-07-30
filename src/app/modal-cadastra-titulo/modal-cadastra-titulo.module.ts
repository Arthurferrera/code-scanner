import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCadastraTituloPageRoutingModule } from './modal-cadastra-titulo-routing.module';

import { ModalCadastraTituloPage } from './modal-cadastra-titulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCadastraTituloPageRoutingModule
  ],
  declarations: [ModalCadastraTituloPage]
})
export class ModalCadastraTituloPageModule {}
