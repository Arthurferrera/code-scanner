import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCadastraTituloPage } from './modal-cadastra-titulo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCadastraTituloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCadastraTituloPageRoutingModule {}
