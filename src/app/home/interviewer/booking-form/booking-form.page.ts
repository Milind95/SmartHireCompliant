import { DataService } from '../../../services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { SelectItem } from 'primeng/api';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoaderMobileService } from '../../../services/loader-mobile.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.page.html',
  styleUrls: ['./booking-form.page.scss'],
})
export class BookingFormPage implements OnInit, OnDestroy {
  weekDays = [];
  bookingDate: string;
  bookingDateArray: any = [];
  bookingForm: FormGroup;
  candidateName: string;
  selectedTime: any;
  comments: string;
  interviewType: any;
  isInterviewer: boolean = false;
  isRecruiter: boolean = false;
  multipleSlotSlideModel: any;
  multipleSlotDropdownModel: any;
  multipleDaysSlideModel: any;
  minDate = new Date();
  currentDate = new Date();
  maxDate = new Date(2099, 3, 21, 20, 30);
  participationType: any;
  bookingDateInDateFormat: Date;
  finalDays = [0, 0, 0, 0, 0, 0, 0];
  dateDiff: number = 1;
  isReScheduleFlag: boolean = false;
  businessUnits: any = [];
  technologies: any = [];
  interviewersArray: any = [];
  selectedBussinessUnit: any;
  selectedTechnology: any;
  selectedInterviewer: any;
  email: any;
  rescheduleSlotInfo: any;
  bookingFormSubscription: Subscription;
  bookingDateInfoSubscription: Subscription;
  panelAvailabilityFlag: boolean = false;
  role: string;
  selectedDateRange = [];
  showCheckBox: boolean = false;

  // weekDays = [{
  //   id: 0,
  //   label: 'Sunday',
  //   value: 'S',
  //   isChecked: false,
  //   isDisabled: true
  // },
  // {
  //   id: 1,
  //   label: 'Monday',
  //   value: 'M',
  //   isChecked: false,
  //   isDisabled: true
  // },
  // {
  //   id: 2,
  //   label: 'Tuesday',
  //   value: 'T',
  //   isChecked: false,
  //   isDisabled: true
  // },
  // {
  //   id: 3,
  //   label: 'Wednusday',
  //   value: 'W',
  //   isChecked: false,
  //   isDisabled: true
  // },
  // {
  //   id: 4,
  //   label: 'Thursday',
  //   value: 'T',
  //   isChecked: false,
  //   isDisabled: true
  // },
  // {
  //   id: 5,
  //   label: 'Friday',
  //   value: 'F',
  //   isChecked: false,
  //   isDisabled: true
  // },
  // {
  //   id: 6,
  //   label: 'Saturday',
  //   value: 'S',
  //   isChecked: false,
  //   isDisabled: true
  // }];

  interviewTypes = [];

  participationTypes = [{
    id: 1,
    value: "Face to Face"
  }, {
    id: 2,
    value: "Telephonic"
  }];

  multipleSlots = [{
    id: 4,
    value: "4"
  }, {
    id: 8,
    value: "8"
  }];


  constructor(private data: DataService,
    private storage: Storage,
    public loader: LoaderMobileService,
    public toastController: ToastController,
    private router: Router) {
    this.email = localStorage.getItem("email");
    this.role = localStorage.getItem("role");
    this.clearWeekDays();
    // this.storage.get('email').then((res => {
    //   this.email = res;
    // }));

    // storage.get('role').then((val) => {
    console.log('Your role is : ', this.role);
    if (this.role === "Interviewer") {
      this.isInterviewer = true;
      this.isRecruiter = false;

      this.data.eventEmitterForLookup.subscribe(res => {
        if (res.flag) {
          if (this.isReScheduleFlag) {
            this.participationType = this.rescheduleSlotInfo.participationType.toString();
          }
        }
      });
      this.data.getlookUpData();

    } else if (this.role === "Recruiter") {
      this.isRecruiter = true;
      this.isInterviewer = false;

      this.data.eventEmitterForLookup.subscribe(res => {
        if (res.flag) {

          this.data.interviewTypeArray.forEach(int => {
            let object = {
              id: Number(int.id),
              value: int.name.toString()
            }
            this.interviewTypes.push(object);
          });

          let buArray = this.data.buArray;
          this.businessUnits = [];
          let technologyArray = this.data.technologyArray;
          buArray.forEach(bu => {
            let object = {
              id: Number(bu.id),
              name: bu.name
            }
            this.businessUnits.push(object)
          });

          this.technologies = [];
          technologyArray.forEach(tech => {
            let object = {
              id: Number(tech.id),
              name: tech.name
            }
            this.technologies.push(object)
          });

          if (this.isReScheduleFlag) {
            console.log("this.rescheduleSlotInfo", this.rescheduleSlotInfo);
            this.panelAvailabilityFlag = this.rescheduleSlotInfo.interviewerRequired;

            this.candidateName = this.rescheduleSlotInfo.candidateName;
            this.interviewType = this.rescheduleSlotInfo.interviewTypeId.toString();
            let selectedBussinessUnit = this.businessUnits.filter(bu => {
              return bu && bu.id === this.rescheduleSlotInfo.buId
            });
            let selectedTechnology = this.technologies.filter(tech => {
              return tech && tech.id === this.rescheduleSlotInfo.technologyId
            })
            this.selectedBussinessUnit = selectedBussinessUnit[0];
            this.selectedTechnology = selectedTechnology[0];
            this.comments = this.rescheduleSlotInfo.comments
          }
        }
      });
      this.data.getlookUpData();
    }
    // });
  }


  getTechnology(event) {
    console.log(event);
    this.selectedTechnology = event;
  }
  getBU(event) {
    console.log(event);
    this.selectedBussinessUnit = event;
  }
  getInterviewer(event) {
    console.log(event);
    this.selectedInterviewer = event;
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

  ngOnInit() {
    this.bookingDateInfoSubscription = this.data.bookingDateInfoSubject.subscribe(res => {
      console.log(res);
      this.bookingDate = res.dateInString;
      this.bookingDateInDateFormat = res.date;
      this.bookingDateArray = this.bookingDate.split("-");
      this.rescheduleSlotInfo = res.slotInfo;
      this.selectedDateRange[0] = this.bookingDateInDateFormat;

      if (res.slotInfo) {
        this.isReScheduleFlag = true;
        let formattedDate = this.data.formatDate(res.slotInfo.start.getTime());
        let splittedDate = formattedDate.time.split(" ");
        console.log(splittedDate);
        if (splittedDate[1] === "AM") {
          this.selectedTime = splittedDate[0] + " am";
        } else if (splittedDate[1] === "PM") {
          this.selectedTime = splittedDate[0] + " pm";
        }
        console.log(this.selectedTime);
      }
    });
  }

  saveBookingSlotInterviewer() {
    if (this.checkValidationsForInterviewer()) {
      let errorFlag = false;
      let slotRepeat = 1;
      let index = this.bookingDateInDateFormat.getDay();

      let from = new Date(this.data.getFormattedDateString(this.selectedTime, this.bookingDateInDateFormat)).getTime();
      if (new Date().getTime() > from) {
        this.toasterNotification("Interview slot bookings not allowed for past");
      } else {
        // let fromTime = Number(from);
        let fromFinal = from;
        // let formattedFrom = this.data.formatDate(fromTime);
        if (this.multipleSlotSlideModel) {
          slotRepeat = Number(this.multipleSlotDropdownModel);
          let totalTime = from + Number(this.multipleSlotDropdownModel) * 60 * 60 * 1000;
          let thresholdTime = new Date(this.data.getFormattedDateString("08:00 pm", this.bookingDateInDateFormat)).getTime();
          console.log(totalTime);
          console.log(thresholdTime);
          if (totalTime > thresholdTime) {
            errorFlag = true;
            this.toasterNotification("Interview slot bookings are allowed only from 8:00AM to 8:00PM");
          } else {
            errorFlag = false;
          }
        } else {
          let totalTime = from + 1 * 60 * 60 * 1000;
          let thresholdTime = new Date(this.data.getFormattedDateString("08:00 pm", this.bookingDateInDateFormat)).getTime();
          console.log(totalTime);
          console.log(thresholdTime);
          if (totalTime > thresholdTime) {
            errorFlag = true;
            this.toasterNotification("Interview slot bookings are allowed only from 8:00AM to 8:00PM");
          } else {
            errorFlag = false;
          }
        }

        if (!errorFlag) {
          from = fromFinal;
          let to = fromFinal + (60 * 60 * 1000);
          if (!this.multipleDaysSlideModel) {
            let fromRepeat = from;
            let toRepeat = to;
            this.loader.show("Booking your slot !!");
            for (let j = 0; j < slotRepeat; j++) {
              let saveSlotDetails = {
                "email": this.email,
                "fromTime": fromRepeat,
                "toTime": toRepeat,
                "participationTypeId": this.participationType
              };
              console.log(saveSlotDetails);
              this.data.saveFreeSlot(saveSlotDetails).subscribe(res => {
                console.log(res);
                if (res["message"]) {
                  if (j === slotRepeat - 1) {
                    this.loader.hide();
                    this.toasterNotification(res["message"]);
                    this.data.getAllInterviewerSlots();
                    this.bookingFormEvents();

                  }
                } else if (res["exception"]) {
                  this.loader.hide();
                  this.toasterNotification(res["exception"]);
                }
              });
              fromRepeat = toRepeat;
              toRepeat = fromRepeat + (60 * 60 * 1000);
            }
          } else {
            if (this.showCheckBox) {
              let isCheckedCount = 0;
              this.weekDays.forEach(weekDay => {
                if (weekDay.isChecked) {
                  isCheckedCount++;
                  this.finalDays[weekDay.id] = 1
                }
              });

              if (isCheckedCount > 0) {
                this.loader.show("Booking your slot !!");
                for (let i = 0; i < this.dateDiff; i++) {
                  if (this.finalDays[index % 7] === 1) {
                    let fromRepeat = from;
                    let toRepeat = to;
                    for (let j = 0; j < slotRepeat; j++) {
                      let saveSlotDetails = {
                        "email": "akshat.mangal@capgemini.com",
                        "fromTime": fromRepeat,
                        "toTime": toRepeat,
                        "participationTypeId": this.participationType
                      };
                      console.log(saveSlotDetails);
                      this.data.saveFreeSlot(saveSlotDetails).subscribe(res => {
                        console.log(res);
                        if (res["message"]) {
                          if (i === this.dateDiff - 1 && j === slotRepeat - 1) {
                            this.loader.hide();
                            this.toasterNotification(res["message"]);
                            this.data.getAllInterviewerSlots();

                            this.bookingFormEvents();

                          }

                        } else if (res["exception"]) {
                          this.loader.hide();
                          this.toasterNotification(res["exception"]);
                        }
                      });
                      fromRepeat = toRepeat;
                      toRepeat = fromRepeat + (60 * 60 * 1000);
                    }
                  }
                  from += 24 * 60 * 60 * 1000;
                  to += 24 * 60 * 60 * 1000;
                  index++;
                }
              } else {
                this.toasterNotification("Please select at least one week day");
              }
            } else {
              this.toasterNotification("Please select To Date");
            }

          }
        }

        this.clearValues();
      }
    }
  }

  bookingFormEvents() {
    this.bookingFormSubscription = this.data.eventEmitterForBookingForm.subscribe(res => {
      console.log("event emitter response is ", res);
      this.commonNavigation(res.flag);
    });
  }




  rescheduleBookingSlotInterviewer() {
    if (this.checkValidationsForInterviewer()) {
      if (this.checkTimeValidity()) {
        this.loader.show("Rescheduling your slot !!");
        let saveSlotDetails = {
          "email": this.email,
          "fromTime": new Date(this.data.getFormattedDateString(this.selectedTime, this.bookingDateInDateFormat)).getTime(),
          "toTime": new Date(this.data.getFormattedDateString(this.selectedTime, this.bookingDateInDateFormat)).getTime() + (60 * 60 * 1000),
          "participationTypeId": this.participationType,
          "calendarId": this.rescheduleSlotInfo.calendarId,
        };
        this.data.saveFreeSlot(saveSlotDetails).subscribe(res => {
          console.log(res);
          if (res['response'] && res['response'].length > 0) {
            if (res["message"]) {
              this.loader.hide();
              this.toasterNotification("Slot Rescheduled Successfully");
              this.data.getAllInterviewerSlots();
              this.bookingFormSubscription = this.data.eventEmitterForBookingForm.subscribe(res => {
                console.log("event emitter response is ", res);
                this.commonNavigation(res.flag);
              });
            }
          } else if (res["exception"]) {
            this.loader.hide();
            this.toasterNotification(res["exception"] ? res["exception"] : "Slot Reschedulling Failed");
          }
        });
      }
    }
  }


  saveBookingSlotRecruiter() {
    console.log("srkhv");
    if (this.checkValidationsForRecruiter()) {
      if (this.checkTimeValidity()) {
        this.loader.show("Saving your slot");
        let body = this.commonBodyFn('normal');
        console.log("this is body ", body);
        this.data.saveRecruiterSlot(body).subscribe(res => {
          console.log("new res", res);
          if (res['response'].length > 0) {
            this.loader.hide();
            this.toasterNotification(res["message"] ? res["message"] : "Slot Booked Successfully");
            this.data.getAllRecruitersSlots();
            this.bookingFormSubscription = this.data.eventEmitterForBookingForm.subscribe(res => {
              console.log("event emitter response is ", res);
              this.commonNavigation(res.flag);
            })
          } else if (res["exception"]) {
            this.loader.hide();
            this.toasterNotification(res["exception"] ? res["exception"] : "Error in booking slots ! please try again");
          }
        });
      }

    }
  }



  checkTimeValidity() {
    let from = new Date(this.data.getFormattedDateString(this.selectedTime, this.bookingDateInDateFormat)).getTime();
    if (new Date().getTime() > from) {
      this.toasterNotification("Interview slot bookings not allowed for past");
      return false;
    } else {
      let totalTime = from + (60 * 60 * 1000);
      let thresholdTime = new Date(this.data.getFormattedDateString("08:00 pm", this.bookingDateInDateFormat)).getTime();
      if (totalTime > thresholdTime) {
        this.toasterNotification("Interview slot bookings are allowed only from 8:00AM to 8:00PM");
        return false;
      } else {
        return true;
      }
    }
  }

  rescheduleBookingSlotRecruiter() {
    if (this.checkValidationsForRecruiter()) {
      if (this.checkTimeValidity()) {
        this.loader.show("Rescheduling your slot");
        let body = this.commonBodyFn('reschedule');

        console.log(body);
        this.data.rescheduleRecruiterSlot(body).subscribe(res => {
          console.log(res);
          if (res["response"].length > 0) {
            if (res["message"]) {
              this.loader.hide();
              this.toasterNotification(res["message"]);
              this.data.getAllRecruitersSlots();
              this.bookingFormSubscription = this.data.eventEmitterForBookingForm.subscribe(res => {
                console.log("event emitter response is ", res);
                this.commonNavigation(res.flag);
              })
            }
          } else if (res["exception"]) {
            this.loader.hide();
            this.toasterNotification(res["exception"]);
          }
        });
      }
    }
  }

  commonBodyFn(flag){
    let slotDto = {
      emailId: this.email,
      candidateName: this.candidateName,
      interviewTypeId: Number(this.interviewType),
      technologyId: Number(this.selectedTechnology.id),
      fromTime: new Date(this.data.getFormattedDateString(this.selectedTime, this.bookingDateInDateFormat)).getTime(),
      toTime: new Date(this.data.getFormattedDateString(this.selectedTime, this.bookingDateInDateFormat)).getTime() + (60 * 60 * 1000),
      interviewerId: this.selectedInterviewer !== null && this.selectedInterviewer !== undefined ? this.selectedInterviewer.id : 0,
      comments: this.comments,
      buId: Number(this.selectedBussinessUnit.id)
    }
    if(flag === 'reschedule'){
      slotDto['recruiterCalendarId'] = this.rescheduleSlotInfo.calendarId;
    }
    return slotDto;
  }


  checkValidationsForInterviewer() {

    if (this.selectedTime !== null && this.selectedTime !== undefined && this.selectedTime !== "") {
      if (this.participationType !== null && this.participationType !== undefined && this.participationType !== "") {
        return true;
      } else {
        this.toasterNotification("Please Select Participation Type !!!");
        return false;
      }
    } else {
      this.toasterNotification("Please Select Time slot !!!");
      return false;
    }

  }


  checkValidationsForRecruiter() {
    if (this.candidateName !== null && this.candidateName !== undefined && this.candidateName !== "") {
      if (this.selectedTime !== null && this.selectedTime !== undefined && this.selectedTime !== "") {
        if (this.interviewType !== null && this.interviewType !== undefined && this.interviewType !== "") {
          if (this.selectedTechnology !== null && this.selectedTechnology !== undefined && this.selectedTechnology !== "") {
            if (this.selectedBussinessUnit !== null && this.selectedBussinessUnit !== undefined && this.selectedBussinessUnit !== "") {
              return true;
            } else {
              this.toasterNotification("Please Select Business Unit !!!");
              return false;
            }
          } else {
            this.toasterNotification("Please Select Technology !!!");
            return false;
          }
        } else {
          this.toasterNotification("Please Select Interview Type !!!");
          return false;
        }
      } else {
        this.toasterNotification("Please Select Time slot !!!");
        return false;
      }
    } else {
      this.toasterNotification("Please Select Candidate Name !!!");
      return false;
    }
  }


  ngOnDestroy() {
    this.data.bookingDateInfoSubject.complete();
    if (this.bookingFormSubscription) {
      this.bookingFormSubscription.unsubscribe();
    }
    this.bookingDateInfoSubscription.unsubscribe();
  }


  timeSet(event) {
    console.log(event);
    console.log(new Date(this.data.getFormattedDateString(event, this.bookingDateInDateFormat)).getTime());
    if (this.isRecruiter) {
      console.log(event, this.bookingDateInDateFormat);
      this.fetchInterviewer();
    }
  }

  toggleMultipleSlots(event) {
    console.log(event);
    if (event.detail.checked) {
      this.multipleSlotDropdownModel = "4";
    } else {
      this.multipleSlotDropdownModel = null;
    }
  }

  clearValues() {
    this.finalDays = [0, 0, 0, 0, 0, 0, 0];
  }

  clearWeekDays() {
    this.weekDays = [{
      id: 0,
      label: 'Sunday',
      value: 'S',
      isChecked: false,
      isDisabled: true
    },
    {
      id: 1,
      label: 'Monday',
      value: 'M',
      isChecked: false,
      isDisabled: true
    },
    {
      id: 2,
      label: 'Tuesday',
      value: 'T',
      isChecked: false,
      isDisabled: true
    },
    {
      id: 3,
      label: 'Wednusday',
      value: 'W',
      isChecked: false,
      isDisabled: true
    },
    {
      id: 4,
      label: 'Thursday',
      value: 'T',
      isChecked: false,
      isDisabled: true
    },
    {
      id: 5,
      label: 'Friday',
      value: 'F',
      isChecked: false,
      isDisabled: true
    },
    {
      id: 6,
      label: 'Saturday',
      value: 'S',
      isChecked: false,
      isDisabled: true
    }];
  }

  // getDateDifference(event) {
  //   console.log(event);
  // }

  techChange(event) {
    this.fetchInterviewer();
  }

  buChange(event) {
    this.fetchInterviewer();
  }


  intTypeChange(event) {
    this.fetchInterviewer();
  }

  interviewerChange(event) {

  }

  fetchInterviewer() {
    if (this.selectedTime && this.bookingDateInDateFormat && this.selectedTechnology && this.interviewType && this.selectedBussinessUnit) {
      let from = new Date(this.data.getFormattedDateString(this.selectedTime, this.bookingDateInDateFormat)).getTime();
      let to = from + (60 * 60 * 1000);

      let obj = {
        interviewTypeId: Number(this.interviewType),
        technologyId: Number(this.selectedTechnology.id),
        fromTime: from,
        toTime: to,
        buId: Number(this.selectedBussinessUnit.id)
      }
      console.log("body ", obj);
      this.data.getInterviewerForRecruiter(obj).subscribe(res => {
        console.log("interviewer ", res);
        // this.interviewersArray = [{ label: 'Select Interviewer', value: null }];
        this.interviewersArray = [];
        let interArr = [];

        if (res['response'][0].length !== 0) {
          interArr = res['response'][0];
          interArr.forEach(inter => {
            let object = {
              id: Number(inter.interviewerId),
              name: inter.name + ' -  ' + inter.grade + ' -  ' + inter.location + ' -  ' + inter.account + ' - ' + inter.marketUnit
            }
            this.interviewersArray.push(object);
          });
          console.log("interviewerArray", this.interviewersArray)
        }
      });
    }
  }

  dateTimeChangeEvent(event) {
    console.log(event);
    if (event[1]) {
      this.clearWeekDays();
      let toDate = new Date(event[1]).getTime();
      let bookingDate = new Date(this.bookingDateInDateFormat.getFullYear(), this.bookingDateInDateFormat.getMonth(), this.bookingDateInDateFormat.getDate()).getTime();
      console.log("toDate", toDate);
      console.log("currentDate", bookingDate);

      this.dateDiff = ((toDate - bookingDate) / (24 * 60 * 60 * 1000)) + 1;
      console.log("this.dateDiff", this.dateDiff);
      let startingDay = event[0].getDay();
      console.log("startingDay", startingDay);

      for (let i = startingDay, counter = 0; counter < this.dateDiff; i++ , counter++) {
        this.weekDays[i % 7].isDisabled = false;
        this.weekDays[i % 7].isChecked = true;
      }

      this.showCheckBox = true;

    } else {
      this.showCheckBox = false;
    }
  }

  checkBoxChange(event, day) {
    console.log(event);
    console.log(day);
  }

  // myFilter = (d: Date): boolean => {
  //   console.log("d day is", d);
  //   const day = d.getDay();
  //   let responseFlag = true;
  //     this.weekDays.forEach(weekDay=>{
  //       console.log("weekDay day is", weekDay);

  //       if(weekDay.id === day && !weekDay.isChecked && !weekDay.isDisabled){
  //         responseFlag = false;
  //       }
  //     });
  //   return responseFlag;
  // }

  commonNavigation(flag) {
    if (flag === 'fromBookingForm') {
      this.router.navigate(['/booking-view']);
      this.data.setRefreshDataFromBookingForm({
        date: this.bookingDateInDateFormat,
        flag: "bookingView"
      });
    }
  }
}
