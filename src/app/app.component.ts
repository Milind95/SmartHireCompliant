import { Subscription } from 'rxjs';
import { DataService } from './services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  devWidth: any;
  marketUnitArray = [];
  accounts: any;
  interviewType: any;
  accountArray = [];
  tech: any;
  org: any;
  market: any;
  email: string = '';
  role: string;
  technologyArray = [];
  filterCount: number;
  buArray = [];
  userDataSubscription: Subscription;

  public appPages = [
    {
      title: 'Month',
      url: '/dashboard',
      icon: 'calendar'
    },
    {
      title: 'Report',
      url: '/report',
      icon: 'document'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'power'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private data: DataService,
    private storage: Storage,
    private menu: MenuController, ) {
    this.initializeApp();
    this.devWidth = this.platform.width();
    this.email = localStorage.getItem("email");
    this.role = localStorage.getItem("role");
    this.userDataSubscription = this.data.userDataSubject.subscribe(res => {
      this.email = res.email;
      this.role = res.role;
    });



    // this.storage.get('email').then((val) => {
    //   this.email = val;
    // });
    // this.storage.get('role').then((val) => {
    //   this.role = val;
    // });
  }

  ngOnInit() {
    console.log("this.devWidth", this.devWidth);
    if (this.devWidth > 768) {
      this.email = localStorage.getItem("email");

      // this.storage.get('email').then((val) => {
      //   this.email = val;
      // });

      this.data.eventEmitterForLookup.subscribe(res => {
        if (res.flag) {
          this.buArray = this.data.buArray;
          this.technologyArray = this.data.technologyArray;
          console.log(this.technologyArray);
        }
      });
      this.data.getlookUpData();


      this.data.panelAvailability.subscribe(res => {
        if (res) {
          console.log('goiing to fetch...', res);
          let accId = this.accounts ? this.accounts.id : [];
          this.fetchInterviewerAvailability(this.interviewType, this.tech, this.org, accId);
          this.fetchInterviewerAvailability(this.interviewType, this.tech, this.org, accId, "fromApply");
        }
      })

    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  raiseEventForToolbar(event, url, title) {
    console.log(event, url);
    switch (url) {
      case "/dashboard":
        this.data.setViewForToolbar({
          key: "month"
        })
        break;
      case "/dashboard/week":
        this.data.setViewForToolbar({
          key: "week"
        })
        break;
      case "/dashboard/day":
        this.data.setViewForToolbar({
          key: "day"
        })
        break;
    }

  }

  selectedInterviewType(typeId) {
    let accId = this.accounts ? this.accounts.id : [];
    this.fetchInterviewerAvailability(typeId, this.tech, this.org, accId);
  }
  selectedTechnology(techId) {
    let accId = this.accounts ? this.accounts.id : [];
    this.fetchInterviewerAvailability(this.interviewType, techId, this.org, accId);
  }
  selectedBu(buId) {
    this.data.getMarketUnitByBu(buId).subscribe(bu => {
      let arr = [];
      arr.push(bu);
      this.marketUnitArray = arr[0];
    });
    let accId = this.accounts ? this.accounts.id : [];
    this.fetchInterviewerAvailability(this.interviewType, this.tech, buId, accId);
  }
  selectedMarketUnit(muId) {
    let muArr = [];
    muArr.push(muId);
    this.data.getAccountByMu({ muId: muArr }).subscribe(mu => {
      let arr = [];
      arr.push(mu);
      this.accountArray = arr[0];
    });
    // this.fetchInterviewerAvailability(this.interviewType, this.tech, this.org, this.accounts);
  }

  selectedAccount(accId) {
    this.fetchInterviewerAvailability(this.interviewType, this.tech, this.org, accId.id);
  }

  applyFilter() {
    console.log("apply filter");
    let accId = this.accounts ? this.accounts.id : [];
    this.fetchInterviewerAvailability(this.interviewType, this.tech, this.org, accId, "fromApply");
    this.menu.toggle('mobile');
  }

  reset() {
    this.interviewType = undefined;
    this.tech = undefined;
    this.org = undefined;
    this.accounts = undefined;
    this.market = undefined;
    this.data.eventEmitterFormenuFilter.emit({
      flag: true
    });
    this.filterCount = undefined;
    this.data.setIsPanelAvailabilityBool(false);
    // this.menu.toggle('mobile');
  }

  fetchInterviewerAvailability(typeId, techId, orgId, accounts, flag?) {
    console.log("all values", typeId, techId, orgId, accounts, flag)
    if (typeId && techId && orgId) {
      let accArr = [];
      if (accounts > 0) accArr.push(accounts)

      let body = {
        emailId: this.email,
        interviewerTypeId: typeId,
        technologyId: techId,
        buId: orgId,
        accountIdList: accArr
      }
      console.log("body ", body);
      if (flag === 'fromApply') {
        this.data.getInterviewersSlot(body);
        this.data.setIsPanelAvailabilityBool(true);
      } else {
        this.data.getInterviewersSlotCount(body).subscribe(res => {
          console.log("count is", res);
          if (res["response"]) {
            this.filterCount = res["response"][0].length;
          } else {
            this.filterCount = 0;
          }
        });
      }

    }
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe()
  }

}
