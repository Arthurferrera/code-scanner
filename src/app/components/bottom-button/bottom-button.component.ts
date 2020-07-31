import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalCadastraTituloPage } from '../../modal-cadastra-titulo/modal-cadastra-titulo.page';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-bottom-button',
  templateUrl: './bottom-button.component.html',
  styleUrls: ['./bottom-button.component.scss'],
})
export class BottomButtonComponent implements OnInit {

  public idCodigo: number;
  public dataFormatada: string;
  public data: any = {};
  listaHistorico: any = [];
  public titulo: string;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController,
    private modalController: ModalController,
    private utils: UtilsService
  ) { }

  ngOnInit() { }

  read() {
    this.listaHistorico = JSON.parse(localStorage.getItem('scan.history'));
    const dataAtual = new Date();
    const diaSplit = dataAtual.getDate();
    const dia = (diaSplit < 10) ? `0${diaSplit}` : diaSplit;
    const mesSplit = dataAtual.getMonth() + 1;
    const mes = (mesSplit < 10) ? `0${mesSplit}` : mesSplit;
    const ano = dataAtual.getFullYear();
    this.dataFormatada = `${ano}-${mes}-${dia}`;

    if (this.listaHistorico) {
      this.idCodigo = this.listaHistorico.length + 1;
    } else {
      this.idCodigo = 1;
      this.listaHistorico = [];
    }


    // Ler QRCODE
    this.barcodeScanner.scan().then(async (barcodeData: any) => {
      if (barcodeData.cancelled === 0 || barcodeData.cancelled === false) {
        await this.presentModal();
        this.data = {
          id: this.idCodigo,
          title: this.titulo,
          text: barcodeData.text,
          date: this.dataFormatada
        };

        this.listaHistorico.push(this.data);
        localStorage.setItem('scan.history', JSON.stringify(this.listaHistorico));
        this.navCtrl.navigateRoot('historico');

      } else if(barcodeData.text === '' && (barcodeData.cancelled !== 1 || barcodeData.cancelled !== true)) {
        this.utils.presentToast('Oops.. \n Código inválido!');
      } else {
        // cancelou
      }

      console.log(this.titulo);
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalCadastraTituloPage,
      keyboardClose: false,
      backdropDismiss: false,
      swipeToClose: false,
    });

    modal.onDidDismiss().then((response: any) => {
      this.titulo = response.data.titulo;
    });

    return await modal.present();
  }
}
