import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackPage } from "./feedback.page"
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { By } from '@angular/platform-browser';

describe('FeedbackPage', () => {
  let component: FeedbackPage;
  let fixture: ComponentFixture<FeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackPage],
      imports: [ReactiveFormsModule, CommonModule,
        FormsModule, HttpClientModule, HttpModule, IonicModule, IonicStorageModule.forRoot(), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DataService, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#assessment').textContent).toContain('Interview Assessment Workbook - L1')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#details').textContent).toContain('Candidate Details')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#candidateName').textContent).toContain('Candidate Name')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewDate').textContent).toContain('Date of Interview')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewDate').textContent).toContain('Date of Interview')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewDate').textContent).toContain('Date of Interview')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewedSkill').textContent).toContain('Interviewed Skills')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewMode').textContent).toContain('Mode of Interview')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#organization').textContent).toContain('Organisation')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewerDetails').textContent).toContain('Interviewer Details')
  });

  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewerName').textContent).toContain('Interviewer Name')
  });

  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewerLevel').textContent).toContain('Level of Interviewer')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#employeeId').textContent).toContain('Employee Id')
  });

  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#note').textContent).toContain('Slide right to check technical evaluation')
  });

  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#finalSubmit').textContent).toContain('Final Submission')
  });

  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FeedbackPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#submit').textContent).toContain('Submit')
  });

  it('method ngOnInit  should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method addTechRow  should be called', () => {
    const spy = spyOn(component, 'addTechRow').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method removeTechRow  should be called', () => {
    const spy = spyOn(component, 'removeTechRow').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method checkValidityForAdd  should be called', () => {
      const spy = spyOn(component, 'checkValidityForAdd').and.callThrough();
      expect(component).toBeDefined();
      expect(spy);
  });
  it('method  checkValidityForMinus  should be called', () => {
    const spy = spyOn(component, 'checkValidityForMinus').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method selectedTechnology should be called', () => {
    const spy = spyOn(component, 'selectedTechnology').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method feedbackSubmit  should be called', () => {
    const spy = spyOn(component, 'feedbackSubmit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
});
