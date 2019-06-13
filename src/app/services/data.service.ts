import { Injectable, EventEmitter } from '@angular/core';
import { Subject, ReplaySubject, of } from 'rxjs';
import { BookingEvent, LookupEvent } from '../Shared/dataModal/bookingSlot.modal';
import { CalendarEventAction, CalendarEvent } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { map, filter } from 'rxjs/operators';
import { LoaderMobileService } from './loader-mobile.service';

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
@Injectable({
  providedIn: 'root'
})
export class DataService {
  // link: string = "http://108.128.179.35:8000";
  // registerLink: string = "http://108.128.179.35:8000"

  link: string = "http://3.209.34.157:8080";
  registerLink: string = "http://3.209.34.157:8082"

  secondsInString: string;
  userRole: string;
  email: any;
  deviceWidth: number;
  calendarId: any;
  participationId: any;
  recruitersEvents: BookingEvent[] = [];
  interviewTypeArray: LookupEvent[] = [];
  technologyArray: LookupEvent[] = [];
  buArray: LookupEvent[] = [];
  allInterviewersSlot = [];
  eventsReplica = [];
  feedbackDetails = [];
  candidateDetails = [];
  technicalevalutionData = [];
  eventEmitterForEvent = new EventEmitter<any>();

  eventEmitterForLookup = new EventEmitter<any>();
  isIntAvailableEmitter = new EventEmitter<any>();
  feedbackFormEmitter = new EventEmitter<any>();
  eventEmitterFormenuFilter = new EventEmitter<any>();
  eventEmitterForBookingForm = new EventEmitter<any>();
  feedbackSuccessEmitter = new EventEmitter<any>();

  prevSubject: Subject<any> = new Subject();
  nextSubject: Subject<any> = new Subject();
  todaySubject: Subject<any> = new Subject();
  viewSubject: Subject<any> = new Subject();
  panelAvailability: ReplaySubject<any> = new ReplaySubject(1);
  slotSubject: ReplaySubject<any> = new ReplaySubject(1);
  deleteSlotSubject: ReplaySubject<any> = new ReplaySubject(1);
  selectedDateSubject: ReplaySubject<any> = new ReplaySubject(1);
  bookingDateInfoSubject: ReplaySubject<any> = new ReplaySubject(1);
  filterSubject: ReplaySubject<any> = new ReplaySubject(1);
  refreshSubjectFromBookingForm: ReplaySubject<any> = new ReplaySubject(1);
  resetLoginInfo: ReplaySubject<any> = new ReplaySubject(1);
  eventEmitterForEventInterviewer: ReplaySubject<any> = new ReplaySubject(1);
  eventEmitterForEventRecruiter: ReplaySubject<any> = new ReplaySubject(1);
  eventEmitterForReports = new EventEmitter<any>();
  roleSubject: ReplaySubject<any> = new ReplaySubject(1);
  userDataSubject: ReplaySubject<any> = new ReplaySubject(1);
  headerDateSubject: ReplaySubject<any> = new ReplaySubject(1);

  isPanelAvailability: boolean = false;
  completeReportArray: any;
  availableArray = []
  interviewedArray = [];
  bookedArray = [];
  notInterviewedArray = [];

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action);
    console.log(event);
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  week = [{
    "id": 0,
    "day": "Sun"
  }, {
    "id": 1,
    "day": "Mon"
  }, {
    "id": 2,
    "day": "Tue"
  }, {
    "id": 3,
    "day": "Wed"
  }, {
    "id": 4,
    "day": "Thu"
  }, {
    "id": 5,
    "day": "Fri"
  }, {
    "id": 6,
    "day": "Sat"
  }];

  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  events: BookingEvent[] = [];

  constructor(private http: HttpClient,
    private storage: Storage,
    private platform: Platform,
    public loader: LoaderMobileService) {
    this.deviceWidth = this.platform.width();
  }

  getAllInterviewerSlots() {
    this.events = [];
    this.email = localStorage.getItem("email");
    // this.storage.get('email').then((val) => {
    // this.email = val;

    let url: string;
    if (environment.idDummyJson) {
      url = "./assets/xyz.json"
    } else {
      url = `${this.link}/interviewer/getAllInterviewerSlots`
    }

    if (this.deviceWidth < 768) {
      this.loader.show("Fetching your slots !!");
    }

    this.http.post(url, {
      "email": this.email
    }).subscribe(res => {
      this.allInterviewersSlot = res["response"]["0"];
      console.log(this.allInterviewersSlot);
      let color: any;
      if (this.allInterviewersSlot.length > 0) {
        this.allInterviewersSlot.forEach(interviewerSlot => {
          let availableCount: number = 0;
          let bookedCount: number = 0;
          let interviewedCount: number = 0;
          let interviewerAvailabilityCount: number = 0;
          let date = new Date(interviewerSlot.slot.from);
          let formattedDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`

          this.allInterviewersSlot.forEach(slotData => {
            let currentDate = new Date(slotData.slot.from)
            let formattedCurrentDate = `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}`

            if (formattedDate === formattedCurrentDate) {
              if (slotData.booked) {
                if (slotData.details) {
                  if (slotData.details.feedbackStatus !== "" && slotData.details.feedbackStatus !== undefined && slotData.details.feedbackStatus !== null) {
                    interviewedCount = interviewedCount + 1;
                  } else {
                    bookedCount = bookedCount + 1;
                  }
                } else {
                  bookedCount = bookedCount + 1;
                }
              } else {
                availableCount = availableCount + 1;
              }
            }
          });


          if (interviewerSlot.booked) {
            if (interviewerSlot.details) {
              if (interviewerSlot.details.feedbackStatus !== "" && interviewerSlot.details.feedbackStatus !== undefined && interviewerSlot.details.feedbackStatus !== null) {
                color = colors.green;
              } else {
                color = colors.pink;
              }
            } else {
              color = colors.pink;
            }
          } else {
            color = colors.grey;
          }

          let object = {
            id: interviewerSlot.id,
            start: new Date(interviewerSlot.slot.from),
            end: new Date(interviewerSlot.slot.to),
            title: "",
            color: color,
            buId: interviewerSlot.interviewDetails ? interviewerSlot.interviewDetails.buId : null,
            candidateName: interviewerSlot.details ? interviewerSlot.details.candidateName : null,
            technologyName: interviewerSlot.details ? interviewerSlot.details.technology.technologyName : null,
            technologyId: interviewerSlot.details ? interviewerSlot.details.technology.technologyId : null,
            interviewTypeName: interviewerSlot.details ? interviewerSlot.details.interviewType.typeName : null,
            interviewTypeId: interviewerSlot.details ? interviewerSlot.details.interviewType.interviewTypeId : null,
            interviewerName: interviewerSlot.interviewDetails ? interviewerSlot.interviewDetails.name : null,
            interviewerEmpId: interviewerSlot.interviewDetails ? interviewerSlot.interviewDetails.empId : null,
            interviewerEmail: interviewerSlot.interviewDetails ? interviewerSlot.interviewDetails.email : null,
            interviewerGrade: interviewerSlot.interviewDetails ? interviewerSlot.interviewDetails.grade : null,
            interviewerLocation: "",
            interviewerSkills: "",
            participationType: interviewerSlot.participationTypeId,
            isBooked: interviewerSlot.booked,
            calendarId: interviewerSlot.calendarId,
            feedbackStatus: interviewerSlot.details ? interviewerSlot.details.feedbackStatus : null,
            recruiterName: interviewerSlot.details ? interviewerSlot.details.recruiterName : null,
            comments: interviewerSlot.details ? interviewerSlot.details.comments : null,
            organization: interviewerSlot.interviewDetails ? interviewerSlot.interviewDetails.organization : null,
            interviewerRequired: false,
            timestamp: new Date(interviewerSlot.slot.to).getTime(),
            availableCount: availableCount,
            bookedCount: bookedCount,
            interviewedCount: interviewedCount,
            interviewerAvailabilityCount: interviewerAvailabilityCount
          }
          this.events.push(object);
        });


        if (this.deviceWidth < 768) {
          this.loader.hide();
        }
        this.eventEmitterForEvent.emit({
          flag: true
        });

      }

      this.sortEvents(this.events);
      console.log(this.events);
      this.eventEmitterForEventInterviewer.next({
        flag: true
      });
      this.eventEmitterForBookingForm.emit({
        flag: "fromBookingForm"
      });
    })
    // })
  }


  getAllRecruitersSlots() {
    this.events = [];
    this.email = localStorage.getItem("email");
    // this.storage.get('email').then((val) => {
    // this.email = val;

    console.log("environment", environment);

    let url: string;
    if (environment.idDummyJson) {
      console.log("environment.idDummyJson", environment.idDummyJson);

      url = "./assets/xyz.json"
    } else {
      console.log("inside else of dummyvjqehv");

      url = `${this.link}/recruiter/getAllRecruiterSlots`
    }
    if (this.deviceWidth < 768) {
      this.loader.show("Fetching your slots !!");
    }
    this.http.post(url, {
      "email": this.email
    }).subscribe(res => {
      console.log(res["response"]["0"]);

      let allRecruiters = res["response"]["0"];
      if (allRecruiters.length > 0) {
        allRecruiters.forEach(interviewerSlot => {
          let date = new Date(interviewerSlot.fromTime);
          let formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

          let availableCount: number = 0;
          let bookedCount: number = 0;
          let interviewedCount: number = 0;
          let interviewerAvailabilityCount: number = 0;

          allRecruiters.forEach(slotData => {
            let currentDate = new Date(slotData.fromTime);
            let formattedCurrentDate = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;

            if (formattedDate === formattedCurrentDate) {
              if (slotData.interviewerDto) {
                if (slotData.interviewerDto.feedbackStatus !== "" && slotData.interviewerDto.feedbackStatus !== undefined && slotData.interviewerDto.feedbackStatus !== null) {
                  interviewedCount = interviewedCount + 1;
                } else {
                  bookedCount = bookedCount + 1;
                }
              } else {
                availableCount = availableCount + 1;
              }
            }

          })

          let color: any
          if (interviewerSlot.interviewerDto) {
            if (interviewerSlot.interviewerDto.feedbackStatus !== "" && interviewerSlot.interviewerDto.feedbackStatus !== undefined && interviewerSlot.interviewerDto.feedbackStatus !== null) {
              color = colors.green;
            } else {
              color = colors.pink;
            }
          } else {
            color = colors.grey;
          }

          let object = {
            id: interviewerSlot.recruiterId,
            buId: interviewerSlot.buId,
            start: new Date(interviewerSlot.fromTime),
            end: new Date(interviewerSlot.toTime),
            title: "",
            color: color,
            candidateName: interviewerSlot.candidateName,
            technologyName: interviewerSlot.technologyName,
            technologyId: interviewerSlot.technologyId,
            interviewTypeName: interviewerSlot.interviewTypeName,
            interviewTypeId: interviewerSlot.interviewType,
            interviewerName: interviewerSlot.interviewerDto ? interviewerSlot.interviewerDto.empName : null,
            interviewerEmpId: interviewerSlot.interviewerDto ? interviewerSlot.interviewerDto.interviewerId : null,
            interviewerEmail: interviewerSlot.interviewerDto ? interviewerSlot.interviewerDto.emailId : null,
            interviewerGrade: interviewerSlot.interviewerDto ? interviewerSlot.interviewerDto.grade : null,
            interviewerLocation: interviewerSlot.interviewerDto ? interviewerSlot.interviewerDto.location : null,
            interviewerSkills: "",
            participationType: "",
            isBooked: interviewerSlot.interviewerDto !== null && interviewerSlot.interviewerDto !== undefined,
            calendarId: interviewerSlot.recruiterCalendarId,
            feedbackStatus: interviewerSlot.interviewerDto ? interviewerSlot.interviewerDto.feedbackStatus : null,
            recruiterName: interviewerSlot.recruiterName,
            feedbackComments: interviewerSlot.interviewerDto ? interviewerSlot.interviewerDto.feedbackComments : null,
            comments: interviewerSlot.comments,
            organization: interviewerSlot.organization,
            interviewerRequired: false,
            timestamp: new Date(interviewerSlot.toTime).getTime(),
            availableCount: availableCount,
            bookedCount: bookedCount,
            interviewedCount: interviewedCount,
            interviewerAvailabilityCount: interviewerAvailabilityCount
          }
          this.events.push(object);
        });
      }

      this.eventsReplica = this.events;
      this.sortEvents(this.events);


      if (this.deviceWidth < 768) {
        this.loader.hide();
      }

      this.eventEmitterForEventRecruiter.next({
        flag: true
      });
      this.eventEmitterForBookingForm.emit({
        flag: "fromBookingForm"
      });
    })
    // });
  }

  getInterviewersSlot(body) {
    let tempArray = [];
    console.log(this.events);

    let url: string;
    if (environment.idDummyJson) {
      url = "./assets/xyz.json"
    } else {
      url = `${this.link}/interviewer/getInterviewerSlots`
    }
    if (this.deviceWidth < 768) {
      this.loader.show("Fetching your slots !!");
    }
    this.http.post(url, body).subscribe(res => {
      console.log(res);
      let flag;
      let responseArray = res['response'][0];
      if (responseArray.length > 0) {
        this.events.forEach(event => {
          let interviewerAvailabilityCount: number = 0;
          let date = new Date(event.start);
          let formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

          responseArray.forEach(inter => {
            let todayTimestamp = new Date().getTime();
            let currentDate = new Date(inter.slot.from);
            let formattedCurrentDate = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;

            if (formattedDate === formattedCurrentDate && new Date(inter.slot.from).getTime() >= todayTimestamp) {
              interviewerAvailabilityCount++
            }
          });
          event.interviewerAvailabilityCount = interviewerAvailabilityCount;
        });

        responseArray.forEach(inter => {
          let interviewerAvailabilityCount1: number = 0;
          let date = new Date(inter.slot.from);
          let formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
          responseArray.forEach(inter => {
            let todayTimestamp = new Date().getTime();
            let currentDate = new Date(inter.slot.from);
            let formattedCurrentDate = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
            if (formattedDate === formattedCurrentDate && new Date(inter.slot.from).getTime() >= todayTimestamp) {
              interviewerAvailabilityCount1++
            }
          });

          let obj = {
            color: colors.yellow,
            interviewerName: inter.interviewDetails ? inter.interviewDetails.name : 'NA',
            interviewerEmpId: inter.interviewDetails ? inter.interviewDetails.empId : 'NA',
            interviewerEmail: inter.interviewDetails ? inter.interviewDetails.email : 'NA',
            interviewerGrade: inter.interviewDetails ? inter.interviewDetails.grade : 'NA',
            organization: inter.interviewDetails ? inter.interviewDetails.organization : 'NA',
            start: new Date(inter.slot.from),
            end: new Date(inter.slot.to),
            interviewerRequired: true,
            isBooked: inter.booked,
            calendarId: inter.calendarId,
            interviewTypeId: Number(body.interviewerTypeId),
            buId: inter.interviewDetails ? inter.interviewDetails.buId : 'NA',
            technologyId: inter.technologies[0].empTechId,
            interviewerAvailabilityCount: interviewerAvailabilityCount1,
            interviewerSkills: inter.technologies,
            participationType: inter.participationTypeId,
          }
          tempArray.push(obj);
        });
        this.events = this.eventsReplica.concat(tempArray);
        console.log("new events", this.events);
        flag = true;
      } else {
        flag = false;
      }

      if (this.deviceWidth < 768) {
        this.loader.hide();
      }

      this.isIntAvailableEmitter.emit({
        flag: flag
      })
    });
  }

  getInterviewersSlotCount(body) {
    return this.http.post(`${this.link}/interviewer/getInterviewerSlots`, body)
  }

  getFormattedDateString(selectedTime, selectedDate) {
    let timeData = selectedTime.split(" ");
    let dateV, dateS;
    let changeDate = timeData[0].split(':');
    if (timeData[1] === 'pm') {
      if ((changeDate[0].toString() === '12') && (changeDate[1].toString() >= '00' && changeDate[1].toString() <= '59')) {
        dateV = 12;
        dateV = dateV.toString() + ':' + changeDate[1];
        dateS = dateV + ':' + '00 GMT+0530 (India Standard Time)';
      } else {
        dateV = Number(changeDate[0]) + 12;
        dateV = dateV.toString() + ':' + Number(changeDate[1]);
        dateS = dateV + ":" + '00 GMT+0530 (India Standard Time)';
      }
    } else {
      if ((changeDate[0].toString() === '12') && (changeDate[1].toString() >= '00' && changeDate[1].toString() <= '59')) {
        dateV = '00';
        dateV = dateV.toString() + ':' + changeDate[1];
        dateS = dateV + ':' + '00 GMT+0530 (India Standard Time)';
      } else {
        dateS = timeData[0] + ":" + '00 GMT+0530 (India Standard Time)';
      }
    }
    return this.getDateString(selectedDate) + " " + dateS;
  }

  getDateString(date) {
    let d = new Date(Number(date));
    return this.week[d.getDay()].day + " " + this.months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
  }

  formatDate(timeStamp) {
    let monthsData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dayData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date = new Date(timeStamp);
    let month = date.getMonth();
    let day = date.getDay();
    let completeMonth = monthsData[month];
    let completeDate = dayData[day];
    let formattedDate = completeDate + ' ' + date.getDate() + ' ' + completeMonth + ' ' + date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let flagForAMPM = '';
    let minutesInString: string = minutes.toString();


    if (hours > 12) {
      var hourSet = 1;
      hours = hours - 12;
      flagForAMPM = 'PM';
    } else if (hours === 12) {
      flagForAMPM = 'PM';
    } else if (hours === 0) {
      hours = 12;
      flagForAMPM = 'AM';
    } else {
      flagForAMPM = 'AM';
    }
    if (minutes < 10) {
      minutesInString = 0 + minutes.toString();
    }
    if (seconds < 10) {
      this.secondsInString = 0 + seconds.toString();
    }
    var formattedTime = hours + ':' + minutesInString + ' ' + flagForAMPM;
    return {
      "date": formattedDate,
      "time": formattedTime
    };
  }

  getFeedbackForm(body) {

    let url: string;
    if (environment.idDummyJson) {
      url = "./assets/xyz.json"
    } else {
      url = `${this.link}/recruiter/feedbackForm`
    }
    if (this.deviceWidth < 768) {
      this.loader.show("Fetching your slots !!");
    }

    this.http.post(url, body).subscribe(res => {
      let arr = res['response'];
      let flag;
      if (arr.length > 0) {
        this.feedbackDetails = arr[0].feedbackFormDTO;
        this.candidateDetails = arr[0].formDetailsDTO;
        let technicalDetailsData = arr[0].feedbackFormDTO[1];
        let evalution = [];
        console.log("tableData", technicalDetailsData.feedbackSubFormDTOs);

        technicalDetailsData.feedbackSubFormDTOs.forEach(data => {
          let tableDataArray = [];
          let dynamicArray = [];
          let count = 0;
          if (data.feedbackSubFormDTOs.length === 0) {
            tableDataArray = [];
            dynamicArray = [];
            count = 0;
          } else {
            data.feedbackSubFormDTOs.forEach((data1, index) => {
              if (data1.feedbackSubFormDTOs.length === 0) {
                console.log(data1.feedbackSubFormDTOs.length);
              } else {
                data1.feedbackSubFormDTOs.forEach(data2 => {
                  if (data2.feedbackSubFormDTOs.length === 0) {
                    console.log(data2.feedbackSubFormDTOs.length);
                  } else {
                    data2.feedbackSubFormDTOs.forEach(data3 => {
                      if (data3.feedbackSubFormDTOs.length === 0) {
                        console.log(data3.feedbackSubFormDTOs.length);
                      } else {
                        data3.feedbackSubFormDTOs.forEach(data4 => {
                          if (data3.feedbackSubFormDTOs.length === 0) {
                            console.log(data3.feedbackSubFormDTOs.length);
                          } else {
                            if (index === 2) count++;
                            if (data1.isButton) {
                              dynamicArray.push({
                                "showRow": count === 1,

                                "col1_formDetailId": data1.formDetailId,
                                "col1_heading": data1.heading,
                                "col1_isRequired": data1.isRequired,
                                "col1_dataType": data1.dataType,
                                "col1_dropdownHint": data1.dropdownHint,
                                "col1_description": data1.description,
                                "col1_isButton": data1.isButton,
                                "col1_response": data1.response ? data1.response : '',

                                "col2_formDetailId": data2.formDetailId,
                                "col2_heading": data2.heading,
                                "col2_isRequired": data2.isRequired,
                                "col2_dataType": data2.dataType,
                                "col2_dropdownHint": data2.dropdownHint,
                                "col2_description": data2.description,
                                "col2_isButton": data2.isButton,
                                "col2_response": data2.response ? data2.response : '',

                                "col3_formDetailId": data3.formDetailId,
                                "col3_heading": data3.heading3,
                                "col3_isRequired": data3.isRequired,
                                "col3_dataType": data3.dataType,
                                "col3_dropdownHint": data3.dropdownHint,
                                "col3_description": data3.description,
                                "col3_isButton": data3.isButton,
                                "col3_response": data3.response ? Number(data3.response) : '',

                                "col4_formDetailId": data4.formDetailId,
                                "col4_heading": data4.heading,
                                "col4_isRequired": data4.isRequired,
                                "col4_dataType": data4.dataType,
                                "col4_dropdownHint": data4.dropdownHint,
                                "col4_description": data4.description,
                                "col4_isButton": data4.isButton,
                                "col4_response": data4.response ? data4.response : '',
                              });

                            }

                            if (count === data1.feedbackSubFormDTOs.length || index !== 2 || !data1.isButton) {
                              tableDataArray.push({
                                "col1_formDetailId": data1.formDetailId,
                                "col1_heading": data1.heading,
                                "col1_isRequired": data1.isRequired,
                                "col1_dataType": data1.dataType,
                                "col1_dropdownHint": data1.dropdownHint,
                                "col1_description": data1.description,
                                "col1_isButton": data1.isButton,
                                "col1_response": data1.response ? data1.response : '',

                                "col2_formDetailId": data2.formDetailId,
                                "col2_heading": data2.heading,
                                "col2_isRequired": data2.isRequired,
                                "col2_dataType": data2.dataType,
                                "col2_dropdownHint": data2.dropdownHint,
                                "col2_description": data2.description,
                                "col2_isButton": data2.isButton,
                                "col2_selected": data2.dataType === 'Dropdown' ? false : null,
                                "col2_dynamic": data2.dataType === 'Dropdown' ? dynamicArray : null,
                                "col2_response": data2.response ? data2.response : '',

                                "col3_formDetailId": data3.formDetailId,
                                "col3_heading": data3.heading3,
                                "col3_isRequired": data3.isRequired,
                                "col3_dataType": data3.dataType,
                                "col3_dropdownHint": data3.dropdownHint,
                                "col3_description": data3.description,
                                "col3_isButton": data3.isButton,
                                "col3_response": data3.response ? Number(data3.response) : '',

                                "col4_formDetailId": data4.formDetailId,
                                "col4_heading": data4.heading,
                                "col4_isRequired": data4.isRequired,
                                "col4_dataType": data4.dataType,
                                "col4_dropdownHint": data4.dropdownHint,
                                "col4_description": data4.description,
                                "col4_isButton": data4.isButton,
                                "col4_response": data4.response ? data4.response : '',

                              });
                            }
                          }
                        })
                      }
                    })

                  }
                })
              }
            })
          }
          let object = {
            "mainHeading": data.heading,
            "tableData": tableDataArray
          }
          evalution.push(object)
        });
        this.technicalevalutionData = evalution
        console.log("evalution", evalution);
        flag = true;
      } else flag = false;

      if (this.deviceWidth < 768) {
        this.loader.hide();
      }

      this.feedbackFormEmitter.emit({
        flag: flag
      })

    });
  }

  getlookUpData() {
    this.http.get(`${this.link}/lookup/fetchDropdown?screenId=1`).subscribe(res => {
      let resp = [] = res['response'][0];
      resp.forEach(r => {
        if (r.dropdownName === 'interviewtype') {
          let that = this;
          that.interviewTypeArray = [];
          Object.keys(r.dropdown).forEach(function (key) {
            that.interviewTypeArray.push({
              id: Number(key),
              name: r.dropdown[key]
            });
          });

        }
        else if (r.dropdownName === 'technology') {
          let that = this;
          that.technologyArray = [];
          Object.keys(r.dropdown).forEach(function (key) {
            that.technologyArray.push({
              id: key,
              name: r.dropdown[key]
            });
          });
        }
        else if (r.dropdownName === 'BU') {
          let that = this
          that.buArray = [];
          Object.keys(r.dropdown).forEach(function (key) {
            that.buArray.push({
              id: key,
              name: r.dropdown[key]
            });
          });

        }
      });
      this.eventEmitterForEvent.emit({
        flag: true
      });

      this.eventEmitterForLookup.emit({
        flag: true
      });

    })
  }


  sortEvents(events) {
    this.events = events.sort(function (a, b) {
      if (new Date(a.start).getTime() < new Date(b.start).getTime()) return -1;
      if (new Date(a.start).getTime() > new Date(b.start).getTime()) return 1;
      return 0;
    });
  }


  getEmployeeRole(emailDto) {
    return this.http.post(`${this.link}/role/getEmployeeRole`, emailDto);
  }

  registerUser(userDto) {
    return this.http.post(`${this.registerLink}/register/registerUser`, userDto);
  }
  getGrades() {
    return this.http.get(`${this.link}/lookup/grade`);
  }

  getMarketUnitByBu(buId) {
    return this.http.get(`${this.link}/lookup/fetchMarketUnit?buId=${buId}`);
  }

  getAccountByMu(marketUnitDto) {
    return this.http.post(`${this.link}/lookup/fetchAccountsByMu`, marketUnitDto);
  }
  saveFreeSlot(body) {
    return this.http.post(`${this.link}/interviewer/saveFreeSlot`, body);
  }

  deleteInterviewSlot(calendarId) {
    return this.http.get(`${this.link}/interviewer/deleteInterviewSlot?calenderId=${calendarId}`);
  }

  fetchDropdowns(screenId) {
    return this.http.get(`${this.link}/lookup/fetchDropdown?screenId=${screenId}`);
  }

  getInterviewerForRecruiter(body) {
    return this.http.post(`${this.link}/interviewer/interviewerDropdown`, body);
  }
  rescheduleRecruiterSlot(body) {
    return this.http.post(`${this.link}/recruiter/rescheduleSlot`, body);
  }

  setIsPanelAvailabilityBool(flag) {
    this.isPanelAvailability = flag;
  }

  saveRecruiterSlot(slotDto) {
    return this.http.post(`${this.link}/recruiter/saveInterviewSlot`, slotDto);
  }
  deleteInterviewerSlot(id) {
    return this.http.get(`${this.link}/interviewer/deleteInterviewSlot?calenderId=` + id);
  }
  deleteRecruiterslot(body) {
    return this.http.post(`${this.link}/recruiter/deleteSlot`, body);
  }


  setPrevData(data) {
    this.prevSubject.next(data);
  }
  setNextData(data) {
    this.nextSubject.next(data);
  }
  setTodayData(data) {
    this.todaySubject.next(data);
  }

  setHeaderDate(data) {
    this.headerDateSubject.next(data);
  }

  setViewForToolbar(data) {
    this.viewSubject.next(data);
  }

  setSlotInfo(data, date) {
    this.slotSubject.next(data);
    this.selectedDateSubject.next(date);
  }

  setPanelAvailability(data) {
    this.panelAvailability.next(data);
  }

  setBookingDataForBookingForm(data) {
    this.bookingDateInfoSubject.next(data);
  }

  setFilteredData(data) {
    this.filterSubject.next(data);
  }

  setRole(role) {
    this.roleSubject.next(role);
  }

  deleteSlot(slots) {
    this.deleteSlotSubject.next(slots);
  }

  setRefreshDataFromBookingForm(data) {
    this.refreshSubjectFromBookingForm.next(data);
  }

  clearLoginInfo(flag) {
    this.resetLoginInfo.next(flag);
  }

  getCalendarId(id) {
    this.calendarId = id;
  }

  saveUserData(data) {
    this.userDataSubject.next(data);
  }

  saveFeedbackForm(obj) {
    return this.http.post(`${this.link}/interviewer/saveFeedback`, obj);
  }

  getFeedbackRating() {
    return this.http.get(`${this.link}/lookup/rating`);
  }

  getFeedbackStatusArray() {
    return this.http.get(`${this.link}/lookup/feedback`);
  }
  setParticipationId(id) {
    this.participationId = id;
  }


  downloadReport(start, end, techArr, downloadId, filterDay, buId, accountArr) {
    console.log('techArr', techArr);
    let url = 'http://3.209.34.157:8080/report/generateReport?fromTime=' + start + '&toTime=' + end + '&techId=[' + techArr + ']&interviewTypeId=0&downloadId=' + downloadId + '&filterDaysId=' + filterDay + '&buId=' + buId + '&accountStr=[' + accountArr + ']';
    console.log(url);
    this.createHiperlink(url);
  }

  createHiperlink(url) {
    let link = document.createElement('a');
    link.setAttribute('download', null);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.setAttribute('href', url);
    link.click();
    console.log('link', link);
    document.body.removeChild(link);
  }

  getReportsCompleteData(reportDto) {
    this.http.post(`${this.link}/interviewer/generateCombinedReport`, reportDto).subscribe(res => {
      console.log("reports", res);

      this.availableArray = [];
      this.bookedArray = [];
      this.interviewedArray = [];
      this.notInterviewedArray = [];
      this.completeReportArray = res['response'][0];
      // let that = this;
      this.completeReportArray.forEach(report => {
        if (report.status === 'AVAILABLE') {
          report['totalCount'] = this.count(report.slotsDTO);
          this.availableArray.push(report);
        }
        if (report.status === 'BOOKED') {
          report['totalCount'] = this.count(report.slotsDTO);
          this.bookedArray.push(report);
        }
        if (report.status === 'INTERVIEWED') {
          report['totalCount'] = this.count(report.slotsDTO);
          this.interviewedArray.push(report);
        }
        if (report.status === 'NOT INTERVIEWED') {
          report['totalCount'] = this.count(report.slotsDTO);
          this.notInterviewedArray.push(report);
        }
      });

      this.eventEmitterForReports.emit({
        flag: true
      });

    })
  }

  count(report) {
    let arr = [], l1sum = 0, l2sum = 0;
    report.forEach(r => {
      if (r.interviewerType === 'L1') {
        l1sum += r.interviewerCount;
      } else if (r.interviewerType === 'L2') {
        l2sum += r.interviewerCount;
      }
    });
    arr.push(l1sum);
    arr.push(l2sum);
    return arr;
  }

  downloadFeedbackForm(recruiterCalendarId, interviewerCalendarId) {
    console.log(recruiterCalendarId, interviewerCalendarId, this.participationId);
    const url = `${this.link}/report/generatePdf?interviewTypeId=` + this.participationId + "&recruiterCalendarId=" + recruiterCalendarId + "&interviewerCalendarId=" + interviewerCalendarId;

    this.createHiperlink(url);

  }

  commonMonth(number) {
    let month = "";
    switch (number) {
      case 0:
        month = "Jan";
        break;
      case 1:
        month = "Feb";
        break;
      case 2:
        month = "Mar";
        break;
      case 3:
        month = "Apr";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "Jun";
        break;
      case 6:
        month = "Jul";
        break;
      case 7:
        month = "Aug";
        break;
      case 8:
        month = "Sep";
        break;
      case 9:
        month = "Oct";
        break;
      case 10:
        month = "Nov";
        break;
      case 11:
        month = "Dec";
        break;
    }
    return month;
  }


}
