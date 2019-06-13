import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BookingEvent } from './../../../Shared/dataModal/bookingSlot.modal';
import { DataService } from './../../../services/data.service';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Storage } from '@ionic/storage';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.page.html',
  styleUrls: ['./booking-view.page.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class BookingViewPage implements OnInit, OnDestroy {
  currentSlotInfo: BookingEvent[];
  allSlotInfo: BookingEvent[];
  currentDay: string;
  currentDate: number;
  dateModel: string = "March";
  fetchSlotAccordingToSelectedDate = [];
  date = new FormControl(new Date());
  selectedDateFromCalendar: string;
  yesterdayDate: Date = new Date((new Date().setDate(new Date().getDate() - 1)));
  isPastDate: boolean = false;
  isInterviewer: boolean = false;
  isRecruiter: boolean = false;
  availableSlotCount: number = 0;
  bookedSlotCount: number = 0;
  interviewedSlotCount: number = 0;
  panelAvailabilitSlotCount: number = 0;
  deleteSubscription: Subscription;
  bookingViewSubscription: Subscription;
  refreshSubscriptionBookingForm: Subscription;
  role: string;
  selectedDateObjectFromCalendar: {
    date: number,
    month: number,
    year: number
  }
  constructor(private data: DataService,
    private router: Router,
    private storage: Storage,
  ) {

    this.role = localStorage.getItem("role");
    // storage.get('role').then((val) => {
    console.log('Your role is : ', this.role);
    if (this.role === "Interviewer") {
      this.isInterviewer = true;
      this.isRecruiter = false;
    } else if (this.role === "Recruiter") {
      this.isRecruiter = true;
      this.isInterviewer = false;
    }
    // });
  }

  ngOnInit() {
    this.refreshSubscriptionBookingForm = this.data.refreshSubjectFromBookingForm.subscribe(res => {
      console.log("data from booking form is", res);
      if (res.flag === 'bookingView') {
        this.dateChanged(res.date, "fromBookingForm");
      }
    });


    this.deleteSubscription = this.data.deleteSlotSubject.subscribe(res => {
      console.log("delete res is", res);
      if (res.flag === 'delete') {
        this.availableSlotCount = 0;
        res.data.forEach(slot => {
          if (!slot.isBooked) {
            this.availableSlotCount = this.availableSlotCount + 1;
          }
        });
      }
    });

    this.bookingViewSubscription = this.data.slotSubject.subscribe((res: BookingEvent[]) => {
      console.log(res);
      this.currentSlotInfo = res;

      this.commonSlotCounter(this.currentSlotInfo);

      if (this.currentSlotInfo.length !== 0) {
        this.commonSetDayandDate(this.currentSlotInfo);
        this.selectedDateFromCalendar = this.bookingviewcommonDateFormatter(this.currentSlotInfo[0].start);
        this.selectedDateObjectFromCalendar = null;
        this.date.setValue(this.currentSlotInfo[0].start);

      } else {
        this.data.selectedDateSubject.subscribe((date: Date) => {
          console.log(date);
          this.selectedDateFromCalendar = this.bookingviewcommonDateFormatter(date);
          this.selectedDateObjectFromCalendar = null;
          this.date.setValue(date);

        });
      }
    });

    this.allSlotInfo = this.data.events;
  }

  dateChanged(event, incomingFlag?) {
    console.log(event);
    console.log(incomingFlag);

    this.allSlotInfo = this.data.events;
    this.fetchSlotAccordingToSelectedDate = [];
    if (this.allSlotInfo.length !== 0) {
      this.allSlotInfo.forEach(allSlot => {
        if (incomingFlag === 'fromBookingForm') {
          if (this.bookingviewcommonDateFormatter(allSlot.start) === this.bookingviewcommonDateFormatter(event)) {
            this.fetchSlotAccordingToSelectedDate.push(allSlot);
            this.date.setValue(event);
          }
        } else {
          if (this.bookingviewcommonDateFormatter(allSlot.start) === this.bookingviewcommonDateFormatter(event.value._d)) {
            this.fetchSlotAccordingToSelectedDate.push(allSlot);
            this.date.setValue(event.value._d);
          }
        }
      });
      console.log(this.fetchSlotAccordingToSelectedDate);
    }

    this.commonSlotCounter(this.fetchSlotAccordingToSelectedDate);
    this.data.slotSubject.next(this.fetchSlotAccordingToSelectedDate);

    if (this.fetchSlotAccordingToSelectedDate.length !== 0) {
      this.currentSlotInfo = this.fetchSlotAccordingToSelectedDate;
      this.commonSetDayandDate(this.currentSlotInfo);
    } else {
      this.currentDay = null;
      this.currentDate = null;
      this.currentSlotInfo = [];
    }
    if (incomingFlag === 'fromBookingForm') {
      this.selectedDateFromCalendar = this.bookingviewcommonDateFormatter(event);
      this.selectedDateObjectFromCalendar = null;
      this.date.setValue(event);
    } else {
      this.selectedDateFromCalendar = this.bookingviewcommonDateFormatter(event.value._d);
      this.selectedDateObjectFromCalendar = event.value._i;
      this.date.setValue(event.value._d);
    }
  }

  commonSlotCounter(data) {
    this.availableSlotCount = 0;
    this.bookedSlotCount = 0;
    this.interviewedSlotCount = 0;
    this.panelAvailabilitSlotCount = 0;

    data.forEach(slot => {
      if (slot.isBooked) {
        if (slot.feedbackStatus !== "" && slot.feedbackStatus !== undefined && slot.feedbackStatus !== null) {
          this.interviewedSlotCount = this.interviewedSlotCount + 1;
        } else {
          this.bookedSlotCount = this.bookedSlotCount + 1;
        }
      } else {
        if (slot.interviewerRequired) {
          this.panelAvailabilitSlotCount = this.panelAvailabilitSlotCount + 1;

        } else {
          this.availableSlotCount = this.availableSlotCount + 1;
        }
      }
    });
  }

  dateClass = (d: Date) => {
    let classValue = "";
    let counter = 0;
    if (this.allSlotInfo.length !== 0) {
      this.allSlotInfo.forEach(slot => {
        if (slot.start.getDate() === d["_i"].date && slot.start.getMonth() === d["_i"].month && slot.start.getFullYear() === d["_i"].year) {
          counter++;
        }
      });
      if (counter >= 1) {
        classValue = 'example-custom-date-class';
      } else {
        classValue = "";
      }
    }
    return classValue
  }


  gotoBookingForm(slotInfo?) {
    console.log("slotInfo", slotInfo);
    console.log("this.selectedDateFromCalendar", this.selectedDateFromCalendar);

    let value = this.selectedDateFromCalendar.split("-");
    let monthNumber: number;
    this.data.months.forEach((month, index) => {
      if (month === value[1]) {
        monthNumber = index;
      }
    });
    let year = Number(value[2]);
    let date = Number(value[0]);
    let selectedDate = new Date(year, monthNumber, date);
    console.log(selectedDate);
    this.router.navigate(["/booking-form"]);
    this.data.setBookingDataForBookingForm({
      dateInString: this.selectedDateFromCalendar,
      dateInObject: this.selectedDateObjectFromCalendar,
      date: selectedDate,
      slotInfo: slotInfo
    });
  }

  commonSetDayandDate(data) {
    if (data.length !== 0) {
      this.currentDay = this.fetchWeekDaybyNumber(data[0].start.getDay());
      this.currentDate = data[0].start.getDate();
    }
  }

  bookingviewcommonDateFormatter(dateInput: Date) {
    let date;
    let month;
    let year;
    let totalString;
    this.isPastDate = dateInput.getTime() > this.yesterdayDate.getTime();

    date = dateInput.getDate();
    month = dateInput.getMonth();
    year = dateInput.getFullYear();
    totalString = `${date}-${this.bookingviewfetchMonthbyNumber(month)}-${year}`;
    return totalString;
  }

  fetchWeekDaybyNumber(number) {
    let day = "";
    switch (number) {
      case 0:
        day = "Sun";
        break;
      case 1:
        day = "Mon";
        break;
      case 2:
        day = "Tue";
        break;
      case 3:
        day = "Wed";
        break;
      case 4:
        day = "Thur";
        break;
      case 5:
        day = "Fri";
        break;
      case 6:
        day = "Sat";
        break;
    }
    return day;
  }


  bookingviewfetchMonthbyNumber(number) {
    return this.data.commonMonth(number)
  }

  ngOnDestroy() {
    // this.data.slotSubject.complete();
    this.deleteSubscription.unsubscribe();
    this.bookingViewSubscription.unsubscribe();
    this.refreshSubscriptionBookingForm.unsubscribe();
  }
}
