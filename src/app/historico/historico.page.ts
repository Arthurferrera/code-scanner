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
  public listaHistorico: Array<any> = [];
  public ler = false;

  constructor(
    private router: Router
    ) {
      this.ler = !JSON.parse(localStorage.getItem('scan.primeiraLeitura'));
    }

  ngOnInit() {
  }

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
        id: item.id
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
    if (localStorage.getItem('scan.history')) {
      this.listaHistorico = await JSON.parse(localStorage.getItem('scan.history'));
    }

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
