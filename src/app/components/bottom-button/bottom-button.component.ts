import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() atualizarLista: EventEmitter<boolean> = new EventEmitter();
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

  async read() {
    this.listaHistorico = await JSON.parse(localStorage.getItem('scan.history'));
    const dataAtual = new Date();
    const diaSplit = dataAtual.getDate();
    const dia = (diaSplit < 10) ? `0${diaSplit}` : diaSplit;
    const mesSplit = dataAtual.getMonth() + 1;
    const mes = (mesSplit < 10) ? `0${mesSplit}` : mesSplit;
    const ano = dataAtual.getFullYear();
    this.dataFormatada = await `${ano}-${mes}-${dia}`;

    if (this.listaHistorico) {
      this.idCodigo = await this.listaHistorico.length + 1;
    } else {
      this.idCodigo = 1;
      this.listaHistorico = [];
    }

    // Ler QRCODE
    this.barcodeScanner.scan().then(async (barcodeData: any) => {
      if (barcodeData.cancelled === 0 || barcodeData.cancelled === false) {
        await this.presentModal(barcodeData.text);
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

  async presentModal(textoBarcode) {
    const modal = await this.modalController.create({
      component: ModalCadastraTituloPage,
      keyboardClose: false,
      backdropDismiss: false,
      swipeToClose: false,
    });

    modal.onDidDismiss().then(async (response: any) => {
      this.titulo = await response.data.titulo;
      this.salvarCodigo(textoBarcode);
    });

    return await modal.present();
  }

  salvarCodigo(textoBarcode) {
    this.data = {
      id: this.idCodigo,
      title: this.titulo,
      text: textoBarcode,
      date: this.dataFormatada
    };
    console.log(this.data);

    this.listaHistorico.push(this.data);
    localStorage.setItem('scan.history', JSON.stringify(this.listaHistorico));
    this.atualizarLista.emit(true);
  }
}
