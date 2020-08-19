import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { UtilsService } from 'src/app/services/utils.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bottom-button',
  templateUrl: './bottom-button.component.html',
  styleUrls: ['./bottom-button.component.scss'],
})
export class BottomButtonComponent implements OnInit {
  @Input() ler = false;
  @Output() atualizarLista: EventEmitter<boolean> = new EventEmitter();
  public idCodigo: number;
  public dataFormatada: string;
  public data: any = {};
  listaHistorico: any = [];
  public titulo: string;
  public primeiraLeitura = false;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController,
    private utils: UtilsService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    setInterval(() => {
      if (this.ler && !this.primeiraLeitura) {
        this.primeiraLeitura = true;
        this.read();
      }
    }, 1000);
  }

  async read() {
    this.listaHistorico = await JSON.parse(
      localStorage.getItem('scan.history')
    );
    const dataAtual = new Date();
    const diaSplit = dataAtual.getDate();
    const dia = diaSplit < 10 ? `0${diaSplit}` : diaSplit;
    const mesSplit = dataAtual.getMonth() + 1;
    const mes = mesSplit < 10 ? `0${mesSplit}` : mesSplit;
    const ano = dataAtual.getFullYear();
    this.dataFormatada = await `${ano}-${mes}-${dia}`;

    if (this.listaHistorico) {
      this.idCodigo = (await this.listaHistorico.length) + 1;
    } else {
      this.idCodigo = 1;
      this.listaHistorico = [];
    }

    // Ler QRCODE
    this.barcodeScanner
      .scan()
      .then(async (barcodeData: any) => {
        if (barcodeData.cancelled === 0 || barcodeData.cancelled === false) {
          await this.presentAlertPrompt(barcodeData.text);
          this.navCtrl.navigateRoot('historico');
        } else if (
          barcodeData.text === '' &&
          barcodeData.cancelled !== 1 &&
          barcodeData.cancelled !== true
        ) {
          this.utils.presentToast('Código inválido!');
        }
      })
      .catch((error) => {
        this.utils.presentToast('Erro inesperado!');
        console.error('Error', error);
      });
  }

  async presentAlertPrompt(textoBarcode) {
    const alert = await this.alertController.create({
      keyboardClose: false,
      backdropDismiss: false,
      header: 'Insira um título',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: '',
        },
      ],
      buttons: [
        {
          text: 'Salvar',
          handler: (response) => {
            if (response.titulo === '') {
              this.utils.presentToast('Insira um titulo para o código.');
              return false;
            } else {
              this.titulo = response.titulo;
              this.salvarCodigo(textoBarcode);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  salvarCodigo(textoBarcode) {
    this.data = {
      id: this.idCodigo,
      title: this.titulo,
      text: textoBarcode,
      date: this.dataFormatada,
    };

    this.listaHistorico.unshift(this.data);
    localStorage.setItem('scan.history', JSON.stringify(this.listaHistorico));
    this.atualizarLista.emit(true);
  }
}
