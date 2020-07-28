import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  // tslint:disable-next-line: ban-types
  public periodoHoje: Boolean = true;
  // tslint:disable-next-line: ban-types
  public periodoTodos: Boolean = false;

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

  changeList() {
    if (this.periodoHoje) {
      this.periodoHoje = false;
      this.periodoTodos = true;
    } else {
      this.periodoHoje = true;
      this.periodoTodos = false;
    }
  }

  clickItem(item) {
    console.log(item);
    
  }

}
