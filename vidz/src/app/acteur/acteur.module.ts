import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActeurPageRoutingModule } from './acteur-routing.module';

import { ActeurPage } from './acteur.page';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActeurPageRoutingModule,
    
  ],
  declarations: [ActeurPage, DetailComponent]
})
export class ActeurPageModule {}
