import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReportsPage } from './reports.page';
import { SharedModule } from '../Shared/shared.module';
// import { ChartsModule } from 'ng2-charts';
// import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { IonicSelectableModule } from 'ionic-selectable';
import { MatCardModule } from '@angular/material/card';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatPaginatorModule, MatTableModule, MatSortModule, MatCheckboxModule } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

declare var require: any;

    export function highchartsFactory() {
      const hc = require('highcharts');
      const dd = require('highcharts/modules/drilldown');
      dd(hc);

      return hc;
    }


const routes: Routes = [
  {
    path: '',
    component: ReportsPage
  }
];

@NgModule({
  imports: [
    NgxMatSelectSearchModule,
    ChartModule,
    MatCheckboxModule,
    RouterModule.forChild(routes),
    A11yModule, PortalModule, ScrollingModule, DragDropModule, CdkStepperModule, CdkTableModule, CdkTreeModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    IonicSelectableModule,
    MultiselectDropdownModule,
    SelectDropDownModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    RouterModule.forChild(routes),

  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],

  declarations: [ReportsPage],
  exports: [ReportsPage],
  schemas: [NO_ERRORS_SCHEMA],

})
export class ReportsPageModule { }
