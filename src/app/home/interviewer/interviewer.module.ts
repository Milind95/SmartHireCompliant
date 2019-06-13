import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter, CalendarDateFormatter, CalendarEventTitleFormatter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { IonicModule } from '@ionic/angular';

import { InterviewerPage } from './interviewer.page';
import { MonthComponent } from './month/month.component';
import { SharedModule } from '../../Shared/shared.module';



const routes: Routes = [
  {
    path: '',
    component: InterviewerPage,
    children: [
      {
        path: '',
        component: MonthComponent,
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
    RouterModule.forChild(routes),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  declarations: [InterviewerPage,MonthComponent]
})
export class InterviewerPageModule { }
