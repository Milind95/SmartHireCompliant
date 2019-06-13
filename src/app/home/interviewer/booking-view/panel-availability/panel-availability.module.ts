import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PanelAvailabilityPage } from './panel-availability.page';
import { SharedModule } from '../../../../Shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PanelAvailabilityPage
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
  declarations: [PanelAvailabilityPage]
})
export class PanelAvailabilityPageModule {}
