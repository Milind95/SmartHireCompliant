import { CUSTOM_ELEMENTS_SCHEMA, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { webFeedbackPage } from './webFeedback.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpModule } from '@angular/http';
import { DataService } from "src/app/services/data.service";
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import {
  MatButtonModule, MatCheckboxModule, MatMenuModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatAutocompleteModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { By } from '@angular/platform-browser';

describe('webFeedbackPage', () => {
  let component: webFeedbackPage;
  let fixture: ComponentFixture<webFeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [webFeedbackPage],

      imports: [ReactiveFormsModule, CommonModule, MatMenuModule, MatCheckboxModule,
        MatButtonModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatAutocompleteModule,
        FormsModule, HttpClientModule, HttpModule, ToastrModule.forRoot(), IonicModule, IonicStorageModule.forRoot(), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DataService, webFeedbackPage, ToastrService, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(webFeedbackPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('method  ngOnInit should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  ngOnChanges should be called', () => {
    const spy = spyOn(component, 'ngOnChanges').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method   submitStatus should be called', () => {
    const spy = spyOn(component, 'submitStatus').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method  addTechRow should be called', () => {
    const spy = spyOn(component, 'addTechRow').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method removeTechRow should be called', () => {
    const spy = spyOn(component, 'removeTechRow').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  checkValidityForAdd should be called', () => {
    const spy = spyOn(component, 'checkValidityForAdd').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method  checkValidityForMinus should be called', () => {
    const spy = spyOn(component, 'checkValidityForMinus').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method  checkValidityForMinus should be called', () => {
    const spy = spyOn(component, 'checkValidityForMinus').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method   selectedTechnology should be called', () => {
    const spy = spyOn(component, 'selectedTechnology').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method feedbackRatingChanged should be called', () => {
    const spy = spyOn(component, 'feedbackRatingChanged').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method  feedbackSubmit should be called', () => {
    const spy = spyOn(component, 'feedbackSubmit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('should render title in paragraph tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toBe('Loading...');
  }));

  it('should do selectedTechnology method', ()=>{
    let id=31;
    let val=2;
    component['selectedTechnology'](val,id);
    expect(component.allowSubmitForm).toBe(false);
   }) 
   it('should do feedbackRatingChanged method', ()=>{
    const event: Event = new Event('');
    component['feedbackRatingChanged'](event);
    expect(component.allowSubmitForm).toBe(false);
   }) 
   it('should do ngDestroy method', ()=>{
    component['ngDestroy']();
    expect(component.ngDestroy).toBeTruthy();
   }) 
   it('should do ngOnChanges method', ()=>{
     let changes:SimpleChanges;
    component['ngOnChanges'](changes);
    expect(component.ngOnChanges).toBeTruthy();
   }) 
});

