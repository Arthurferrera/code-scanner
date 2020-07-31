import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-modal-cadastra-titulo',
  templateUrl: './modal-cadastra-titulo.page.html',
  styleUrls: ['./modal-cadastra-titulo.page.scss'],
})
export class ModalCadastraTituloPage implements OnInit {

  public titulo = '';

  constructor(
    private modalCtrl: ModalController,
    private utils: UtilsService
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({titulo: this.titulo});
  }

  async validarCampo() {
    if (this.titulo === '') {
      this.utils.presentToast('Insira um titulo para o código.');
    } else {
      this.dismiss();
    }
  }

}
