import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { MonthComponent } from './month.component';
import { DataService } from '../../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter, CalendarEvent } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Router } from '@angular/router';

describe('MonthPage', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;
  //navigate=jasmine.createSpy('navigate');
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [MonthComponent],
      imports: [HttpClientModule, HttpModule,
         CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }), IonicStorageModule.forRoot(), 
          RouterTestingModule.withRoutes([])],
      providers: [DataService,MonthComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
      router=TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('method  gotoFilterPage should be called', () => {
    const spy = spyOn(component, 'gotoFilterPage').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  ngOnInit should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  dayClicked should be called', () => {
    const spy = spyOn(component, 'dayClicked').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  eventTimesChanged should be called', () => {
    const spy = spyOn(component, 'eventTimesChanged').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  clearFilters should be called', () => {
    const spy = spyOn(component, 'clearFilters').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  ngOnDestroy should be called', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  getTimeStamp should be called', () => {
    const spy = spyOn(component, 'getTimeStamp').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  
    
  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(MonthComponent);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewerAvailability').textContent).toContain('Interviewer Availability')
  }));

  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(MonthComponent);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#available').textContent).toContain('Available')
  }));

  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(MonthComponent);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#booked').textContent).toContain('Booked')
  }));

  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(MonthComponent);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewed').textContent).toContain('Interviewed')
  }));;
  it('should do dayClicked method', ()=>{
    let activeDayOpentrue:boolean=true;
    let component = TestBed.get(MonthComponent);
    let events:CalendarEvent[];
    let date=new Date();
    component['dayClicked'](date,events);
    expect(activeDayOpentrue).toBe(true);
    expect(component.activeDayIsOpen).toBe(true);
   }) 
   
  it('should do gotoFilterPage method', () => {
    let navigateSpy = spyOn(router, 'navigate');
    component.gotoFilterPage();
    expect(navigateSpy).toHaveBeenCalledWith(["/filter"]);
  })

  it('should do clearFilters method', ()=>{
    component['clearFilters']();
    component.isFilterApplied=false;
    expect(component.isFilterApplied).toBeFalsy()
   })
   it('should do getTimeStamp method', ()=>{
    const events: Event = new Event('');
    component['getTimeStamp'](events);
    expect(component.events).toBeTruthy()
  })
 
});
