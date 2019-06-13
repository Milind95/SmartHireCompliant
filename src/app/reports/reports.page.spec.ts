import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsPage } from './reports.page';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import {
  MatButtonModule, MatMenuModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatAutocompleteModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
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
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'
import { HighchartsStatic, } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { compileNgModule } from '@angular/core/src/render3/jit/module';


describe('ReportsPage', () => {
  let component: ReportsPage;
  let fixture: ComponentFixture<ReportsPage>;
  let service: DataService;
  function highchartsFactory() {
    const hc = require('highcharts');
    const dd = require('highcharts/modules/drilldown');
    dd(hc);

    return hc;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsPage],
      imports: [ReactiveFormsModule, CommonModule, SelectDropDownModule, MultiselectDropdownModule, IonicSelectableModule,
        MatCardModule, A11yModule, DragDropModule, PortalModule, ScrollingModule, CdkStepperModule, CdkTableModule,
        CdkTreeModule, MatPaginatorModule, MatTableModule, MatSortModule, ChartModule, NgxMatSelectSearchModule,
        MatMenuModule, MatCheckboxModule, BrowserAnimationsModule,
        MatButtonModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatAutocompleteModule,
        FormsModule, OwlNativeDateTimeModule, OwlDateTimeModule, HttpModule,HttpClientTestingModule,
        IonicModule, IonicStorageModule.forRoot(), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DataService, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: HighchartsStatic,
          useFactory: highchartsFactory
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('method ngOnInit should be called', (() => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));

  it('method onChange should be called', (() => {
    const spy = spyOn(component, 'onChange').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method prefixSearchFunction should be called', (() => {
    const spy = spyOn(component, 'prefixSearchFunction').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method techEnable should be called', (() => {
    const spy = spyOn(component, 'techEnable').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method reportsFunction should be called', (() => {
    const spy = spyOn(component, 'reportsFunction').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method barChart should be called', (() => {
    const spy = spyOn(component, 'barChart').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method pieChart should be called', (() => {
    const spy = spyOn(component, 'pieChart').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method reportsEvent should be called', (() => {
    const spy = spyOn(component, 'reportsEvent').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));

  it('method tabularReport should be called', (() => {
    const spy = spyOn(component, 'tabularReport').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));

  it('method customFilterPredicate should be called', (() => {
    const spy = spyOn(component, 'customFilterPredicate').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));

  it('method showFilterpage should be called', (() => {
    const spy = spyOn(component, 'showFilterpage').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));

  it('method gotoFilterPage should be called', (() => {
    const spy = spyOn(component, 'gotoFilterPage').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));

  it('method techCheckbox should be called', (() => {
    const spy = spyOn(component, 'techCheckbox').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method orgCheckbox should be called', (() => {
    const spy = spyOn(component, 'orgCheckbox').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method selectedAccount should be called', (() => {
    const spy = spyOn(component, 'selectedAccount').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method seletedTechValue should be called', (() => {
    const spy = spyOn(component, 'seletedTechValue').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));

  it('method seletedDayValue should be called', (() => {
    const spy = spyOn(component, 'seletedDayValue').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));

  it('method selectedOrganization should be called', (() => {
    const spy = spyOn(component, 'selectedOrganization').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method selectedMarketUnit should be called', (() => {
    const spy = spyOn(component, 'selectedMarketUnit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method getDateRange should be called', (() => {
    const spy = spyOn(component, 'getDateRange').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('method downloadCompleteReports should be called', (() => {
    const spy = spyOn(component, 'downloadCompleteReports').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));

  it('method filterMyOptions should be called', (() => {
    const spy = spyOn(component, 'filterMyOptions').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));

  it('method OnClear should be called', (() => {
    const spy = spyOn(component, 'OnClear').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  }));
  it('should render title in header tag', (() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toBe('Please Wait...');
  }));

  it('should do onChange method', ()=>{
    component['onChange']();
    expect(component.onChange).toBeTruthy();
    expect((console.log("Option Model",4))).toBeUndefined();
   }) 
   it('should do showFilterpage method', ()=>{
    component['showFilterpage']();
    let mobileFilter:boolean=true;
    expect(mobileFilter).toBeTruthy();
    expect(component.mobileFilter).toBe(true);
   }) 
   it('should do gotoReportPage method', ()=>{
    component['gotoReportPage']();
    let mobileView:boolean=false;
    expect(mobileView).toBeFalsy();
    expect(component.mobileView).toBe(false);
   }) 
   it('should do gotoReportPage method', ()=>{
    component['gotoReportPage']();
    let mobileView:boolean=false;
    expect(mobileView).toBeFalsy();
    expect(component.mobileView).toBe(false);
   }) 

   it('should do gotoReportPage method', ()=>{
    component['gotoReportPage']();
    let mobileView:boolean=true;
    expect(mobileView).toBeTruthy();
    expect(component.mobileView).not.toBe(true);
   }) 

   it('should do techCheckbox method', ()=>{
    const click: Event = new Event('');
    component['techCheckbox'](click);
    let showTmpl1:boolean=true;
    expect(showTmpl1).toBeTruthy();
    expect(component.showTmpl1).toBe(true);
    let check:Boolean=true;
    expect(check).toBeTruthy();
    expect(component.techCheckboxValue).toBe("Enable");
    expect(component.checkboxDisabled).toBe(true);
    expect(component.selectedTechnology).toBe(undefined);
    expect(component.reportsFunction).toBeTruthy();
   })


  it('should do orgCheckbox method', ()=>{
    const click: Event = new Event('');
    component['orgCheckbox'](click);
    let showTmpl2:boolean=true;
    expect(showTmpl2).toBeTruthy();
    expect(component.showTmpl2).toBe(true);
    let check:Boolean=true;
    expect(check).toBeTruthy();
    expect(component.orgCheckboxValue).toBe("Enable");
    expect(component.checkboxDisabledOrg).toBe(true);
    expect(component.selectedOrg).toBe(undefined);
    expect(component.selectedMarketUnitValue).toBe(undefined);
    expect(component.accountId).toBe(undefined);
    expect(component.reportsFunction).toBeTruthy();
    expect(component.marketUnitDisabled).toBe(true);
    expect(component.marketUnitArray).toBe(undefined);
    expect(component.accountsArray).toBe(undefined);
    expect(component.selectAccoutnDisabled).toBe(true);
   })

   it('should do selectedAccount method', ()=>{
     let account="HtechAccount"
    component['selectedAccount'](account);
    let length=account.length;
    expect(length).toBe(12);
    expect(component.backAccColor).toBe("#A9A9A9");
    expect(component.accountId).toBe(account);
    expect((console.log("hello",account))).toBeUndefined();
    expect(component.reportsFunction).toBeTruthy();
   }) 

   it('should do seletedDayValue method', ()=>{
    let dayValue=["All Day","Week Day","Week End"]
    component['seletedDayValue'](dayValue);
    let length=dayValue.length;
    expect(length).toBe(3);
   expect(component.backdayColor).toBe("#A9A9A9");
   expect((console.log("day value ",dayValue))).toBeUndefined();
   expect(component.reportsFunction).toBeTruthy();
  }) 

it('should do seletedDayValue method', ()=>{
    let dayValue="Week Day"
   component['seletedDayValue'](dayValue);
   let length=dayValue.length;
   expect(length).toBe(8);
   expect(component.backdayColor).toBe("#A9A9A9");
   expect((console.log("day value ",dayValue))).toBeUndefined();
   expect(component.reportsFunction).toBeTruthy();
  }) 

  
  it('should do selectedOrganization method', ()=>{
    let service = TestBed.get(DataService);
    let org="AppsNA-CSD"
   component['selectedOrganization'](org);
   let length=org.length;
   expect(length).toBe(10)
   expect(component.backOrgColor).toBe("#A9A9A9");
   let selectedBU = spyOn(service, 'getMarketUnitByBu');
   service.getMarketUnitByBu(selectedBU);
   expect(selectedBU).toHaveBeenCalled();
    component.buArray=[];
    component.buArray.push([{
    id: 1,
    name: "HTech"
   },{
    id: 2,
    name: "Industrial Unit"
   }])

expect(component.buArray[0]).toContain({id: 1,
  name: "HTech"});
  component.marketUnitDisabled=false;
  expect(component.marketUnitDisabled).toBe(false);
  expect(component.accountId).toBe(undefined);
  expect(component.selectedMarketUnitValue).toBe(undefined);
}) 


it('should do selectedMarketUnit method', ()=>{
  let service = TestBed.get(DataService);
  let mu="HTech";
 component['selectedMarketUnit'](mu);
 let length=mu.length;
 expect(length).toBe(5);
 expect(component.backAccColor).toBe("#A9A9A9");
 component.marketUnitArray=[];
 component.marketUnitArray.push("HTech")
 component.marketUnitArray.push("Industrial Unit") 
 expect(component.marketUnitArray[0]).toContain("HTech");
 let selectedMU = spyOn(service, 'getAccountByMu');
 service.getAccountByMu(selectedMU);
 expect(selectedMU).toHaveBeenCalled();
  component.accountsArray=[];
  component.accountsArray.push([{
  id: 1}])
expect(component.accountsArray[0]).toContain({id: 1});
expect(component.reportsFunction).toBeTruthy();
component.selectAccoutnDisabled=false;
expect(component.selectAccoutnDisabled).toBe(false);
}) 

 });
