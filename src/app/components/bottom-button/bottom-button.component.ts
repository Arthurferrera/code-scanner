import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bottom-button',
  templateUrl: './bottom-button.component.html',
  styleUrls: ['./bottom-button.component.scss'],
})
export class BottomButtonComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {

  }

  read() {
    this.navCtrl.navigateRoot('home');
  }

}
