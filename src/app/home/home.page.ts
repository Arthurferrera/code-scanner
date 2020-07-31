import { Component, OnInit } from '@angular/core';
import { ModalCadastraTituloPage } from '../modal-cadastra-titulo/modal-cadastra-titulo.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }


  ngOnInit() {
    // this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalCadastraTituloPage,
      keyboardClose: false,
      backdropDismiss: false,
      swipeToClose: false,
    });

    modal.onDidDismiss().then((response: any) => {
      console.log(response.data.titulo);
    });

    return await modal.present();
  }

}
