import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})


export class HistoricoPage implements OnInit {

  public periodoHoje = true;
  public periodoTodos = false;
  public listaHoje: Array<any> = [];
  public listaHistorico: Array<any> = [
    // {
    //   id: 0,
    //   title: 'Site 1',
    //   text: 'www.uol.com.br',
    //   date: '2020-07-29'
    // },
    // {
    //   id: 1,
    //   title: 'Site 2',
    //   text: 'www.uol.com.br',
    //   date: '2020-07-28'
    // },
    // {
    //   id: 2,
    //   title: 'Site 3',
    //   text: 'www.uol.com.br',
    //   date: '2020-07-27'
    // },
    // {
    //   id: 3,
    //   title: 'Site 4',
    //   text: 'www.uol.com.br',
    //   date: '2020-07-26'
    // },
    // {
    //   id: 4,
    //   title: 'Site 3',
    //   text: 'www.uol.com.br',
    //   date: '2020-07-25'
    // },
    // {
    //   id: 5,
    //   title: 'Site 4',
    //   text: 'www.uol.com.br',
    //   date: '2020-07-24'
    // }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  async ionViewDidEnter() {
    this.carregarLista();
  }

  changeList(periodo: string) {
    if (periodo === 'hoje') {
      if (!this.periodoHoje) {
        this.periodoHoje = true;
        this.periodoTodos = false;
      }
    } else {
      if (!this.periodoTodos) {
        this.periodoHoje = false;
        this.periodoTodos = true;
      }
    }
  }

  clickItem(item) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        dados: JSON.stringify(item)
      }
    };
    this.router.navigate(['visualizar'], navigationExtras);
  }

  async atualizarLista(event) {
    if (event) {
      this.carregarLista();
    }
  }

  async carregarLista() {
    this.listaHistorico = await JSON.parse(localStorage.getItem('scan.history'));

    const dataAtual = new Date();
    const diaSplit = dataAtual.getDate();
    const dia = (diaSplit < 10) ? `0${diaSplit}` : diaSplit;
    const mesSplit = dataAtual.getMonth() + 1;
    const mes = (mesSplit < 10) ? `0${mesSplit}` : mesSplit;
    const ano = dataAtual.getFullYear();
    const dataFormatada = await `${ano}-${mes}-${dia}`;

    this.listaHoje = this.listaHistorico.filter(item => {
      return item.date === dataFormatada;
    });
  }

}
