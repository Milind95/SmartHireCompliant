import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerPage } from './interviewer.page';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatExpansionModule,
  MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatTabsModule
} from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter, CalendarEvent } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
describe('InterviewerPage', () => {
  let component: InterviewerPage;
  let fixture: ComponentFixture<InterviewerPage>;
  let service:DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewerPage, WeekComponent, MonthComponent, DayComponent],
      imports: [ReactiveFormsModule, CommonModule, MatMenuModule,
        MatButtonModule, CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory
        }), MatCheckboxModule, NgxPaginationModule,NgxMaterialTimepickerModule.forRoot() ,HttpClientTestingModule,
        MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatExpansionModule,
        MatDatepickerModule, MatNativeDateModule, ToastrModule.forRoot(), MatAutocompleteModule, MatDialogModule, MatTabsModule,
         FormsModule, HttpClientModule, HttpModule, IonicStorageModule.forRoot(), IonicModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DataService,InterviewerPage, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('method  dayClicked should be called', () => {
    const spy = spyOn(component, 'dayClicked').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  openBookingDialog should be called', () => {
    const spy = spyOn(component, 'openBookingDialog').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  eventTimesChanged should be called', () => {
    const spy = spyOn(component, 'eventTimesChanged').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  triggerPrevForMobile should be called', () => {
    const spy = spyOn(component, 'triggerPrevForMobile').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  triggerNextForMobile should be called', () => {
    const spy = spyOn(component, 'triggerNextForMobile').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  triggerTodayForMobile should be called', () => {
    const spy = spyOn(component, 'triggerTodayForMobile').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  getEvents should be called', () => {
    const spy = spyOn(component, 'getEvents').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  getTimeFromDatein12HoursFormat should be called', () => {
    const spy = spyOn(component, 'getTimeFromDatein12HoursFormat').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  slotBasedClass should be called', () => {
    const spy = spyOn(component, 'slotBasedClass').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method  ngOnDestroy should be called', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  ngOnInit should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });


  it('method  presentAlert should be called', () => {
    const spy = spyOn(component, 'presentAlert').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(InterviewerPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#panelAvailability').textContent).toContain('Panel Availability')
  }));

  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(InterviewerPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#availableCount').textContent).toContain('Available')
  }));

  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(InterviewerPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#bookedCount').textContent).toContain('Booked')
  }));

  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(InterviewerPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewedCount').textContent).toContain('Interviewed')
  })); 
   
});
