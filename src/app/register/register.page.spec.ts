import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let service: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [FormsModule, BrowserModule, ReactiveFormsModule, MatSelectModule, MatInputModule,
        CommonModule, MatFormFieldModule, BrowserAnimationsModule,
        RouterTestingModule, IonicStorageModule.forRoot(), HttpClientModule, IonicModule, HttpModule, ToastrModule.forRoot()],
      providers: [DataService, RegisterPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('method validateRegistartion should be called', () => {
    const spy = spyOn(component, 'validateRegistartion').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method selectedRole should be called', () => {
    const spy = spyOn(component, 'selectedRole').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method selectedBU should be called', () => {
    const spy = spyOn(component, 'selectedBU').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method selectedMU should be called', () => {
    const spy = spyOn(component, 'selectedMU').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method ngOnInit should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('span.smart').textContent).toContain('Smart')
  });

  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('span.hire').textContent).toContain('Hire')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#fullName').textContent).toContain('Full Name')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#email').textContent).toContain('Email Id')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#employee').textContent).toContain('Employee Id')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#role').textContent).toContain('Role')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#location').textContent).toContain('Location')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#resetIcon').textContent).toContain('Reset')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#register').textContent).toContain('Register')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#or').textContent).toContain('OR')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#login').textContent).toContain('Already a member ? Login now')
  });
  it('Test Case for grade dropdown', (() => {
    const trigger = fixture.debugElement.query(By.css('.mat-select.grade')).nativeElement;
    trigger.click();
    fixture.detectChanges();
  }));
  it('Test Case for role dropdown', (() => {
    const trigger = fixture.debugElement.query(By.css('.mat-select.role')).nativeElement;
    trigger.click();
    fixture.detectChanges();
  }));

  it('Test Case for role dropdown', () => {
    let component = TestBed.get(RegisterPage);
    let register = {
      id: 1000,
      name: "Adhi",
      email: "adithya@capgemini.com",
      location: "Pune",
      grade: "A1",
      technology: ['NA'],
      role: "Recruiter",
      password: "parveen"
    }
    expect(register.role).toBe("Recruiter")
    let obj = [
      {
        id: register.id,
        name: register.name,
        email: register.email,
        location: register.location,
        grade: register.grade,
        technology: ['NA'],
        role: register.role,
        password: register.password
      }]
    expect(component.validateRegistartion).toBeDefined();
    expect(obj).toBeDefined();
    console.log("Object", obj[0]);
  });

  it('Test Case for role dropdown', () => {
    let component = TestBed.get(RegisterPage);
    let techArray = [];
    techArray.push("Angular");
    let register = {
      id: 1000,
      name: "akhil",
      email: "akhil@capgemini.com",
      location: "Mumbai",
      grade: "B1",
      technology: techArray,
      role: "Interviewer",
      password: "charishma",
      account: "HTech",
      marketUnit: "HTechAccount",
      organization: "Capgemini",
    }
    expect(register.role).toBe("Interviewer")

    let obj = [
      {
        id: register.id,
        name: register.name,
        email: register.email,
        location: register.location,
        grade: register.grade,
        technology: register.technology,
        role: register.role,
        password: register.password,
        account: register.account,
        marketUnit: register.marketUnit,
        organization: register.organization
      }]
    expect(component.validateRegistartion).toBeDefined();
    expect(obj).toBeDefined();
    console.log("Object", obj[0]);
  });


  it('Test Case for role dropdown', () => {
    let component = TestBed.get(RegisterPage);
    let service = TestBed.get(DataService);
    let bu = "AppsNA-CSD";
    let buId = 4;
    expect(bu).toBe("AppsNA-CSD");
    let selectedBU = spyOn(service, 'getMarketUnitByBu');
    service.getMarketUnitByBu(selectedBU);
    expect(selectedBU).toHaveBeenCalled();
    let buArray = [];
    component.buArray.push("AppsNA-CSD");
    console.log("Object", buArray[0]);
    expect(component.selectedBU).toBeDefined();
    expect(component.buArray[0]).toContain("AppsNA-CSD");
  });



  it('Test Case for role dropdown', () => {
    let component = TestBed.get(RegisterPage);
    let service = TestBed.get(DataService);
    let muId=1;
    let muArray=[];
    muArray.push(muId);
    expect(muId).toBe(1);
    // expect(muArray[0]).toContain(muId);
    let selectedMU = spyOn(service, 'getAccountByMu');
    service.getAccountByMu(selectedMU);
    expect(selectedMU).toHaveBeenCalled();
    let array = [];
    let mu = "HTech";
    expect(mu).toBe("HTech");
    array.push("HTech");
    console.log("Object", array[0]);
    expect(component.selectedMU).toBeDefined();
    expect(array[0]).toContain("HTech");

  });
  it('should do selectedTechnology method', ()=>{
    let tech="Angular"
    component['selectedTechnology'](tech);
    expect(component.selectedTechnology).toBeTruthy();
   }) 
   it('should do selectedRole method', ()=>{
    let role="Recruiter"
    component['selectedRole'](role);
    expect(component.selectedRole).toBeTruthy();
   }) 
});
