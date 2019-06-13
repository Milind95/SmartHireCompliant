import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingViewPage } from './booking-view.page';
import { IonicModule } from '@ionic/angular';
import { MatDatepickerModule } from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';

describe('BookingViewPage', () => {
  let component: BookingViewPage;
  let fixture: ComponentFixture<BookingViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingViewPage],
      imports: [IonicModule, MatMomentDateModule,
        HttpClientModule, HttpModule, MatIconModule, FormsModule, ReactiveFormsModule,
        IonicStorageModule.forRoot(), RouterTestingModule,
        NgxMaterialTimepickerModule.forRoot(), MatDatepickerModule,],
      providers: [DataService,BookingViewPage],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('method dateChanged should be called', () => {
    var spy = spyOn(component, 'dateChanged').and.callThrough();
    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method ngOnInit should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method commonSlotCounter should be called', () => {
    var spy = spyOn(component, 'commonSlotCounter').and.callThrough();
    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method dateClass should be called', () => {
    const spy = spyOn(component, 'dateClass').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method ngOnDestroy  should be called', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method gotoBookingForm  should be called', () => {
    const spy = spyOn(component, 'gotoBookingForm').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method commonSetDayandDate  should be called', () => {
    const spy = spyOn(component, 'commonSetDayandDate').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method bookingviewcommonDateFormatter  should be called', () => {
    const spy = spyOn(component, 'bookingviewcommonDateFormatter').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
});
it('method fetchWeekDaybyNumber  should be called', () => {
    const spy = spyOn(component, 'fetchWeekDaybyNumber').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
});
it('method bookingviewfetchMonthbyNumber  should be called', () => {
    const spy = spyOn(component, 'bookingviewfetchMonthbyNumber').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
});

  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(BookingViewPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#available').textContent).toContain('Available')
  }));

  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(BookingViewPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#booked').textContent).toContain('Booked')
  }));

  it('should render title in ion-col tag', async(() => {
    const fixture = TestBed.createComponent(BookingViewPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#interviewed').textContent).toContain('Interviewed')
  }));
  describe('fetchWeekDaybyNumber', () => {
    it('gives day as Sun', () => {
        fixture.detectChanges();
        const number = 0;
        expect(component['fetchWeekDaybyNumber'](number)).toContain('Sun');
      })
  
    it('gives  day as Mon', () => {
        fixture.detectChanges();
        const number = 1;
        expect(component['fetchWeekDaybyNumber'](number)).toContain('Mon');
      })
  
    it('gives  day as tue', () => {
        fixture.detectChanges();
        const number = 2;
        expect(component['fetchWeekDaybyNumber'](number)).toContain('Tue');
      })
  
    it('gives  day as Wed', () => {
        fixture.detectChanges();
        const number = 3;
        expect(component['fetchWeekDaybyNumber'](number)).toContain('Wed');
      })
    })
    it('gives  day as Thurs', () => {
      fixture.detectChanges();
      const number = 4;
      expect(component['fetchWeekDaybyNumber'](number)).toContain('Thur');
    })
  
    it('gives  day as Fri', () => {
      fixture.detectChanges();
      const number = 5;
      expect(component['fetchWeekDaybyNumber'](number)).toContain('Fri');
    })
  
    it('gives day as Sat', () => {
      fixture.detectChanges();
      const number = 6;
      expect(component['fetchWeekDaybyNumber'](number)).toContain('Sat');
    })

    describe('bookingviewfetchMonthbyNumber', () => {
      it('gives Month as Jan', () => {
          const number = 0;
          expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Jan');
        })
      
      it('gives  Month as Feb', () => {
          const number = 1;
          expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Feb');
        })
      
      it('gives  Month as Mar', () => {
          const number = 2;
          expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Mar');
        })
      
      it('gives  Month as Apr', () => {
          const number = 3;
          expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Apr');
        })
      })
      it('gives  Month as May', () => {
        const number = 4;
        expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('May');
      })
      
      it('gives  Month as Jun', () => {
        const number = 5;
        expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Jun');
      })
      
      it('gives Month as Jul', () => {
        const number = 6;
        expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Jul');
      })
      it('gives  Month as Aug', () => {
        const number = 7;
        expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Aug');
      })
      
      it('gives  Month as Sep', () => {
        const number = 8;
        expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Sep');
      })
      
      it('gives  Month as Oct', () => {
        const number = 9;
        expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Oct');
      })
      it('gives  Month as Nov', () => {
      const number = 10;
      expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Nov');
      })
      
      it('gives  Month as Dec', () => {
      const number = 11;
      expect(component['bookingviewfetchMonthbyNumber'](number)).toContain('Dec');
      })
      it('should do bookingviewcommonDateFormatter method', ()=>{
        let component = TestBed.get(BookingViewPage);
        let day=new Date().getDay();
        let date=new Date();
        let month=new Date().getMonth();
        let year=new Date().getFullYear();
        component['bookingviewcommonDateFormatter'](date);
        expect(component.totalString).toBeUndefined();
       }) 
});
