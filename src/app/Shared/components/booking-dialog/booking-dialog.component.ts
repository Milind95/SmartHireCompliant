import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Storage } from '@ionic/storage';
import { DataService } from '../../../services/data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookingDialogComponent implements OnInit {
  dialogTitle: string = "Book Slot";
  p: number;
  saveSlotForm: FormGroup;
  showProgressBar: boolean;
  isRefreshDeletedEvents: boolean = false;
  public show: boolean = false;
  public showbookingform: boolean = false;
  public showbooking: boolean = false;
  public showselectAll: boolean = false;
  public checkboxName: any = "Enable Multiple Slots";
  public checkboxName1: any = "Enable Multiple Days";
  events: any = [];
  gridWidth: string = "";
  halfGridWidth: string = "";
  recruiterFlag: boolean = false;
  buArray = [];
  technologyArray = [];
  interviewType: any;
  technology: any;
  bu: any;
  comments: any;
  interviewer: any;
  email: any;
  value: any;
  fullName: any;
  recruiterCalendarId: number;
  pastDateDialog: boolean = false;
  time: any;
  interviewerArray = [];
  tabIndex = 0;
  tabWidth: any = 6;
  step: number = null;
  isRescheduleFlag: boolean = false;
  daysClicked: boolean = false;
  calendarId: any;
  todayDate: any;
  fromDate: string = "";
  eventLength: any;

  deleteSLotLength: any;
  public dateClicked: boolean = false;
  public multiDelete: boolean = false;

  calendarIdArray = [];
  public deleteMessage: boolean = false;
  public showCheckbox: boolean = false;
  public showIcon: boolean = false;
  public showDelete: boolean = false;
  public checkBoxSelect: boolean = false;
  public showDeleteMessage: boolean = false;


  days: any = [
    { name: "S", value: 0, checked: false },
    { name: "M", value: 1, checked: false },
    { name: "T", value: 2, checked: false },
    { name: "W", value: 3, checked: false },
    { name: "T", value: 4, checked: false },
    { name: "F", value: 5, checked: false },
    { name: "S", value: 6, checked: false }
  ];

  checkedDay: boolean = false;
  finalDays = [0, 0, 0, 0, 0, 0, 0];
  multiSlots = [
    { value: 4, checked: true },
    { value: 8, checked: false }
  ];
  participationArray = [
    {
      value: 'Telephonic',
      id: 0
    },
    {
      value: 'Face To Face',
      id: 1
    }
  ];
  userRole: any;
  tabs = [];
  minDate: any;
  currentDate: any;
  toDateFromEvent: Date;
  dateDiff: number = 0;
  avaDelFlag: boolean;
  editIcon: boolean;
  toDay: Date;

  constructor(public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private storage: Storage, private service: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private router: Router) {
    this.saveSlotForm = this.fb.group({
      name: new FormControl(''),
      interviewTypeControl: new FormControl('', Validators.required),
      technologyControl: new FormControl('', Validators.required),
      buControl: new FormControl('', Validators.required),
      timeSlot: new FormControl('', Validators.required),
      comments: new FormControl(''),
      interviewerControl: new FormControl(''),
      participationType: new FormControl("", [Validators.required]),
      slotValue: new FormControl(""),
      multipleDays: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log(this.data.date);
    console.log(this.data.events);

    this.todayDate = new Date().getTime();
    let now = this.data.date;

    // to show from date in mat form field
    let selectedDate = now.toString().split(" ");
    this.fromDate = selectedDate[0] + " " + selectedDate[1] + " " + selectedDate[2] + " " + selectedDate[3];

    this.minDate = now;
    let eventsArr = this.data.events;
    let bookedArray = [], interviewedArray = [], interRequireArray = [], interAvailableArray = [];

    eventsArr.forEach(data => {
      if (data.isBooked && data.feedbackStatus === null) {
        data['status'] = 'Booked';
        data["formattedDate"] = this.finalDate(data.start, data.end);
        bookedArray.push(data);
      }
      else if (data.isBooked && data.feedbackStatus !== null) {
        data['status'] = 'Interviewed';
        data["formattedDate"] = this.finalDate(data.start, data.end);
        interviewedArray.push(data);
      }
      else if (!data.isBooked && !data.interviewerRequired) {
        data['status'] = 'Available';
        data["formattedDate"] = this.finalDate(data.start, data.end);
        interRequireArray.push(data);
      }
      else if (data.interviewerRequired) {
        data['status'] = 'Interviewer Availability';
        data["formattedDate"] = this.finalDate(data.start, data.end);
        interAvailableArray.push(data);
      }
    });

    this.tabs = [
      { value: 'Booked', event: bookedArray, color: 'rgba(255, 102, 102, 0.588235294117647)', slotCount: eventsArr.length > 0 ? eventsArr[0].bookedCount : 0, background: 'rgb(242, 50, 50)' },
      { value: 'Available', event: interRequireArray, color: 'rgb(150, 147, 147)', slotCount: eventsArr.length > 0 ? eventsArr[0].availableCount : 0, background: 'rgb(56, 54, 54)' },
      { value: 'Interviewed', event: interviewedArray, color: 'rgba(102, 204, 153, 0.988235294117647)', slotCount: eventsArr.length > 0 ? eventsArr[0].interviewedCount : 0, background: 'rgba(20, 121, 72, 0.99)' },
    ];


    for (let i = 0; i < interRequireArray.length; i++) {
      if (this.todayDate < interRequireArray[i].start.getTime()) {
        console.log("In IF TodayDate", this.todayDate, "startTime", interRequireArray[i].start.getTime());
        this.multiDelete = false;
      }
      else {
        console.log("In Else TodayDate", this.todayDate, "startTime", interRequireArray[i].start.getTime());
        if (interRequireArray.length !== 1) {
          console.log("trueeee")
          this.multiDelete = true;
        }
        else {
          console.log("In elseeee falseeee");
          this.multiDelete = false;
        }
      }
    }

    if (new Date(this.data.date).getTime() >= new Date().getTime() || (new Date(this.data.date).getDate() === new Date().getDate() &&
      new Date(this.data.date).getMonth() === new Date().getMonth() && new Date(this.data.date).getFullYear() === new Date().getFullYear())) {
      this.pastDateDialog = false;
    } else {
      this.pastDateDialog = true;
      this.tabWidth = 12;
    }
    this.email = localStorage.getItem("email");

    // this.storage.get('email').then((res => {
    //   this.email = res;
    // }))
    this.userRole = localStorage.getItem("role");

    // this.storage.get('role').then((val) => {
    // this.userRole = val;
    if (this.userRole === 'Interviewer') {
      console.log("inside interviewer")
      this.recruiterFlag = false;
      this.saveSlotForm = this.fb.group({
        name: new FormControl(''),
        timeSlot: new FormControl('', [Validators.required]),
        participationType: new FormControl('', Validators.required),
        comments: new FormControl(''),
        interviewerControl: new FormControl(''),
        slotValue: new FormControl(""),
        multipleDays: new FormControl({ value: '', disabled: true }),
      });

    }
    else {
      this.recruiterFlag = true;
      this.saveSlotForm = this.fb.group({
        name: new FormControl('', Validators.required),
        interviewTypeControl: new FormControl('', Validators.required),
        technologyControl: new FormControl('', Validators.required),
        buControl: new FormControl('', Validators.required),
        timeSlot: new FormControl(''),
        comments: new FormControl(''),
        interviewerControl: new FormControl(''),
        slotValue: new FormControl(""),
      });

      this.service.eventEmitterForLookup.subscribe(res => {
        if (res.flag) {
          this.buArray = this.service.buArray;
          this.technologyArray = this.service.technologyArray;
          console.log(this.technologyArray);
        }
      });
      this.service.getlookUpData();

      let obj = {
        value: 'Interviewer Availability',
        event: interAvailableArray,
        color: 'rgb(255, 218, 106)',
        slotCount: eventsArr.length > 0 ? eventsArr[0].interviewerAvailabilityCount : 0
      }
      this.tabs.push(obj);
    }

    // })

    this.events = this.data.events;
    if (this.events.length !== 0) {
      this.gridWidth = "6";
      this.halfGridWidth = "6";
      this.tabIndex = this.getMaximumSlotCount(this.events[0]);
      console.log("tabIndex", this.tabIndex);
    } else {
      this.gridWidth = "12";
      this.halfGridWidth = "6";
    }
  }

  getMaximumSlotCount(slot) {
    console.log(slot);
    let num = Math.max(slot.bookedCount, slot.availableCount,
      slot.interviewedCount, slot.interviewerAvailabilityCount);
    if (num === slot.bookedCount) return 0;
    else if (num === slot.interviewedCount) return 2;
    else if (num === slot.availableCount) return 1;
    else return 3;
  }


  showCheckBoxfn(event) {
    console.log("event in showCheckBoxfn", event);
    console.log("i m here on button click")
    this.showCheckbox = !this.showCheckbox;
    this.showIcon = !this.showIcon;
    this.showDelete = false;
    if (this.showCheckbox) {
      this.showselectAll = true;
      this.showDelete = true;
    }
    else {
      this.showselectAll = false;
      this.showDelete = false;
      this.checkBoxSelect = false;
    }
    event.forEach(slot => {
      slot.isDeleteSelected = false;
    })
  }
  selectAll(event) {
    console.log("selectall events", event);
    event.forEach(slot => {
      if (this.checkBoxSelect) {
        slot.isDeleteSelected = true;
        this.calendarIdArray.push(slot.calendarId);
        this.showDelete = true;
        this.showDeleteMessage = false;
      }
      else {
        slot.isDeleteSelected = false;
        this.calendarIdArray = [];
        this.showDelete = false;
      }
    })

  }

  multipleDaysEvent() {
    console.log(this.showbooking);

  }

  setStep(index: number) {
    this.step = index;
  }

  validateDialog(dialog) {
    console.log(dialog);
    this.showProgressBar = true;
    let obj = {
      name: dialog.name
    };
    if (dialog.recruiterFlag == "true") { // interviewer
      // obj = {
      //   name: dialog.name,
      //   interviewtype: dialog.interviewtype,
      //   techname: dialog.techname,
      //   buname: dialog.buname,
      //   interviewname: dialog.interviewname,
      // }
      obj['interviewtype'] = dialog.interviewtype;
      obj['techname'] = dialog.techname;
      obj['buname'] = dialog.buname;
      obj['interviewname'] = dialog.interviewname;

    } else {

      // obj = {
      //   name: dialog.name,
      //   slotvalue: dialog.slotvalue,
      //   interviewround: dialog.interviewround,
      // }
      obj['slotvalue'] = dialog.slotvalue;
      obj['interviewround'] = dialog.interviewround;
    }
  }

  selectedTime() {
    console.log(this.saveSlotForm)
    let control = this.saveSlotForm.controls;
    if (this.recruiterFlag) {
      console.log("inside if");
      this.fetchInterviewer(Number(control.interviewTypeControl.value), control.technologyControl.value,
        Number(control.buControl.value), control.timeSlot.value);
    }
  }

  selectedInterviewType(typeId) {
    let control = this.saveSlotForm.controls;
    // if (this.saveSlotForm.valid) {
    console.log("inside if");
    this.fetchInterviewer(Number(typeId), control.technologyControl.value,
      Number(control.buControl.value), control.timeSlot.value);
    // }
  }
  selectedTechnology(tech) {
    console.log("slot form", this.saveSlotForm.controls.interviewTypeControl.value);
    console.log("tech", tech);
    let control = this.saveSlotForm.controls;
    // if (this.saveSlotForm.valid) {
    this.fetchInterviewer(Number(control.interviewTypeControl.value), tech,
      Number(control.buControl.value), control.timeSlot.value);
    // }
  }
  selectedBu(bu) {
    console.log("bu", bu, this.saveSlotForm);
    let control = this.saveSlotForm.controls;
    // if (this.saveSlotForm.valid) {
    this.fetchInterviewer(Number(control.interviewTypeControl.value),
      control.technologyControl.value, Number(bu), control.timeSlot.value);
    // }
  }

  fetchInterviewer(typeId, techId, buId, time) {

    if (typeId && techId && buId && time) {
      let from = new Date(this.service.getFormattedDateString(time, this.data.date)).getTime();
      let to = from + (60 * 60 * 1000);

      // let control = this.saveSlotForm.controls;
      let obj = {
        interviewTypeId: typeId,
        technologyId: techId,
        fromTime: from,
        toTime: to,
        buId: buId,
        recruiterCalendarId: this.recruiterCalendarId
      }
      console.log("body ", obj);
      this.service.getInterviewerForRecruiter(obj).subscribe(res => {
        console.log("interviewer ", res);
        let interArr = [];
        this.interviewerArray = [];
        if (res['response'][0].length !== 0) {
          interArr = res['response'][0];
          interArr.forEach(inter => {
            this.interviewerArray.push({
              id: inter.interviewerId,
              value: inter.name + ' -  ' + inter.grade + ' -  ' + inter.location + ' -  ' + inter.account + ' - ' + inter.marketUnit
            });
          });
          console.log("interviewerArray", this.interviewerArray)
        }
      });
    }

  }

  getDaysClickedBoolean() {
    let count = 0;
    this.finalDays.forEach(d => {
      if (d === 0) count++;
      else return;
    });
    console.log("counter ", count);
    if (count === this.finalDays.length) {
      this.daysClicked = true;
    } else {
      this.daysClicked = false;
    }
  }

  saveSlot(form) {
    console.log("asve slot", form, this.saveSlotForm);
    // this.getDaysClickedBoolean();

    let value = this.saveSlotForm.value;

    let start = new Date(this.service.getFormattedDateString(value.timeSlot, this.data.date)).getTime();
    let end = start + 60 * 60 * 1000;
    if (this.userRole === 'Interviewer') {

      if (this.isRescheduleFlag) {
        let thresholdTime = new Date(this.service.getFormattedDateString("08:00 pm", this.data.date)).getTime();
        if (end > thresholdTime) {
          this.toastr.error("Interview slot bookings are allowed only from 8:00AM to 8:00PM");
        } else {
          this.saveInterviewSlot(start, end, 'old', 1, 2);
        }
      } else {

        if (this.toDateFromEvent) {
          this.getDaysClickedBoolean();
        }
        console.log(this.toDateFromEvent, this.daysClicked)

        let start = new Date(this.service.getFormattedDateString(form.timeSlot, this.data.date)).getTime();
        let end = start + 60 * 60 * 1000;
        console.log("date diff", this.dateDiff);

        if (this.dateDiff >= 1) {
          let index = new Date(this.data.date).getDay();
          for (let i = 0; i < this.dateDiff; i++) {
            if (this.finalDays[index % 7] === 1) {
              let fromRepeat = start;
              let toRepeat = end;
              if (this.saveSlotForm.controls.slotValue.value !== '') {
                let totalTime = fromRepeat + Number(this.saveSlotForm.controls.slotValue.value) * 60 * 60 * 1000;
                let thresholdTime = new Date(this.service.getFormattedDateString("08:00 pm", toRepeat)).getTime();
                console.log(totalTime);
                console.log(thresholdTime);
                if (totalTime > thresholdTime) {
                  // if (i === this.dateDiff-1) {
                  this.toastr.error("Interview slot bookings are allowed only from 8:00AM to 8:00PM");
                  // }
                } else {
                  for (let j = 0; j < Number(this.saveSlotForm.controls.slotValue.value); j++) {
                    this.saveInterviewSlot(fromRepeat, toRepeat, 'new', j, Number(this.saveSlotForm.controls.slotValue.value));
                    fromRepeat = toRepeat;
                    toRepeat = fromRepeat + 60 * 60 * 1000;
                  }
                }
              } else {
                this.saveInterviewSlot(fromRepeat, toRepeat, 'new', i, this.dateDiff - 1);
                //fromRepeat = toRepeat;
                //toRepeat = fromRepeat + 60 * 60 * 1000;
              }
            }
            start += 24 * 60 * 60 * 1000;
            end += 24 * 60 * 60 * 1000;
            index++;
          }
        } else {
          if (this.saveSlotForm.controls.slotValue.value !== '') {
            let totalTime = start + Number(this.saveSlotForm.controls.slotValue.value) * 60 * 60 * 1000;
            let thresholdTime = new Date(this.service.getFormattedDateString("08:00 pm", this.data.date)).getTime();
            console.log(totalTime);
            console.log(thresholdTime);
            if (totalTime > thresholdTime) {
              this.toastr.error("Interview slot bookings are allowed only from 8:00AM to 8:00PM");
            } else {
              for (let i = 0; i < Number(this.saveSlotForm.controls.slotValue.value); i++) {
                if (i !== 0) {
                  start = end;
                  end = start + 60 * 60 * 1000;
                }
                this.saveInterviewSlot(start, end, 'new', i, Number(this.saveSlotForm.controls.slotValue.value));
              }
            }
          } else {
            this.saveInterviewSlot(start, end, 'new', 1, 2);
          }
        }
      }

    } else { //recruiter
      if (this.saveSlotForm && form.name !== '') {
        let slotDto = {
          emailId: this.email,
          candidateName: form.name,
          interviewTypeId: Number(form.interviewTypeControl),
          technologyId: Number(form.technologyControl),
          fromTime: new Date(this.service.getFormattedDateString(form.timeSlot, this.data.date)).getTime(),
          toTime: new Date(this.service.getFormattedDateString(form.timeSlot, this.data.date)).getTime() + (60 * 60 * 1000),
          interviewerId: form.interviewerControl !== '' ? Number(form.interviewerControl) : 0,
          comments: form.comments,
          buId: form.buControl
        }
        if (this.isRescheduleFlag) {
          this.spinner.show();
          slotDto['recruiterCalendarId'] = this.calendarId;
          console.log(slotDto);
          this.service.rescheduleRecruiterSlot(slotDto).subscribe(res => {
            console.log(res);
            if (res['response'] !== null && res['response'].length > 0) {
              this.toastr.success('Slot Rescheduled Successfully', '')
              this.dialogRef.close(this.userRole + 'success');
            } else {
              this.toastr.warning('Slot Rescheduled Failed', '')
            }
            this.spinner.hide();
          });
        } else {
          this.spinner.show();
          console.log("this is body ", slotDto);
          this.service.saveRecruiterSlot(slotDto).subscribe(res => {
            console.log("new res", res['response'][0]);
            if (res['response'].length > 0) {
              this.toastr.success('Slot Booked Successfully', '');
              this.dialogRef.close(this.userRole + 'success');
              // if(this.service.isPanelAvailability){
              //   this.service.setPanelAvailability(true);
              //   // this.service.setIsPanelAvailabilityBool(false);
              // }
            } else {
              this.toastr.warning('Slot Already Booked', '')
            }
            this.spinner.hide();
          });
        }
      }
    }
  }

  saveInterviewSlot(start, end, bookingType, beg, last) {
    // this.spinner.show();
    let body = {};
    if (bookingType === 'new') {
      body = {
        email: this.email,
        fromTime: start,
        toTime: end,
        participationTypeId: Number(this.saveSlotForm.value.participationType)
      };
    } else {
      body = {
        email: this.email,
        fromTime: start,
        toTime: end,
        calendarId: this.calendarId,
        participationTypeId: Number(this.saveSlotForm.value.participationType)
      }
    }


    console.log("body", body);

    this.service.saveFreeSlot(body).subscribe(res => {
      console.log(res);
      if (res['response'] !== null && res['response'].length > 0) {
        if (beg === last - 1) {
          this.toastr.success('Slot Booked Successfully', '');
          this.dialogRef.close(this.userRole + 'success');
        }
      } else {
        if (beg === last - 1) this.toastr.error('Slot Already booked', '');

      }
      this.spinner.hide();
    })

  }

  daysClickedFun(day) {
    console.log(day);
    day.selected = !day.selected;
    // this.daysClicked = false;
    if (day.selected) {
      this.finalDays[day.value] = 1;
      this.daysClicked = false;
    } else {
      this.finalDays[day.value] = 0;
    }
    console.log("final days", this.finalDays);
    // let count = 0;
    // this.finalDays.forEach(d => {
    //   if (d === 0) count++;
    // });
    // console.log("counter ", count);
    // if (count === this.finalDays.length) {
    //   this.daysClicked = true;
    // } else {
    //   this.daysClicked = false;
    // }
  }

  onCheckboxChagen(event, value) {
    console.log("week", event);
    if (event.checked) {
      this.daysClicked = false;
      this.finalDays[value] = 1;
    } else {
      this.finalDays[value] = 0;
    }
    console.log("finalDsys1", this.finalDays);
  }
  close() {
    if (this.isRefreshDeletedEvents) {
      this.dialogRef.close(this.userRole + 'success');
      this.isRefreshDeletedEvents = false;
    }
    else this.dialogRef.close();
  }

  toggle(value) {
    console.log(value);
    if (!value.checked) {
      this.saveSlotForm.value.multipleDays = '';
      this.saveSlotForm.value.slotValue = '';
      // this.finalDays = [0];
      this.multiSlots[0].checked = true;
      this.multiSlots[1].checked = false;
    }
    // this.saveSlotForm.value.slotValue = '4';
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) {
      this.saveSlotForm.controls['slotValue'].patchValue('4');
      this.checkboxName = "Disable Multiple Slots";
    }
    else {
      this.checkboxName = "Enable Multiple Slots";
      this.saveSlotForm.controls['slotValue'].patchValue('');
    }
    console.log(this.saveSlotForm);
  }


  toggle1(value) {
    if (!value.checked) {
      this.daysClicked = false;
      this.showbooking = false;
      this.saveSlotForm.controls['multipleDays'].patchValue('');
      this.finalDays = [0];
      this.toDateFromEvent = undefined;
      this.dateDiff = 0;
    }
    console.log(this.saveSlotForm)
    this.showbookingform = !this.showbookingform;
    if (this.showbookingform)
      this.checkboxName1 = "Disable Multiple Days";
    else
      this.checkboxName1 = "Enable Multiple Days";
  }

  getSlotStatus(slot, data) {
    if (data.isBooked && slot === 'Booked' && data.feedbackStatus === null) {
      return true;
    }
    else if (data.isBooked && slot === 'Interviewed' && data.feedbackStatus !== null) {
      return true;
    }
    else if (!data.isBooked && slot === 'Interviewer Required' && !data.interviewerRequired) {
      return true;
    }
    else if (data.interviewerRequired && slot === 'Interviewer Availability') {
      return true;
    }
  }

  finalDate(start, end) {
    console.log()
    let date = [] = start.toString().split(" ");
    return date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3] +
      ' ' + new Date(start).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ' - ' +
      new Date(end).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }

  selectedtab(tabData, tabTitle) {
    console.log("tabData", tabData, tabTitle);
    if (tabTitle === 'Interviewer Availability' && this.recruiterFlag) {

      this.recruiterCalendarId = tabData.calendarId;
      let time = new Date(tabData.start).getHours().toString() + ':' + new Date(tabData.start).getMinutes().toString()
      let control = this.saveSlotForm.controls;
      control.name.setValue(tabData.candidateName);
      control.interviewTypeControl.setValue(tabData.interviewTypeId.toString());
      control.buControl.setValue(tabData.buId.toString());
      control.timeSlot.setValue(time.toString());
      control.technologyControl.setValue(tabData.technologyId.toString());
      control.comments.setValue(tabData.comments ? tabData.comments : '');
      this.fetchInterviewer(Number(tabData.interviewTypeId),
        Number(tabData.technologyId), Number(tabData.buId), time.toString());
    }
  }



  deleteSlot(id) {
    console.log("id", id);
    this.calendarIdArray = [];
    if (id != null) {
      this.calendarIdArray.push(id)
    }
    const dialogRef1 = this.dialog.open(ConfirmationComponent, {
      width: "450px",
      data: {
        idArray: this.calendarIdArray,
        email: this.email,
        role: this.userRole
      }
    });
    dialogRef1.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      if (result === "Deleted") {
        // this.spinner.show();
        setTimeout(() => {
          this.deleteSlotTemporary();
        }, 500);
        this.toastr.success('Slot Deleted Successfully');
        // this.dialogRef.close(this.userRole + 'success');
      }
    });
  }

  deleteSlotEvent(event, data) {
    console.log(event);
    console.log(this.tabs);
    this.calendarIdArray = [];
    this.tabs.forEach(tab => {
      if (tab.value === 'Available') {
        tab.event.forEach(slot => {
          if (slot.isDeleteSelected) {
            this.calendarIdArray.push(slot.calendarId)
            this.showDelete = true;
            this.showDeleteMessage = false;
            this.eventLength = tab.event.length;
            this.deleteSLotLength = this.calendarIdArray.length;
            if (this.deleteSLotLength === this.eventLength) {
              this.checkBoxSelect = true;
              console.log("CHECK", this.checkBoxSelect);
            }
            else {
              this.checkBoxSelect = false;
              console.log("CHECKELSE", this.checkBoxSelect);
            }

          }
          else {
            this.calendarIdArray = [];
            this.showDeleteMessage = false;
          }
        });
      }
    });
    console.log("this.calendarIdArray", this.calendarIdArray);
  }

  editSlot(data) {
    console.log(data);
    // this.spinner.show();
    // this.spinner.show('mySpinner', {
    //   type: 'line-scale-party', 
    //   size: 'large', 
    //   bdColor: 'rgba(100,149,237, .8)', 
    //   color: 'white'
    // });
    this.isRescheduleFlag = true;
    this.calendarId = data.calendarId;
    // let value = this.saveSlotForm.value;
    let time = new Date(data.start).getHours().toString() + ':' + new Date(data.start).getMinutes().toString()
    let control = this.saveSlotForm.controls;
    if (new Date(data.start).getHours().toString() === '12') {
      time = time + ' ' + 'pm'
    }
    control.timeSlot.setValue(time.toString());
    control.comments.setValue(data.comments ? data.comments : '');

    if (this.userRole === 'Interviewer') {
      control.participationType.setValue(data.participationType);
    } else {
      control.interviewTypeControl.setValue(data.interviewTypeId.toString());
      control.buControl.setValue(data.buId.toString());
      control.technologyControl.setValue(data.technologyId.toString());
      control.name.setValue(data.candidateName);
      this.fetchInterviewer(Number(data.interviewTypeId),
        Number(data.technologyId), Number(data.buId), time.toString());
    }
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 500)
    this.dialogTitle = "Reschedule Slot";

  }

  multiSlotsEvent(slot, index) {
    console.log(slot);
    slot.checked = !slot.checked;
    this.saveSlotForm.controls['slotValue'].patchValue(slot.value.toString(), { onlySelf: true, emitEvent: false });
    let i;
    if (index === 0) i = 1;
    else i = 0;
    if (this.multiSlots[i].checked) this.multiSlots[i].checked = false;
  }

  dateDifference(from, to) {
    let newToDate = new Date(to).getTime();
    let newFromDate = new Date(from).getTime();
    console.log('calculating date diff ', newToDate, newFromDate, (newToDate - newFromDate) / (24 * 60 * 60 * 1000))
    return (newToDate - newFromDate) / (24 * 60 * 60 * 1000);
  }

  deleteMultipleSlot() {
    console.log("i m here at delete");
    this.calendarIdArray = [];
    this.tabs[1].event.forEach(slot => {
      if (slot.isDeleteSelected) {
        this.calendarIdArray.push(slot.calendarId)
      }
    });
    console.log('calendarIdArray ', this.calendarIdArray);
    if (this.calendarIdArray.length > 0) {
      this.showDeleteMessage = false;
      const dialogRef1 = this.dialog.open(ConfirmationComponent, {
        width: "450px",
        data: {
          idArray: this.calendarIdArray,
          email: this.email,
          role: this.userRole
        }
      });
      dialogRef1.afterClosed().subscribe(result => {
        console.log("The dialog was closed");
        if (result === "Deleted") {
          // this.spinner.show();
          setTimeout(() => {
            this.deleteSlotTemporary();
          }, 500);
          this.toastr.success('Slot Deleted Successfully');
          // this.dialogRef.close(this.userRole + 'success');
        }
      });
    } else {
      this.showDeleteMessage = true;
    }
  }

  deleteSlotTemporary() {
    this.isRefreshDeletedEvents = true;
    let a;
    this.tabs[1].event = this.tabs[1].event.filter(slot => {
      a = -1;
      this.calendarIdArray.forEach(id => {
        if (slot.calendarId === id) {
          a = 0;
          return;
        }
      });
      if (a === -1) {
        return slot;
      }
    }).map(event => {
      return {
        ...event,
        availableCount: event.availableCount - this.calendarIdArray.length
      }
    })
    this.tabs[1].slotCount = this.tabs[1].event.length > 0 ? this.tabs[1].event[0].availableCount : 0;
    console.log('tabs ', this.tabs[1].event);
    let tabsArray = -1;
    if (this.tabs[1].event.length > 0) {
      tabsArray = this.tabs[1].event[0];
    }
    else {
      this.showDeleteMessage = true;
      this.tabs.forEach((tab, index) => {
        if (tab.event.length > 0) {
          this.tabs[index].event[0].availableCount = 0;
          tabsArray = tab.event[0];
          return;
        }
      });
    }
    console.log('tabs array ', tabsArray);
    if (tabsArray !== -1) this.tabIndex = this.getMaximumSlotCount(tabsArray);
    else this.dialogRef.close(this.userRole + 'success');
    console.log("tabIndex", this.tabIndex);
    // this.spinner.hide();
    // this.dialogRef.close(this.userRole + 'success');
  }

  toDateClick(event) {
    console.log(event);

    this.showbooking = true;
    let toDate = event.value._d;
    this.toDateFromEvent = toDate;
    let dateDiff = this.dateDifference(this.data.date, toDate);
    this.dateDiff = dateDiff + 1;
    console.log(dateDiff);
    console.log(this.days);

    this.days.forEach(day => {
      day.checked = false;
      day.selected = false;
    })
    this.daysClicked = false;
    if (this.dateDiff >= 1) {
      let index = new Date(this.data.date).getDay();
      console.log('from date index', index);
      for (let i = 0; i < this.dateDiff; i++) {
        if (index > this.days.length - 1) {
          index = 0;
        }
        this.days[index].checked = true;
        this.days[index].selected = true;
        this.finalDays[index] = 1;
        index++;
      }
      console.log(this.days)
    }
    console.log('final days on toDate clicked ', this.days);
  }

  feedBack(event) {
    let obj = {};
    if (this.userRole === 'Interviewer') {
      obj = {
        interviewTypeId: event.interviewTypeId,
        calendarId: event.calendarId,
        recruiterCalendarId: 0
      }
    } else {
      obj = {
        interviewTypeId: event.interviewTypeId,
        recruiterCalendarId: event.calendarId,
        calendarId: 0
      }
    }
    this.spinner.show();
    this.service.getCalendarId(event.calendarId);
    this.service.getFeedbackForm(obj);
    this.service.feedbackFormEmitter.subscribe(res => {
      console.log('response ', res);
      if (res.flag) {
        this.dialogRef.close(event);
      } else this.toastr.error('', 'No Feedback !!');
      this.spinner.hide();
    })
  }

}

