import { BookingEvent } from './../../../../Shared/dataModal/bookingSlot.modal';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DataService } from '../../../../services/data.service';
import { Subscription } from 'rxjs';
import { SharedData } from '../shared-data.model';

@Component({
  selector: 'app-panel-availability',
  templateUrl: './panel-availability.page.html',
  styleUrls: ['./panel-availability.page.scss'],
})
export class PanelAvailabilityPage extends SharedData implements OnInit {

  allSlotInfo: BookingEvent[];
  constructor(private data: DataService,
    private router: Router) {
    super(data, 'yellow',router)
  }

  ngOnInit() {
    this.allSlotInfo = this.data.events;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  bookInterviewersSlot(slot) {
    console.log(slot);
    this.gotoBookingForm(slot);

  }

  gotoBookingForm(slotInfo?) {
    console.log("slotInfo", slotInfo);
    // let value = this.selectedDateFromCalendar.split("-");
    // let monthNumber: number;
    // this.data.months.forEach((month, index) => {
    //   if (month === value[1]) {
    //     monthNumber = index;
    //   }
    // });
    // let year = Number(value[2]);
    // let date = Number(value[0]);
    // let selectedDate = new Date(year, monthNumber, date);
    // console.log(selectedDate);
    // this.router.navigate(["/booking-form"]);
    // this.data.setBookingDataForBookingForm({
    //   dateInString: this.selectedDateFromCalendar,
    //   dateInObject: this.selectedDateObjectFromCalendar,
    //   date: selectedDate,
    //   slotInfo: slotInfo,
    //   from: "panelAvailability"
    // });
    this.commonPartOfBookingForm(slotInfo, 'panelAvailability');

  }
}
