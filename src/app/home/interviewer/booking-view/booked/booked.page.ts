import { Subscription } from 'rxjs';
import { BookingEvent } from './../../../../Shared/dataModal/bookingSlot.modal';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewEncapsulation, OnChanges } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { SharedData } from '../shared-data.model';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.page.html',
  styleUrls: ['./booked.page.scss'],
})
export class BookedPage extends SharedData implements OnInit {

  allSlotInfo: BookingEvent[];
  userRole: string;
  currentDateTimeStamp = new Date().getTime();
  constructor(private data: DataService,
    private router: Router,
    private toastController: ToastController) {
    super(data, 'pink', router)
    this.userRole = localStorage.getItem("role");
    console.log("userRole", this.userRole);
  }

  ngOnInit() {
    this.allSlotInfo = this.data.events;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async toasterNotification(message) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      duration: 2000,
      position: 'bottom',
      closeButtonText: 'Close'
    });
    toast.present();
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
    localStorage.setItem("feedBackInputDto", JSON.stringify(obj))
    this.router.navigate(["/feedback"]);
  }

}
