import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  public periodoHoje = true;
  public periodoTodos = false;

  public listaHistorico: Array<any> = [
    {
      id: 1,
      titulo: 'Site 1',
      descricao: 'www.uol.com.br'
    },
    {
      id: 2,
      titulo: 'Site 2',
      descricao: 'www.uol.com.br'
    },
    {
      id: 3,
      titulo: 'Site 3',
      descricao: 'www.uol.com.br'
    },
    {
      id: 4,
      titulo: 'Site 4',
      descricao: 'www.uol.com.br'
    }
  ];

  constructor() {
    this.listaHistorico.push();
    this.listaHistorico.push();
    this.listaHistorico.push();
    this.listaHistorico.push();
  }

  ngOnInit() {
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
    console.log(item);
  }

}
