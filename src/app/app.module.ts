import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {IonicModule, IonicRouteStrategy, ToastController} from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicStorageModule} from "@ionic/storage-angular";
import {RegistroComponent} from "./component/registro/registro.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
