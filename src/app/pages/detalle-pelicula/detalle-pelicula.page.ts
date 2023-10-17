import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, ToastController} from "@ionic/angular";
import {Result} from "../../clases/MovieResult";
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage-angular";
import { IonInput } from '@ionic/angular';
@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.page.html',
  styleUrls: ['./detalle-pelicula.page.scss'],
})
export class DetallePeliculaPage implements OnInit {
  movie!: Result | undefined;
  private movies!: Result[];
  pointsInsert!: number;
  indexMovie!: number;
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
    },
  ];
  isModeEdit = false;
  editPending = false;

  constructor( public alertController: AlertController, private storage: Storage, public navCtrl: NavController, private router: Router, private activatedRoute: ActivatedRoute, private toast: ToastController) {

  }


  async ngOnInit() {
    await this.storage.create();
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const movieIdFromRoute = routeParams.get('movieId');
    this.movies = await this.storage.get('movies');
    if (typeof movieIdFromRoute === "string") {
      const index = this.movies.findIndex((movie: Result) => movie.id === movieIdFromRoute);
      this.indexMovie = index
      this.movie = this.movies[index];
    }
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
    this.isModeEdit = true;
    this.toast.create({
      message: "Edit mode activated, confirm after applying your changes",
      duration: 4000,
      position: 'bottom', //"bottom" | "middle" | "top"
    }).then(toast => {
      toast.present();
    });
  }

  onYearChanged(event:any) {
    if (this.movie && event.detail!=null) {
      this.editPending = true;
      this.movie.releaseYear.year = event.detail.value;
    }
  }

  onTitleChanged(event:any) {
    if (this.movie && event.detail!=null) {
      this.editPending = true;
      this.movie.titleText.text = event.detail.value;
    }
  }

  confirmEdit() {
    if (this.indexMovie >= 0 && this.indexMovie < this.movies.length) {
      this.storage.set('movies', this.movies).then(() => {
        this.isModeEdit = false;
        this.editPending = false;
        const message = "The changes have been applied correctly.";
        this.dialogMessage(message, "success");
      });
    }
  }

  goBack() {
    if(this.isModeEdit){
      const message = "Confirm changes before returning";
      this.dialogMessage(message, "warning");
      return;
    }
    this.navCtrl.navigateBack("/principal");
  }

  async deleteMovie() {
    const title = "Delete Movie?";
    const message = "Are you sure you want to delete this movie?";
    this.showDialog(title, message);
  }

  async showDialog(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: 'Acept',
          handler: async () => {
            this.movies.splice(this.indexMovie, 1);
            await this.storage.set('movies', this.movies);
            const msg = "Movie successfully deleted";
            this.dialogMessage(msg,"success");
            this.router.navigate(['/principal'], {replaceUrl: true});
          },
        },
      ],
    });
    await alert.present();
  }

  async dialogMessage(message:string, color: string){
    this.toast.create({
      message: message,
      color: color,
      duration: 2000,
      position: 'bottom',
    }).then(toast => {
      toast.present();
    });
  }

  modeEditVerification() {
    if(!this.isModeEdit){
      const message = "To edit this field, select edit mode.";
      this.dialogMessage(message, "warning");
    }
  }
}

