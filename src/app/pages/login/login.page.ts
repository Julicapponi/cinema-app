import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  alertButtons: string[];

  constructor() {
    this.alertButtons = ['Change'];
  }

  ngOnInit() {
  }

  abrirModal() {

  }

  setResult($event: any) {

  }
}
