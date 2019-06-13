import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  devWidth: any;
  email: any;
  role: any;
  recuiterFlag: boolean = false;
  pageName: string = '';
  interviewTypeId: any;
  calendarId: any;
  routerUrl: string;
  url = "https://smarthire-ms5.run.aws-usw02-pr.ice.predix.io/report/generatePdf?interviewTypeId=" + this.interviewTypeId + "&recruiterCalendarId=" + this.calendarId + "&interviewerCalendarId=0";


  constructor(private router: Router,
    private storage: Storage,
    private menu: MenuController,
    private platform: Platform,
    private service: DataService) {
    this.devWidth = this.platform.width();
    this.email = localStorage.getItem("email");
    // this.storage.get('email').then((val) => {
    //   this.email = val;
    // });
    this.role = localStorage.getItem("role");

    // this.storage.get('role').then((val) => {
    // this.role = val;
    if (this.role === 'Interviewer') {
      this.recuiterFlag = false;
    } else if (this.role === 'Recruiter') {
      this.recuiterFlag = true;
    }
    // });
  }

  ngOnInit() {
    this.routerUrl = this.router.url;
    if (this.router.url === '/report') this.pageName = 'Dashboard';
    else this.pageName = 'Reports';
  }

  interviewerCheckEvent(check) {
    this.menu.toggle('mobile');
  }

  logout() {
    this.router.navigate(["/login"]);
    this.service.clearLoginInfo({
      flag: true
    });
  }
  reportPage(name) {
    if (name === 'Dashboard') this.router.navigate(['/dashboard']);
    else this.router.navigate(["/report"])
  }

  reportsSection() {
    this.router.navigate(['/dashboard']);
  }
  downloadFeedbackForm() {
    let recruiterCalendarId, interviewerCalendarId;
    if (this.role === 'Interviewer') {
      recruiterCalendarId = 0;
      interviewerCalendarId = this.service.calendarId;
    } else {
      recruiterCalendarId = this.service.calendarId;
      interviewerCalendarId = 0;
    }
    this.service.downloadFeedbackForm(recruiterCalendarId, interviewerCalendarId, );
  }
}