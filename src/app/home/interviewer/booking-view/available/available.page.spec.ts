import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material';
import { AvailablePage } from './available.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BookingEvent } from 'src/app/Shared/dataModal/bookingSlot.modal';

describe('AvailablePage', () => {
  let component: AvailablePage;
  let fixture: ComponentFixture<AvailablePage>;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule,
        RouterTestingModule.withRoutes([]), IonicStorageModule.forRoot(), MatExpansionModule, HttpModule, HttpClientModule, RouterModule, IonicModule],
      declarations: [AvailablePage],
      providers: [DataService, AvailablePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
      .compileComponents();
    router = TestBed.get(Router);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePage);
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
  })
  it('method ngOnDestroy  should be called', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method setStep  should be called', () => {
    const spy = spyOn(component, 'setStep').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method gotoBookingForm  should be called', () => {
    const spy = spyOn(component, 'gotoBookingForm').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method goToFeedback  should be called', () => {
    const spy = spyOn(component, 'goToFeedback').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method reschedule should be called', () => {
    const spy = spyOn(component, 'reschedule').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method delete should be called', () => {
    const spy = spyOn(component, 'delete').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method presentActionSheet should be called', () => {
    const spy = spyOn(component, 'presentActionSheet').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method toasterNotification should be called', () => {
    const spy = spyOn(component, 'toasterNotification').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('should do setStep method', () => {
    let component = TestBed.get(AvailablePage);
    const index = Number;
    component['setStep'](index);
    expect(component.step).toEqual(index);
  })
  it('should do gotoBookingForm method', () => {
    let navigateSpy = spyOn(router, 'navigate');
    component.gotoBookingForm();
    expect(navigateSpy).toHaveBeenCalledWith(["/booking-form"]);
  })
  it('should do goToFeedback method', () => {
    let navigateSpy = spyOn(router, 'navigate');
    component.goToFeedback();
    expect(navigateSpy).toHaveBeenCalledWith(["/feedback"]);
    console.log("component.allSlotInfo", component.allSlotInfo)

  });
  it('should do selectSlot method', () => {
    let component = TestBed.get(AvailablePage);
    component['selectSlot']();
    component.deleteAll = true;
    expect(component.isDeleteSelect).toBeTruthy();
  })
 fit("should do selectSlot method",() => {
  let component = TestBed.get(AvailablePage); 
   let slot=
             {
            id:3,
            start: 1560341318,
            end:1560561318 ,
            title: "",
            color: "grey",
            buId: 1,
            candidateName: "Sreelekha",
            technologyName: "Angular",
            technologyId: 2,
            interviewTypeName: "Telephonic",
            interviewTypeId: 1,
            interviewerName:"Milind",
            interviewerEmpId: 1610172,
            interviewerEmail: "milind.rohokale@capgemini.com",
            interviewerGrade:"A5",
            interviewerLocation: "",
            interviewerSkills: "",
            participationType: 1,
            isBooked: true,
            calendarId:14452,
            feedbackStatus: "Good",
            recruiterName: "Vasu Sharma",
            comments: "Code coverage is decreasing",
            organization:"AppsNa-BU",
            interviewerRequired: false,
            timestamp:1560341318 ,
            availableCount: 10,
            bookedCount: 4,
            interviewedCount: 3,
            interviewerAvailabilityCount: 8,
            isDeleteSelect:true
          }
  component['selectSlot'](slot);
  component.deleteAll=true;
  expect(slot.isDeleteSelect).toBe(slot.isDeleteSelect)
}) 

// fit("should do deleteSelectedSlots method",() => {
//   let component = TestBed.get(AvailablePage); 
//    let slot=
//              {
//             id:3,
//             start: 1560341318,
//             end:1560561318 ,
//             title: "",
//             color: "grey",
//             buId: 1,
//             candidateName: "Sreelekha",
//             technologyName: "Angular",
//             technologyId: 2,
//             interviewTypeName: "Telephonic",
//             interviewTypeId: 1,
//             interviewerName:"Milind",
//             interviewerEmpId: 1610172,
//             interviewerEmail: "milind.rohokale@capgemini.com",
//             interviewerGrade:"A5",
//             interviewerLocation: "",
//             interviewerSkills: "",
//             participationType: 1,
//             isBooked: true,
//             calendarId:14452,
//             feedbackStatus: "Good",
//             recruiterName: "Vasu Sharma",
//             comments: "Code coverage is decreasing",
//             organization:"AppsNa-BU",
//             interviewerRequired: false,
//             timestamp:1560341318 ,
//             availableCount: 10,
//             bookedCount: 4,
//             interviewedCount: 3,
//             interviewerAvailabilityCount: 8,
//             isDeleteSelect:true
//           }
//   component['deleteSelectedSlots']();
//   component.deleteCalendarIdArray=[];
//   slot.isDeleteSelect=true;
//   expect(slot.isDeleteSelect).toBe(true);
//   component.deleteCalendarIdArray.push(slot.calendarId);
//   expect(component.deleteCalendarIdArray).toContain(slot.calendarId);
//   component.deleteSelectedArray=[];
//   expect(component.deleteSelectedArray).toBeUndefined();
//   let spy = spyOn(component, 'presentActionSheetForMultipleDelete');
//   component.presentActionSheetForMultipleDelete(component.deleteCalendarIdArray);
//   expect(spy).toBeDefined();

// }) 
});



