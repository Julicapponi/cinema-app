import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';

import {IonicModule, IonicRouteStrategy, ToastController} from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicStorageModule} from "@ionic/storage-angular";
import {RegistroComponent} from "./component/registro/registro.component";
import {HttpClientModule} from "@angular/common/http";
import {CardPeliculaComponent} from "./component/card-pelicula/card-pelicula.component";
import {DetallePeliculaPage} from "./pages/detalle-pelicula/detalle-pelicula.page";

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: CardPeliculaComponent },
      { path: 'detalle-pelicula/:movieId', component: DetallePeliculaPage },
    ]),
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
