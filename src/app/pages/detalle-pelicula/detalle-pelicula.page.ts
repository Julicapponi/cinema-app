import { Component, OnInit } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {Result} from "../../clases/MovieResult";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.page.html',
  styleUrls: ['./detalle-pelicula.page.scss'],
})
export class DetallePeliculaPage implements OnInit {
  movie!: Result;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private toast: ToastController) {
    /*try {

      this.activatedRoute.queryParams.subscribe(() => {
        if (this.router?.getCurrentNavigation()?.extras?.state) {
          const movie = this.router?.getCurrentNavigation()?.extras?.state?.movie;
          if (movie) {
            this.movie = movie;
          }
        }
      });
    } catch (e) {
    }
    
     */
  }


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
