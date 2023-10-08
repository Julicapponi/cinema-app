import { Component, OnInit } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.page.html',
  styleUrls: ['./detalle-pelicula.page.scss'],
})
export class DetallePeliculaPage implements OnInit {

  constructor(private toast: ToastController) { }

  ngOnInit() {
  }

  deletePelicula() {
    this.toast.create({
      message: "Borrar pelicula",
      duration: 2000,
      position: 'bottom', //"bottom" | "middle" | "top"
      // showCloseButton: true,
    }).then(toast => {
      toast.present();
    });
  }

  editPelicula() {
    this.toast.create({
      message: "Editar pelicula",
      duration: 2000,
      position: 'bottom', //"bottom" | "middle" | "top"
      // showCloseButton: true,
    }).then(toast => {
      toast.present();
    });
  }
}
