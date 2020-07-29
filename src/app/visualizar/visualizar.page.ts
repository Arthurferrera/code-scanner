import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {

  public item: any = {};

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.dados) {
        this.item = JSON.parse(params.dados);
      }
    });
    console.log(this.item);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Deseja excluir?',
      message: 'Tem certeza de que deseja excluir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim, excluir',
          handler: () => {
            this.removerItemLista();
          }
        }
      ]
    });

    await alert.present();
  }

  async removerItemLista() {
    let listaHistorico = JSON.parse(localStorage.getItem('scan.history'));
    listaHistorico = await listaHistorico.filter(itemHistorico => {
      return itemHistorico.id !== this.item.id;
    });
    localStorage.setItem('scan.history', JSON.stringify(listaHistorico));
  }

}
