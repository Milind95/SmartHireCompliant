import { Subscription } from 'rxjs';
import { BookingEvent } from './../../../../Shared/dataModal/bookingSlot.modal';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DataService } from '../../../../services/data.service';
import { Storage } from '@ionic/storage';
import { SharedData } from '../shared-data.model';

@Component({
  selector: 'app-interviewed',
  templateUrl: './interviewed.page.html',
  styleUrls: ['./interviewed.page.scss'],
})
export class InterviewedPage extends SharedData implements OnInit {
  allSlotInfo: BookingEvent[];
  userRole: string;
  currentDateTimeStamp = new Date().getTime();

  constructor(private data: DataService, private storage: Storage, private router: Router) {
    super(data,'green',router);
    this.userRole = localStorage.getItem("role");
  }

  ngOnInit() {
    this.allSlotInfo = this.data.events;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

  goToFeedback(slot) {
    let obj = {};
    if (this.userRole === 'Interviewer') {
      obj = {
        interviewTypeId: slot.interviewTypeId,
        calendarId: slot.calendarId,
        recruiterCalendarId: 0
      }
    } else {
      obj = {
        interviewTypeId: slot.interviewTypeId,
        recruiterCalendarId: slot.calendarId,
        calendarId: 0
      }
    }
    console.log(obj);
    localStorage.setItem("feedBackInputDto",JSON.stringify(obj));
    this.router.navigate(["/feedback"]);
  }
}
