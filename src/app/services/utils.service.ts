import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public toastController: ToastController
  ) { }

  async presentToast(texto, tempo = 2000) {
    const toast = await this.toastController.create({
      message: texto,
      duration: tempo
    });
    toast.present();
  }
}
