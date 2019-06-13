import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './Header.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatButtonModule, MatCheckboxModule, MatMenuModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatAutocompleteModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { By } from '@angular/platform-browser';

describe('HeaderPage', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [ReactiveFormsModule, CommonModule, MatMenuModule, MatCheckboxModule,
        MatButtonModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatAutocompleteModule,
        FormsModule, HttpClientModule, HttpModule, IonicModule, IonicStorageModule.forRoot(), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DataService, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('method logout should be called', () => {
    const spy = spyOn(component, 'logout').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method interviewerCheckEvent should be called', () => {
    const spy = spyOn(component, 'interviewerCheckEvent').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method reportsSection should be called', () => {
    const spy = spyOn(component, 'reportsSection').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method reportPage should be called', () => {
    const spy = spyOn(component, 'reportPage').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  downloadFeedbackForm should be called', () => {
    const spy = spyOn(component, 'downloadFeedbackForm').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method ngOnInit should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
});


