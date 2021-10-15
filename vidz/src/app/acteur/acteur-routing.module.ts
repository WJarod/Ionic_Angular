import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from '../acteur/detail/detail.component';

import { ActeurPage } from './acteur.page';

const routes: Routes = [
  {
    path: '',
    component: ActeurPage
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
export class ActeurPageRoutingModule {}
