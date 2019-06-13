import { BookingEvent } from './../../Shared/dataModal/bookingSlot.modal';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { AlertController, PopoverController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MonthComponent } from './month/month.component';
import { MenuItem } from 'primeng/api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookingDialogComponent } from '../../Shared/components/booking-dialog/booking-dialog.component';
import { Storage } from '@ionic/storage';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { LoaderMobileService } from '../../services/loader-mobile.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer.page.html',
  styleUrls: ['./interviewer.page.scss'],
})
export class InterviewerPage implements OnInit, OnDestroy {
  // private modal: NgbModal
  items: MenuItem[];
  buArray = [];
  technologyArray = [];
  marketUnitArray = [];
  accountArray = [];
  replicateEvents = [];
  pastDateDialog: boolean = false;
  email: any;
  role: any;
  recuiterFlag: boolean = true;
  check: any;
  devWidth: any;
  intSubscription: Subscription;
  recSubscription: Subscription;

  todayDate: Date = new Date((new Date().setDate(new Date().getDate() - 1)));
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: BookingEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private data: DataService,
    private platform: Platform,
    public alertController: AlertController,
    private router: Router,
    public popoverController: PopoverController,
    public dialog: MatDialog,
    private storage: Storage,
    private toastr: ToastrService,
    private menu: MenuController,
    public loader: LoaderMobileService,
    private spinner: NgxSpinnerService) {
    this.devWidth = this.platform.width();
    this.email = localStorage.getItem("email");
    // this.storage.get('email').then((val) => {
    //   this.email = val;
    // });
  }

  ngOnInit() {
    console.log("this.devWidth",this.devWidth);
    // if (this.devWidth > 768) {
    //   this.menu.enable(true, 'mobile');
    //   this.menu.open('mobile');
    // }

    // if(this.devWidth < 768){
    //   this.loader.show("Please Wait ..!!")
    // }
    this.events = [];
    this.role = localStorage.getItem("role");
    // this.storage.get('role').then((val) => {
    // this.role = val;
    this.spinner.show();
    if (this.role === 'Interviewer') {
      this.recuiterFlag = false;
      if (this.devWidth >= 768) {
        this.intSubscription = this.data.eventEmitterForEventInterviewer.subscribe(res => {
          if (res.flag) {
            console.log("this.data",this.data);
            this.events = this.data.events;
            console.log("Interviewer slots", this.events);
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 2000)
        });
        this.data.getAllInterviewerSlots();
      }
    } else {
      this.recuiterFlag = true;

      if (this.devWidth >= 768) {
        this.recSubscription = this.data.eventEmitterForEventRecruiter.subscribe(res => {
          if (res.flag) {
            this.events = this.data.events;
            console.log("Recruiter slots", this.events);
            this.replicateEvents = this.data.events;
            if(this.data.isPanelAvailability){
              this.data.setPanelAvailability(true);
            }
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 2000)
        });
        this.data.getAllRecruitersSlots();
      }
    }

    // });
    if (this.devWidth >= 768) {
      this.data.isIntAvailableEmitter.subscribe(res => {
        if (res.flag) {
          this.events = this.data.events;
          this.toastr.success('', 'Interviewers Success');
        } else {
          this.events = this.replicateEvents;
          this.toastr.warning('', 'Interviewers not Found !!');
        }
        console.log("total Filtered Result is", this.events);
        this.spinner.hide();
      });

      this.data.eventEmitterFormenuFilter.subscribe(res => {
        this.events = this.replicateEvents.map(event => {
          return {
            ...event,
            interviewerAvailabilityCount: 0
          }
        });
      })

    }

    this.data.feedbackSuccessEmitter.subscribe(res => {
      if (res.flag) {
        this.spinner.show();
        this.data.getAllInterviewerSlots();
      }
    })

    this.data.viewSubject.subscribe(res => {
      switch (res.key) {
        case "month":
          this.view = CalendarView.Month;
          break;
        case "week":
          this.view = CalendarView.Week;
          break;
        case "day":
          this.view = CalendarView.Day;
          break;
      }
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK'],
      cssClass: 'alertWidth',
    });

    await alert.present();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

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

    if (new Date(date).getTime() >= new Date().getTime() || (new Date(date).getDate() === new Date().getDate() &&
      new Date(date).getMonth() === new Date().getMonth() && new Date(date).getFullYear() === new Date().getFullYear())) {
      // if (events.length !== 0)
      this.pastDateDialog = false;
      this.openBookingDialog(date, events);
    } else {
      this.pastDateDialog = true;
      if (events.length !== 0)
        this.openBookingDialog(date, events);
    }
  }


  openBookingDialog(date, events) {
    let width = "";
    let height = "";
    let dialogClose: boolean = false;
    if (this.pastDateDialog) {
      if (events.length !== 0) {
        width = "600px";
        height = "585px";
      }
      dialogClose = false;
    } else {
      if (events.length !== 0) {
        width = "1000px";
        height = "600px";
      }
      else {
        width = "500px";
        height = "auto";
      }
      dialogClose = true;
    }

    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: width,
      height: height,
      disableClose: dialogClose,
      autoFocus: true,
      hasBackdrop: true,
      data: {
        date: date,
        events: events,
        email: this.email
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Interviewersuccess') {
        this.spinner.show();
        this.data.getAllInterviewerSlots();
      }
      else if (result === 'Recruitersuccess') {
        this.spinner.show();
        this.data.getAllRecruitersSlots();
      }
      else if (result) {
        if (this.devWidth >= 768) {
          this.router.navigate(['/webFeedback']);
        }
      }
    });
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


  triggerPrevForMobile(event) {
    this.data.setPrevData({
      viewDate: this.viewDate
    })
  }
  triggerNextForMobile(event) {
    this.data.setNextData({
      viewDate: this.viewDate
    })
  }
  triggerTodayForMobile(event) {
    this.data.setTodayData({
      viewDate: this.viewDate
    })
  }

  getEvents(events) {
    console.log(events);
  }

  getTimeFromDatein12HoursFormat(date: Date) {
    let timeInAmPmFormat: string = "";
    let time = date.getHours();
    let minutes = date.getMinutes() === 0 ? "00" : date.getMinutes();
    if (time > 12) {
      timeInAmPmFormat = (time - 12).toString() + ":" + minutes + " " + "PM"
    } else if (time === 12) {
      timeInAmPmFormat = "12" + ":" + minutes + " " + "PM"
    } else {
      timeInAmPmFormat = (time).toString() + ":" + minutes + " " + "AM"
    }
    return timeInAmPmFormat;
  }

  slotBasedClass(event) {
    if (event.isBooked) {
      if (event.feedbackStatus != null) {
        return 'eventClassInterviewed';
      }
      else {
        return 'eventClassBooked';
      }
    }
    else {
      if (event.interviewerRequired) {
        return 'interviewerClass';
      }
      return 'eventClassAvailable';
    }

  }

  ngOnDestroy() {
    console.log("role in ngDestroyed of Interviewer", this.role);

    if (this.role === 'Interviewer' && this.devWidth >= 768) {
      this.intSubscription.unsubscribe();
    } else if (this.role === 'Recruiter' && this.devWidth >= 768) {
      this.recSubscription.unsubscribe();
    }
    // this.data.eventEmitterForEventInterviewer.complete();
    // this.data.eventEmitterForEventRecruiter.complete();
    this.data.clearLoginInfo({
      flag: true
    });
    this.data.viewSubject.complete();
  }
}
