import { BookingEvent } from './../../../Shared/dataModal/bookingSlot.modal';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
// import { LoaderMobileService } from '../../../services/loader-mobile.service';

const colors: any = {
  green: {
    primary: 'rgba(102, 204, 153, 0.988235294117647)',
    name: "green"
  },
  pink: {
    primary: 'rgba(255, 102, 102, 0.588235294117647)',
    name: "pink"
  },
  grey: {
    primary: 'rgba(128,128,128)',
    name: "grey"
  },
  yellow: {
    primary: '#ffc107',
    name: "yellow"
  }
};
@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit, OnDestroy {
  loading: any;
  isFilterApplied: boolean = false;
  isInterviewer: boolean = false;
  isRecruiter: boolean = false;
  buArray = [];
  technologyArray = [];
  replicateEvents = [];
  email: any;
  role: any;
  devWidth: any;
  intSubscription: Subscription;
  recSubscription: Subscription;
  prevSubscription: Subscription;
  nextSubscription: Subscription;
  todaySubscription: Subscription;
  filterSubscription: Subscription;
  panelAvailabilitySubscription: Subscription;
  filterCount: number;
  todayDate: Date = new Date((new Date().setDate(new Date().getDate() - 1)));
  constructor(
    private platform: Platform,
    private data: DataService,
    public alertController: AlertController,
    private storage: Storage,
    private router: Router) {

    this.devWidth = this.platform.width();

    this.data.roleSubject.subscribe(role => {
      console.log('Your role from onservable is : ', role);
      if (role === "Interviewer") {
        this.isInterviewer = true;
        this.isRecruiter = false;
      } else if (role === "Recruiter") {
        this.isRecruiter = true;
        this.isInterviewer = false;
      }
    })
  }
  ngOnInit() {
    console.log("ngOnInIt of month component");
    if (this.devWidth < 768) {
      this.data.setHeaderDate({
        viewDate: new Date()
      })
    }

    this.prevSubscription = this.data.prevSubject.subscribe(res => {
      console.log(res);
      this.viewDate = res.viewDate;
    });
    this.nextSubscription = this.data.nextSubject.subscribe(res => {
      console.log(res);
      this.viewDate = res.viewDate;
    });
    this.todaySubscription = this.data.todaySubject.subscribe(res => {
      console.log(res);
      this.viewDate = res.viewDate;
    });
    this.filterSubscription = this.data.filterSubject.subscribe(res => {
      console.log(res);
      if (res.filter) {
        this.isFilterApplied = true;
        this.filterCount = res.filterCount;
      } else {
        this.isFilterApplied = false;
      }
    });
    this.panelAvailabilitySubscription = this.data.isIntAvailableEmitter.subscribe(res => {
      console.log(res);
      if (res.flag) {
        this.events = this.data.events;
        console.log("Recruiter slots", this.events);
      }

    });

    this.events = [];
    this.email = localStorage.getItem("email");
    // this.storage.get('email').then((val) => {
    //   console.log('Your email is', val);
    //   this.email = val;
    // });

    this.role = localStorage.getItem("role");

    // this.storage.get('role').then((val) => {
    console.log('Your role is', this.role);

    // this.role = val;
    if (this.role === 'Interviewer') {
      this.isRecruiter = false;
      if (this.devWidth < 768) {
        this.intSubscription = this.data.eventEmitterForEventInterviewer.subscribe(res => {
          if (res.flag) {
            this.events = this.data.events;
            console.log("Interviewer slots", this.events);
          }
        });
        this.data.getAllInterviewerSlots();
      }
    } else {
      this.isRecruiter = true;

      if (this.devWidth < 768) {
        this.recSubscription = this.data.eventEmitterForEventRecruiter.subscribe(res => {
          if (res.flag) {
            this.events = this.data.events;
            console.log("Recruiter slots", this.events);
            this.replicateEvents = this.data.events;
          }
        });
        if (!this.isFilterApplied) {
          this.data.getAllRecruitersSlots();
        }
      }
    }

    // });

  }

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();
  events: BookingEvent[] = [];

  activeDayIsOpen: boolean = true;


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // async presentLoadingWithOptions() {
  //   this.loading = await this.loadingController.create({
  //     spinner: "dots",
  //     translucent: false,
  //     showBackdrop: true,
  //     cssClass: 'custom-class custom-loading'
  //   });
  //   return await this.loading.present();
  // }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    // this.presentAlert();
    // this.presentLoadingWithOptions();

    console.log("clicked", date, events);

    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
    setTimeout(() => {
      // this.loading.dismiss();
      this.router.navigate(["/booking-view"]);
      this.data.setSlotInfo(events, date);
      this.data.deleteSlot({
        flag: "",
        data: []
      });
      this.data.setRefreshDataFromBookingForm({
        flag: "monthView"
      })
    }, 500);

  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    // this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  gotoFilterPage() {
    this.router.navigate(["/filter"]);
  }

  clearFilters() {
    this.isFilterApplied = false;
    this.data.getAllRecruitersSlots();
  }

  ngOnDestroy() {
    if (this.role === 'Interviewer' && this.devWidth < 768) {
      this.intSubscription.unsubscribe();
    } else if (this.role === 'Recruiter' && this.devWidth < 768) {
      this.recSubscription.unsubscribe();
    }

    this.prevSubscription.unsubscribe();
    this.nextSubscription.unsubscribe();
    this.todaySubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.panelAvailabilitySubscription.unsubscribe();

    this.filterSubscription.unsubscribe();
    // this.data.eventEmitterForEventInterviewer.complete();
    // this.data.eventEmitterForEventRecruiter.complete();

    // this.data.roleSubject.complete();
  }

  getTimeStamp(data) {
    console.log(data);
  }

}
