import { SharedModule } from './../../../Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookingViewPage } from './booking-view.page';

const routes: Routes = [
  {
    path: '',
    component: BookingViewPage,
    children: [
      {
        path: 'available',
        children:
          [
            {
              path: '',
              loadChildren: './available/available.module#AvailablePageModule'
            }
          ]
      },
      {
        path: 'booked',
        children:
          [
            {
              path: '',
              loadChildren: './booked/booked.module#BookedPageModule'
            }
          ]
      },
      {
        path: 'interviewed',
        children:
          [
            {
              path: '',
              loadChildren: './interviewed/interviewed.module#InterviewedPageModule'
            }
          ]
      },
      {
        path: 'panelAvailability',
        children:
          [
            {
              path: '',
              loadChildren: './panel-availability/panel-availability.module#PanelAvailabilityPageModule'
            }
          ]
      },
      {
        path: '',
        children:
          [
            {
              path: '',
              loadChildren: './available/available.module#AvailablePageModule'
            }
          ]
      }
    ]
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
  declarations: [BookingViewPage]
})
export class BookingViewPageModule { }
