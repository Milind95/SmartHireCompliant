import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InterviewedPage } from './interviewed.page';
import { MatExpansionModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';

describe('InterviewedPage', () => {
  let component: InterviewedPage;
  let fixture: ComponentFixture<InterviewedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterTestingModule,
        IonicStorageModule.forRoot(), MatExpansionModule, HttpModule, HttpClientModule, RouterModule, IonicModule],
      declarations: [InterviewedPage],
      providers: [DataService,InterviewedPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('method ngOnInit should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method ngOnDestroy  should be called', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
 
  it('method  goToFeedback  should be called', () => {
    const spy = spyOn(component, 'goToFeedback').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  
});
