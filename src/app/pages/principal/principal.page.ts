import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {AlertController,
  IonicModule,
  MenuController,
  Platform,
  ToastController
} from '@ionic/angular';
import {Storage} from "@ionic/storage-angular";
import {Router} from "@angular/router";
import {MoviesService} from "../../services/movies.service";
import {Result} from "../../clases/MovieResult";
import * as Constants from '../../constants';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  newUserName = '';
  TAG = 'PrincipalPage';
  loadingMovies=false;
  movies: Result[] = [];
  moviesStorage: Result[] = [];

   constructor(private moviesService: MoviesService, private storage: Storage, private router: Router, private platform: Platform, private fb: FormBuilder, private toast: ToastController) {
      this.movies=[];
  }

  async ngOnInit() {
    await this.storage.create();
    this.moviesStorage = await this.storage.get(Constants.KeyMovies);
    // If there is data loaded, I do not consume the api
    if(this.moviesStorage!=null){
      if(this.moviesStorage.length===0){
        await this.getMoviesApi();
      }
    } else {
      await this.getMoviesApi();
    }
  }


  getMoviesApi() {
    this.loadingMovies = true;
    this.moviesService.getMovies().subscribe(async movies => {
      if (Array.isArray(movies.results)) {
        this.movies = movies.results;
      }
      // Set movies in localStorage
      this.storage.set(Constants.KeyMovies, this.movies);
      // get movies localStorage
      this.moviesStorage = await this.storage.get(Constants.KeyMovies);
      this.loadingMovies = false;
    });
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
}
