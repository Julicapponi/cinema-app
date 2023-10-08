import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import {CardPeliculaComponent} from "../../component/card-pelicula/card-pelicula.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule
  ],
    declarations: [PrincipalPage, CardPeliculaComponent]
})
export class PrincipalPageModule {}
