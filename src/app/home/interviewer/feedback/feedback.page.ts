import { ToastrMobileService } from './../../../services/toastr-mobile.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedFeedback } from '../../../Shared/model/sharedFeedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage extends SharedFeedback implements OnInit {
  slideOpts = {
    effect: 'flip'
  };
  candidateFormDetails: any;
  dynamicFeedBackForm: any;
  feedbackRating: any;
  feedbackStatusData: any = [];;
  email: string = '';
  candidateDetailsII: any;
  isInterviewer: boolean = false; // temporary change to true
  showNextTechRow: boolean = false;
  // allowSubmitForm: boolean = false;
  isFormEditable: boolean = false;
  role: string;
  technicalEvalutionArray = [];
  interviewModeArray = [];
  technologyArray = [];
  indexArray = [];
  customRemarkOptions: any = {
    header: 'Remark',
  };
  customRatingOptions: any = {
    header: 'Rating',
  };
  customTechnologyOptions: any = {
    header: 'Technology',
  };
  calendarInfo = {};

  constructor(private data: DataService, private storage: Storage,
    private toastr: ToastrMobileService, private router: Router) {
    super();

    // this.data.getDummyFeeddbackJson();
    // this.data.feedbackFormEmitter.subscribe(res => {
    //   console.log(res);
    //   this.dynamicFeedBackForm = this.data.feedbackDetails[2];
    //   this.candidateFormDetails = this.data.candidateDetails;
    //   this.feedbackStatus = this.candidateFormDetails.feedbackStatus;
    //   this.technicalEvalutionArray = this.data.technicalevalutionData;
    //   console.log("details", this.dynamicFeedBackForm);
    //   console.log(this.candidateFormDetails);
    //   console.log(this.technicalEvalutionArray);
    //   if (this.candidateFormDetails.feedbackStatus === 3 || this.candidateFormDetails.feedbackStatus === 0) {
    //     this.isFormEditable = false; // temporary change
    //   }
    //   else {
    //     this.isFormEditable = false;
    //   }

    //   console.log('editable form', this.isFormEditable);


    //   console.log('editable form', this.isFormEditable);
    //   if (this.candidateFormDetails.feedbackStatus === 3) {
    //     this.technicalEvalutionArray.forEach(tech => {
    //       tech.tableData.forEach(tech1 => {
    //         if (tech1.col2_dynamic) {
    //           tech1.col2_dynamic.forEach(tech2 => {
    //             if (tech2.col2_response !== '') this.indexArray.push(0);
    //           });
    //         }
    //       });
    //     })
    //   }
    //   console.log("index array", this.indexArray)

    // })

    console.log("first time loaded");
    this.role = localStorage.getItem("role");
    // this.storage.get('role').then(val => {
    console.log(this.role);
    if (this.role === 'Interviewer') {
      this.isInterviewer = true;
    } else {
      this.isInterviewer = false;
    }
    // });
    let feedBackInputData = localStorage.getItem("feedBackInputDto");
    // this.storage.get('feedBackInputDto').then(val => {
    console.log(feedBackInputData);

    this.calendarInfo = JSON.parse(feedBackInputData);
    console.log("this.calendarInfo", this.calendarInfo);

    this.data.getFeedbackForm(JSON.parse(feedBackInputData));
    this.data.feedbackFormEmitter.subscribe(res => {
      console.log(res);
      console.log(this.data.feedbackDetails);

      this.dynamicFeedBackForm = this.data.feedbackDetails[2];
      this.candidateFormDetails = this.data.candidateDetails;
      this.candidateDetailsII = this.data.feedbackDetails[0];

      this.technicalEvalutionArray = this.data.technicalevalutionData;
      console.log("details", this.dynamicFeedBackForm);
      console.log(this.candidateFormDetails);
      console.log(this.technicalEvalutionArray);
      if (this.candidateFormDetails.feedbackStatus === 3 || this.candidateFormDetails.feedbackStatus === 0) {
        this.isFormEditable = false;
      }
      else {
        this.isFormEditable = true;
      }
    })
    // });

  }

  ngOnInit() {

    this.data.getFeedbackRating().subscribe(res => {
      console.log('ratings', res);
      this.feedbackRating = res;
    });

    this.data.eventEmitterForLookup.subscribe(res => {
      if (res.flag) {
        this.technologyArray = this.data.technologyArray;
        this.interviewModeArray = this.data.interviewTypeArray;
        console.log(this.interviewModeArray);
        console.log(this.technologyArray);

      }
    });
    this.data.getlookUpData();

    this.data.getFeedbackStatusArray().subscribe(res => {
      console.log("feedback status", res);
      this.feedbackStatusData = res;
    });

  }


  addTechRow(completeData) {
    console.log(completeData);
    let dataIndex;

    for (let i = 0; i < completeData.length; i++) {
      if (!completeData[i].showRow && completeData[i].col2_response === '') {
        dataIndex = i;
        break;
      }
    }
    if (dataIndex) {
      completeData[dataIndex].showRow = true;
    }
  }

  feedbackSubmit() {
    let feedbackCalendarId = this.calendarInfo["calendarId"];
    this.commonFeedbackSubmit(feedbackCalendarId);
    this.dynamicFeedBackForm.feedbackSubFormDTOs.forEach(feed => {
      this.feedbackResponse.push({
        "feedbackFormId": feed.formDetailId,
        "feedbackResponse": feed.response,
        "calendarId": feedbackCalendarId
      });
    });
    this.candidateDetailsII.feedbackSubFormDTOs.forEach(details => {
      this.feedbackResponse.push({
        "feedbackFormId": details.formDetailId,
        "feedbackResponse": details.response,
        "calendarId": feedbackCalendarId
      });
    });
    let index = 0;
    this.checkSubmission.forEach(chk => {
      if (chk === '') {
        return
      }
      else index++;
    });

    if (index === this.checkSubmission.length && (this.candidateFormDetails.feedbackStatus !== '' && this.candidateFormDetails.feedbackStatus !== null && this.candidateFormDetails.feedbackStatus !== 0)) {
      this.allowSubmitForm = false;
      let obj = {
        "interviewerCalendarId": feedbackCalendarId,
        "participationId": Number(this.candidateFormDetails.participationId),
        "feedbackStatusId": this.candidateFormDetails.feedbackStatus,
        "saveFeedbackDetailsDTOs": this.feedbackResponse,
      }
      console.log('feedback body', obj);
      this.data.saveFeedbackForm(obj).subscribe(res => {
        console.log('feedback response ', res);
        if (res['response'] && res['response'].length !== 0 && res['response'][0]) {
          this.toastr.toasterNotification(res['message']);
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.toasterNotification(res['exception']);
        }
      });
    } else {
      if (index !== this.checkSubmission.length) {
        this.toastr.toasterNotification("Please fill Technical Area 1 !!");
      } else if (this.candidateFormDetails.feedbackStatus === '' || this.candidateFormDetails.feedbackStatus === null || this.candidateFormDetails.feedbackStatus === 0) {
        this.toastr.toasterNotification("Please Select Feedback status");
      }
      this.allowSubmitForm = true;
    }
  }

}
