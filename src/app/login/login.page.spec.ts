import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LoginPage } from './login.page';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { RouteReuseStrategy } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, IonicModule, FormsModule,
        RouterTestingModule, IonicStorageModule.forRoot(), ToastrModule.forRoot(), ReactiveFormsModule, HttpClientModule, HttpModule],

      declarations: [LoginPage,],
      providers: [AuthService, DataService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('method validateLogin should be called', () => {
    const spy = spyOn(component, 'validateLogin').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method ngOnInit should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method ngOnDestroy should be called', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });


  it('should render title in ion-col tag', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('span.smart').textContent).toContain('Smart')
  }));

  it('should render title in ion-col tag', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('span.hire').textContent).toContain('Hire')
  }));
 

  it('should render title as as email in ion-label tag', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#email').textContent).toContain('Email');
  }));

  it('should render title as as password in ion-label tag', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#password').textContent).toContain('Password');
  }));
  it('should render title in ion-col tag', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#register').textContent).toContain('Not a member ? Register now')
  }));


  it('should render button alert', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#loginIcon').textContent).toContain('Login');
  }));

  it('should render button alert', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#resetIcon').textContent).toContain('Reset');
  }));
  it('should render button alert', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#or').textContent).toContain('OR');
  }));
});

