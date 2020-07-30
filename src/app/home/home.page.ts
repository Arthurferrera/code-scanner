import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public id_codigo: number;
  public dataFormatada: string;
  public data: any = {};
  listaHistorico: any = [];



  constructor(private barcodeScanner: BarcodeScanner, private navCtrl: NavController) { }


  ngOnInit() {

    this.listaHistorico = JSON.parse(localStorage.getItem('scan.history'));
    const dataAtual = new Date();
    const diaSplit = dataAtual.getDate();
    const dia = (diaSplit < 10) ? `0${diaSplit}` : diaSplit;
    const mesSplit = dataAtual.getMonth() + 1;
    const mes = (mesSplit < 10) ? `0${mesSplit}` : mesSplit;
    const ano = dataAtual.getFullYear();
    this.dataFormatada = `${ano}-${mes}-${dia}`;

    if (this.listaHistorico) {
      this.id_codigo = this.listaHistorico.length + 1;
    } else {
      this.id_codigo = 1;
      this.listaHistorico = [];
    }


    //Ler QRCODE
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      this.data = {
        id: this.id_codigo,
        title: '',
        text: barcodeData.text,
        date: this.dataFormatada
      };

      this.listaHistorico.push(this.data);

      localStorage.setItem('scan.history', JSON.stringify(this.listaHistorico));

      this.navCtrl.navigateRoot('historico');
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
