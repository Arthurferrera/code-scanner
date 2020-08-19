import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  public item: any = {};
  public id: any;
  public listaHistorico: Array<any>;

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    // public socialSharing: SocialSharing
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.id) {
        this.id = JSON.parse(params.id);
      }
    });
    this.listaHistorico = await JSON.parse(
      localStorage.getItem('scan.history')
    );

    this.item = this.listaHistorico.find((item) => item.id === this.id);
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
          },
        },
        {
          text: 'Sim, excluir',
          handler: () => {
            this.removerItemLista();
          },
        },
      ],
    });

    await alert.present();
  }

  async removerItemLista() {
    let listaHistorico = JSON.parse(localStorage.getItem('scan.history'));
    listaHistorico = await listaHistorico.filter((itemHistorico) => {
      return itemHistorico.id !== this.item.id;
    });
    await localStorage.setItem('scan.history', JSON.stringify(listaHistorico));
    this.router.navigate(['historico']);
  }

  share() {

  }
}
