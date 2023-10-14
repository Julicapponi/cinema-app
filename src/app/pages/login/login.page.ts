import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DatabaseService} from "../../services/database.service";
import {ToastController} from "@ionic/angular";
import {Users} from "../../clases/Users";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  alertButtons: string[];
  loginForm: FormGroup;
  TAG = 'LoginPage';
  private users: Users[];
  constructor(private formBuilder: FormBuilder, private router: Router, public database:DatabaseService, private toast: ToastController) {
    this.alertButtons = ['Change'];
  }

  ngOnInit() {
  }

  abrirModal() {

  }

  setResult($event: any) {

  }

  async login() {
    await this.database.getUsers().then(result => {
      console.log(this.TAG + 'addUser | user result:' + JSON.stringify(result));
      this.users = result;
      for (let user of result) {
        if (user.userName === "Juli" && user.pass === "222") {
          this.mensaje('Logueado con éxito.', 'success');
          this.router.navigate(['/principal']);
          return;
        }
          continue;
      }
    }).catch((error) => {
      console.log(this.TAG + '111 login | error:' + JSON.stringify(error));
      this.mensaje('Error al loguear: ' + error, 'danger');
    });
  }


  async mensaje(mensaje:string, color: string){
    this.toast.create({
      message: mensaje,
      color: 'success',
      duration: 2000,
      position: 'bottom',
    }).then(toast => {
      toast.present();
    });
  }
}
