import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-cadastra-titulo',
  templateUrl: './modal-cadastra-titulo.page.html',
  styleUrls: ['./modal-cadastra-titulo.page.scss'],
})
export class ModalCadastraTituloPage implements OnInit {

  public titulo = '';

  constructor(
    private modalCtrl: ModalController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({titulo: this.titulo});
  }

  async validarCampo() {
    if (this.titulo === '') {
      const toast = await this.toastController.create({
        message: 'Insira um titulo para o código.',
        duration: 2000
      });
      toast.present();
    } else {
      this.dismiss();
    }
  }

}
