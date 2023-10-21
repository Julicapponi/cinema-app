import {Component, OnInit} from '@angular/core';
import {Storage} from "@ionic/storage-angular";
import * as Constants from "./constants";
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Movies', url: '/principal', icon: 'videocam' },
  ];
   userLogged: any;
  constructor(private router: Router, private storage: Storage) {
  }

  async ngOnInit() {
    await this.storage.create();
  }

  async menuOpened() {
    this.userLogged = await this.storage.get(Constants.LOGGED_USER);
    console.log(this.userLogged);
  }

  async logout() {

    await this.storage.remove(Constants.LOGGED_USER);
    await this.storage.remove(Constants.KeyMovies);
    await this.router.navigate(['/login'], {replaceUrl: true});
  }
}
