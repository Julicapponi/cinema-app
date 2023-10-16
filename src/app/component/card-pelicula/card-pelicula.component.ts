import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../clases/Movie";
import {Result} from "../../clases/MovieResult";
import {Storage} from "@ionic/storage-angular";
import {NavigationExtras, Router} from "@angular/router";
import {NavController, PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-card-pelicula',
  templateUrl: './card-pelicula.component.html',
  styleUrls: ['./card-pelicula.component.scss'],
})
export class CardPeliculaComponent  implements OnInit {
  mov: Result[] = [];
  @Input() movie!: Result;
  pointsInsert!: number;
  constructor(public navCtrl: NavController, private router: Router, private storage: Storage) {
    console.log(this.movie);
  }

  ngOnInit() {
    console.log(this.movie);
  }

  seleccionarPuntaje(points: number) {
    this.pointsInsert = points;
    // Obtener las películas desde el almacenamiento local
    this.storage.get('movies').then((movies) => {
      this.mov = movies;
      if (this.mov) {
        // Encontrar la película actual en el array y actualizar su puntaje
        const index = this.mov.findIndex((movie: Result) => movie.id === this.movie.id);
        if (index !== -1) {
            this.mov[index].rate = { points: this.pointsInsert };
            this.movie.rate = { points: this.pointsInsert };
          // Guardar el array actualizado en el almacenamiento local
          this.storage.set('movies', this.mov);
        }
      }
    });
  }

  async goDetailMovie(movie: Result) {
    this.navCtrl.navigateForward('/detalle-pelicula', {
      state: {
        movie: movie,
      },
    });
  }

}
