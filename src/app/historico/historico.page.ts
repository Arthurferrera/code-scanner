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

  constructor() { }

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

}
