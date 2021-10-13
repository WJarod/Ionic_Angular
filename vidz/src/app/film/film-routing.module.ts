import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmPage } from './film.page';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: FilmPage
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmPageRoutingModule {}
