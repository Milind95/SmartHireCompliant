import { Subscription, Observable } from 'rxjs';
import { BookingEvent } from './../../../../Shared/dataModal/bookingSlot.modal';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DataService } from '../../../../services/data.service';
import { Storage } from '@ionic/storage';
import { LoaderMobileService } from '../../../../services/loader-mobile.service';
import { SharedData } from '../shared-data.model';

@Component({
  selector: 'app-available',
  templateUrl: './available.page.html',
  styleUrls: ['./available.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AvailablePage extends SharedData implements OnInit {

  allSlotInfo: BookingEvent[];
  role: string;
  isInterviewer: boolean = false;
  isRecruiter: boolean = false;
  multipleDelete: boolean = false;
  hideDelete: boolean = true;
  deleteAll: boolean = false;
  deleteSelectedArray = [];
  selectAllCheckbox: boolean = false;

  constructor(private data: DataService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    public loader: LoaderMobileService) {
    super(data, 'grey', router);
    this.role = localStorage.getItem("role");
    console.log('Your role is : ', this.role);
    if (this.role === "Interviewer") {
      this.isInterviewer = true;
      this.isRecruiter = false;
    } else if (this.role === "Recruiter") {
      this.isRecruiter = true;
      this.isInterviewer = false;
    }
  }

  ngOnInit() {
    this.allSlotInfo = this.data.events;
  }

  ngOnDestroy() {
    console.log("ngOnDestroy destroyed or not");
    this.subscription.unsubscribe();
  }


  setStep(index: number) {
    console.log(index);
    this.step = index;
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
    //   from: "available"
    // });
    this.commonPartOfBookingForm(slotInfo, 'available');
  }

  goToFeedback() {
    console.log("inside feedback");
    this.router.navigate(["/feedback"]);
  }
  reschedule(slot) {
    console.log(slot);
    this.gotoBookingForm(slot);
  }
  delete(slot) {
    console.log(slot);
    this.presentActionSheet(slot);
  }

  async presentActionSheet(slot) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Do you want to delete this slot ?',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.loader.show("Deleting your slots !!")
          if (this.isInterviewer) {
            this.data.deleteInterviewSlot(slot.calendarId).subscribe(res => {
              console.log(res);
              if (res["message"]) {
                this.data.getAllInterviewerSlots();
                let index = this.currentSlotInfo.indexOf(slot);
                this.currentSlotInfo.splice(index, 1);
                if (this.currentSlotInfo.length === 0) {
                  this.noDataAvailableMsg = "No slots available";
                }
                this.data.deleteSlot({
                  flag: "delete",
                  data: this.currentSlotInfo
                })
                this.loader.hide();
                this.toasterNotification(res["message"]);

              } else if (res["exception"]) {
                this.loader.hide();
                this.toasterNotification(res["exception"]);
              }
            })
          } else if (this.isRecruiter) {
            let obj = {
              recruiterCalendarId: slot.calendarId,
              emailId: this.data.email
            }
            this.data.deleteRecruiterslot(obj).subscribe(res => {
              console.log("delete res", res);
              if (res["message"]) {
                this.data.getAllRecruitersSlots();
                let index = this.currentSlotInfo.indexOf(slot);
                this.currentSlotInfo.splice(index, 1);
                if (this.currentSlotInfo.length === 0) {
                  this.noDataAvailableMsg = "No slots available";
                }
                this.data.deleteSlot({
                  flag: "delete",
                  data: this.currentSlotInfo
                });
                this.loader.hide();
                this.toasterNotification(res["message"]);

              } else if (res["exception"]) {
                this.loader.hide();
                this.toasterNotification(res["exception"]);
              }
            })
          }
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
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

  multipleDeleteChanged(event) {
    if (this.multipleDelete) {
      this.hideDelete = false;
      this.deleteAll = true;
    } else {
      this.hideDelete = true;
      this.deleteAll = false;
      this.currentSlotInfo.forEach(slot => {
        slot.isDeleteSelect = false;
      });
    }
    this.selectAllCheckbox = false;

  }

  selectSlot(slot) {
    if (this.deleteAll) {
      slot.isDeleteSelect = !slot.isDeleteSelect;
    }
    console.log("slot", slot)
  }

  deleteSelectedSlots() {
    let deleteCalendarIdArray = [];
    this.currentSlotInfo.forEach(slot => {
      if (slot.isDeleteSelect) {
        deleteCalendarIdArray.push(slot.calendarId);
      }
    });
    this.deleteSelectedArray = deleteCalendarIdArray.slice();

    this.presentActionSheetForMultipleDelete(deleteCalendarIdArray);


  }



  async presentActionSheetForMultipleDelete(slotArray) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Do you want to delete selected slots ?',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.loader.show("Deleting your slots !!")
          if (this.isInterviewer) {
            this.recursiveDeleteFnInterviewer(slotArray);
          } else if (this.isRecruiter) {
            this.recursiveDeleteFnRecruiter(slotArray);
          }
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  recursiveDeleteFnInterviewer(slotArray) {
    if (slotArray.length > 0) {
      let index = slotArray.length - 1;
      this.data.deleteInterviewSlot(slotArray[index]).subscribe(res => {
        slotArray.pop();
        if (slotArray.length > 0) {
          this.recursiveDeleteFnInterviewer(slotArray);
        } else {
          this.commonDeletePart(res, 'Interviewer')
        }
      });
    }
  }

  recursiveDeleteFnRecruiter(slotArray) {
    if (slotArray.length > 0) {
      let index = slotArray.length - 1;
      let obj = {
        recruiterCalendarId: slotArray[index],
        emailId: this.data.email
      }
      this.data.deleteRecruiterslot(obj).subscribe(res => {
        slotArray.pop();
        if (slotArray.length > 0) {
          this.recursiveDeleteFnRecruiter(slotArray);
        } else {
          this.commonDeletePart(res, 'Recruiter')
        }
      });
    }
  }

  commonDeletePart(res, role) {
    if (res["message"]) {
      if (role === 'Interviewer') {
        this.data.getAllInterviewerSlots();
      } else if (role === 'Recruiter') {
        this.data.getAllRecruitersSlots();
      }
      this.currentSlotInfo = this.currentSlotInfo.filter(data => {
        return this.deleteSelectedArray.indexOf(data.calendarId) === -1
      });
      if (this.currentSlotInfo.length === 0) {
        this.noDataAvailableMsg = "No slots available";
      }
      this.data.deleteSlot({
        flag: "delete",
        data: this.currentSlotInfo
      });
      this.loader.hide();
      this.toasterNotification(res["message"]);
      this.clearDeleteSelection();

    } else if (res["exception"]) {
      this.loader.hide();
      this.toasterNotification(res["exception"]);
    }
  }


  checkboxChanged() {
    if (this.selectAllCheckbox) {
      this.currentSlotInfo.forEach(slot => {
        slot.isDeleteSelect = true;
      });
    } else {
      this.currentSlotInfo.forEach(slot => {
        slot.isDeleteSelect = false;
      });
    }
  }

  clearDeleteSelection() {
    this.multipleDelete = false;
    this.currentSlotInfo.forEach(slot => {
      slot.isDeleteSelect = false;
    });
    this.deleteSelectedArray = [];
    this.selectAllCheckbox = false;
    this.deleteAll = false;
    this.hideDelete = true;
  }

}
