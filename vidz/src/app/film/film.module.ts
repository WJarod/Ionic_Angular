import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilmPageRoutingModule } from './film-routing.module';

import { FilmPage } from './film.page';
import { BrowserModule } from '@angular/platform-browser';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilmPageRoutingModule
  ],
  declarations: [FilmPage, DetailComponent]
})
export class FilmPageModule {}
