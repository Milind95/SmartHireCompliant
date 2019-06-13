import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookedPage } from './booked.page';
import { SharedModule } from '../../../../Shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: BookedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookedPage]
})
export class BookedPageModule {}
