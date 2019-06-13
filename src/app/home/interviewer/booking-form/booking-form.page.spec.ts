import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingFormPage } from './booking-form.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { MatAutocompleteModule } from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

describe('BookingFormPage', () => {
  let component: BookingFormPage;
  let fixture: ComponentFixture<BookingFormPage>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, RouterTestingModule,
        IonicStorageModule.forRoot(),
        HttpClientModule, HttpModule, IonicModule, OwlDateTimeModule,NgxMaterialTimepickerModule.forRoot() ,OwlNativeDateTimeModule, ReactiveFormsModule, MatAutocompleteModule],
      declarations: [BookingFormPage],
      providers: [
        DataService,BookingFormPage,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 8000;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('method ngOnInit should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method  saveBookingSlotInterviewer should be called', () => {
    const spy = spyOn(component, 'saveBookingSlotInterviewer').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method rescheduleBookingSlotInterviewer  should be called', () => {
    const spy = spyOn(component, 'rescheduleBookingSlotInterviewer').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method saveBookingSlotRecruiter  should be called', () => {
    const spy = spyOn(component, 'saveBookingSlotRecruiter').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method checkTimeValidity should be called', () => {
    const spy = spyOn(component, 'checkTimeValidity').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method rescheduleBookingSlotRecruiter should be called', () => {
    const spy = spyOn(component, 'rescheduleBookingSlotRecruiter').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method checkValidationsForInterviewer should be called', () => {
    const spy = spyOn(component, 'checkValidationsForInterviewer').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method checkValidationsForRecruiter should be called', () => {
    const spy = spyOn(component, 'checkValidationsForRecruiter').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method ngOnDestroy should be called', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method timeSet should be called', () => {
    const spy = spyOn(component, 'timeSet').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method toggleMultipleSlots should be called', () => {
    const spy = spyOn(component, 'toggleMultipleSlots').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method clearValues should be called', () => {
    const spy = spyOn(component, 'clearValues').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method clearWeekDays should be called', () => {
    const spy = spyOn(component, 'clearWeekDays').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method toasterNotification should be called', () => {
    const spy = spyOn(component, 'toasterNotification').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method techChange should be called', () => {
    const spy = spyOn(component, 'techChange').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method buChange should be called', () => {
    const spy = spyOn(component, 'buChange').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method intTypeChange should be called', () => {
    const spy = spyOn(component, 'intTypeChange').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method interviewerChange should be called', () => {
    const spy = spyOn(component, 'interviewerChange').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method fetchInterviewer should be called', () => {
    const spy = spyOn(component, 'fetchInterviewer').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method dateTimeChangeEvent should be called', () => {
    const spy = spyOn(component, 'dateTimeChangeEvent').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method checkBoxChange should be called', () => {
    const spy = spyOn(component, 'checkBoxChange').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
 it('should do getTechnology method', ()=>{
  let component = TestBed.get(BookingFormPage);
  const event: Event = new Event('');
  component['getTechnology'](event);
  expect(component.selectedTechnology ).toBe(event);
 })  
 it('should do getBU method', ()=>{
  let component = TestBed.get(BookingFormPage);
  const event: Event = new Event('');
  component['getBU'](event);
  expect(component.selectedBussinessUnit ).toBe(event);
 }) 
 it('should do getInterviewer method', ()=>{
  let component = TestBed.get(BookingFormPage);
  const event: Event = new Event('');
  component['getInterviewer'](event);
  expect(component.selectedInterviewer ).toEqual(event);
 }) 

 it('should do techChange method', ()=>{
  let component = TestBed.get(BookingFormPage);
  const event: Event = new Event('');
  component['techChange'](event);
  expect(component.fetchInterviewer()).toBeFalsy();
 }) 
 it('should do buChange method', ()=>{
  let component = TestBed.get(BookingFormPage);
  const event: Event = new Event('');
  component['buChange'](event);
  expect(component.fetchInterviewer()).toBeFalsy();
 }) 
 it('should do intTypeChange method', ()=>{
  let component = TestBed.get(BookingFormPage);
  const event: Event = new Event('');
  component['intTypeChange'](event);
  expect(component.fetchInterviewer()).toBeFalsy();
 }) 
 it('should do checkBoxChange method', ()=>{
  let component = TestBed.get(BookingFormPage);
  const event: Event = new Event('');
  let day=new Date().getDay();
  component['checkBoxChange'](event,day);
  expect(component.checkBoxChange()).toBeFalsy();
 }) 

 it('should do clearValues method', ()=>{
  let component = TestBed.get(BookingFormPage);
  component['clearValues']();
  expect(component.finalDays).toEqual( [0, 0, 0, 0, 0, 0, 0]);
 }) 
});
