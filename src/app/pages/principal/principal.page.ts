import { Component, OnInit } from '@angular/core';
import {AlertController,
  MenuController,
  Platform,
  ToastController
} from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private toast: ToastController) { }

  ngOnInit() {
  }

  busqueda() {

    this.toast.create({
      message: "busqueda",
      duration: 2000,
      position: 'bottom', //"bottom" | "middle" | "top"
      // showCloseButton: true,
    }).then(toast => {
      toast.present();
    });
  }

  irDetallePelicula() {

  }
}
