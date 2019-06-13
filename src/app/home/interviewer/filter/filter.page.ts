import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  allDropsdownsForRecruiter: any = [];
  interviewerType: any = [];
  accounts: any = [];
  businessUnits: any = [];
  marketUnits: any = [];
  technologies: any = [];
  email: string = '';
  filterCount: number;
  searchText: string;
  role: string;

  intTypeModel = {
    "name": "Interviewer Type",
    "model": ""
  };
  buModel = {
    "name": "Business Unit",
    "model": ""
  };
  techModel = {
    "name": "Technology",
    "model": ""
  };

  categoryData = [];

  categories = [{
    "name": "Interviewer Type",
    "value": 1,
    "isSelected": false,
    "isClicked": true
  },
  {
    "name": "Technology",
    "value": 2,
    "isSelected": false,
    "isClicked": false
  },
  {
    "name": "Organization",
    "value": 3,
    "isSelected": false,
    "isClicked": false
  },
  {
    "name": "Market Unit",
    "value": 4,
    "isSelected": false,
    "isClicked": false
  },
  {
    "name": "Account",
    "value": 5,
    "isSelected": false,
    "isClicked": false
  }];

  constructor(private router: Router,
    private storage: Storage,
    public toastController: ToastController,
    private data: DataService) {
    this.email = localStorage.getItem("email");
    // this.storage.get('email').then((val) => {
    //   this.email = val;
    // });
    this.role = localStorage.getItem("role");

    // storage.get('role').then((val) => {
    console.log('Your role is : ', this.role);
    if (this.role === "Interviewer") {
      this.data.fetchDropdowns(2).subscribe(res => {
        console.log(res);
      })
    } else if (this.role === "Recruiter") {
      this.commonLookup();
    }
    // });
  }

  ngOnInit() {

  }

  commonLookup() {
    this.data.fetchDropdowns(1).subscribe(res => {
      console.log(res);
      this.allDropsdownsForRecruiter = res["response"][0];

      this.allDropsdownsForRecruiter.forEach(dropdown => {
        if (dropdown.dropdownName === "interviewtype") {
          this.interviewerType = [];
          Object.entries(dropdown.dropdown).forEach(data => {
            let object = {
              "key": Number(data[0]),
              "value": data[1]
            }
            this.interviewerType.push(object)
          });
        }
        if (dropdown.dropdownName === "technology") {
          this.technologies = [];
          Object.entries(dropdown.dropdown).forEach(data => {
            let object = {
              "key": Number(data[0]),
              "value": data[1],
              "isChecked": false
            }
            this.technologies.push(object)
          });
        }
        if (dropdown.dropdownName === "BU") {
          this.businessUnits = [];
          Object.entries(dropdown.dropdown).forEach(data => {
            let object = {
              "key": Number(data[0]),
              "value": data[1]
            }
            this.businessUnits.push(object)
          });
        }
      });
      this.selectedCategory({
        value: 1
      })
    })
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

  selectedCategory(event) {
    console.log(this.intTypeModel);
    console.log(this.buModel);
    switch (event.value) {
      case 1:
        this.categoryData = [];
        this.setIsClicked(1);
        let intTypeData = this.interviewerType.map(intType => {
          return {
            ...intType
          }
        });
        let intObject = {
          "title": "Interviewer Type",
          "type": "radio",
          "data": intTypeData,
          "radioModel": this.intTypeModel.model
        };
        this.categoryData.push(intObject);
        break;

      case 2:
        this.categoryData = [];
        this.setIsClicked(2);
        let technologyData = this.technologies.map(tech => {
          return {
            ...tech,
            isChecked: tech.isChecked
          }
        });
        let techObject = {
          "title": "Technology",
          "type": "radio",
          "data": technologyData,
          "radioModel": this.techModel.model
        };
        this.categoryData.push(techObject);
        break;
      case 3:
        this.categoryData = [];
        this.setIsClicked(3);
        let buData = this.businessUnits.map(bu => {
          return {
            ...bu
          }
        });
        let buObject = {
          "title": "Business Unit",
          "type": "radio",
          "data": buData,
          "radioModel": this.buModel.model
        };
        this.categoryData.push(buObject);
        break;
      case 4:
        this.categoryData = [];
        this.setIsClicked(4);
        let muData = this.marketUnits.map(mu => {
          return {
            ...mu,
            isChecked: mu.isChecked
          }
        });
        let muObject = {
          "title": "Market Unit",
          "type": "checkbox",
          "data": muData,
        };
        this.categoryData.push(muObject);
        break;
      case 5:
        this.categoryData = [];
        this.setIsClicked(5);
        let accountsData = this.accounts.map(account => {
          return {
            ...account,
            isChecked: account.isChecked
          }
        });
        let accountObject = {
          "title": "Account",
          "type": "checkbox",
          "data": accountsData,
        };
        this.categoryData.push(accountObject);
        break;
      default:
        this.categoryData = [];
        break;

    }
    console.log(this.categoryData);
  }

  checkboxChanged(event, selectedData) {
    console.log(event);
    console.log(selectedData);
    console.log(this.categoryData);
    this.categoryData.forEach(category => {

      this.marketUnits.forEach(mu => {
        if (mu.key === selectedData.key) {
          mu.isChecked = selectedData.isChecked
        }
      });

      if (category.title === 'Market Unit') {
        let checkedData = category.data.filter(res => {
          return res.isChecked
        }).map(data => {
          return data.key
        });
        console.log(checkedData);
        let object = {
          muId: checkedData
        }
        this.accounts = [];
        this.data.getAccountByMu(object).subscribe(res => {
          console.log(res);
          Object.entries(res).forEach(account => {
            let object = {
              "key": Number(account[1].id),
              "value": account[1].name,
              "isChecked": false
            }
            this.accounts.push(object);
          })
        })
      } else if (category.title === 'Account') {
        this.accounts.forEach(acc => {
          if (acc.key === selectedData.key) {
            acc.isChecked = selectedData.isChecked
          }
        });
        this.fetchInterviewerAvailability();
      }
    });
  }

  radioChanged(event, selectedData) {
    console.log(selectedData);
    this.categoryData.forEach(category => {
      if (category.title === 'Interviewer Type') {
        this.intTypeModel.model = selectedData.key.toString();
        this.categories[0].isSelected = true;
        this.fetchInterviewerAvailability()
      }
      else if (category.title === 'Technology') {
        this.techModel.model = selectedData.key.toString();
        this.categories[1].isSelected = true;
        this.fetchInterviewerAvailability()
      }
      else if (category.title === 'Business Unit') {
        this.buModel.model = selectedData.key.toString();
        this.categories[2].isSelected = true;
        this.marketUnits = [];
        this.data.getMarketUnitByBu(selectedData.key).subscribe(res => {
          console.log(Object.entries(res));
          Object.entries(res).forEach(mu => {
            let object = {
              "key": Number(mu[1].id),
              "value": mu[1].name,
              "isChecked": false
            }
            this.marketUnits.push(object);
            this.fetchInterviewerAvailability()
          })
        })
      }
    });
  }

  setIsClicked(key) {
    this.categories.forEach(category => {
      if (category.value === key) {
        category.isClicked = true;
      } else {
        category.isClicked = false;
      }
    })
  }



  fetchInterviewerAvailability(flag?) {

    if (this.checkFilterValidity(flag)) {
      let accArr = [];
      if (this.accounts.length !== 0) {
        accArr = this.accounts.filter(res => {
          return res.isChecked
        }).map(data => {
          return data.key
        });
      }

      let body = {
        emailId: this.email,
        interviewerTypeId: Number(this.intTypeModel.model),
        technologyId: Number(this.techModel.model),
        buId: Number(this.buModel.model),
        accountIdList: accArr
      }
      console.log("body ", body);
      if (flag === 'fromApply') {
        this.data.getInterviewersSlot(body, );
        this.data.setFilteredData({
          filter: true,
          filterCount: this.filterCount
        })
        this.router.navigate(["/dashboard"])
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


  checkFilterValidity(flag?) {
    console.log(this.categories);
    if (this.categories[0].isSelected) {
      if (this.categories[1].isSelected) {
        if (this.categories[2].isSelected) {
          return true;
        } else {
          if (flag === 'fromApply') {
            this.toasterNotification("Please Select Business Unit !!!");
          }
          return false;
        }
      } else {
        if (flag === 'fromApply') {
          this.toasterNotification("Please Select Technology !!!");
        }
        return false;
      }
    } else {
      if (flag === 'fromApply') {
        this.toasterNotification("Please Select InterviewType !!!");
      }
      return false;
    }
  }




  applyAndgotoCalendar() {
    this.fetchInterviewerAvailability('fromApply')
  }

  clearFilters() {
    this.interviewerType = [];
    this.accounts = [];
    this.businessUnits = [];
    this.marketUnits = [];
    this.technologies = [];
    this.filterCount = undefined;
    this.searchText = "";

    this.intTypeModel = {
      "name": "Interviewer Type",
      "model": ""
    };
    this.buModel = {
      "name": "Business Unit",
      "model": ""
    };
    this.techModel = {
      "name": "Technology",
      "model": ""
    };

    this.categoryData = [];

    this.categories = [{
      "name": "Interviewer Type",
      "value": 1,
      "isSelected": false,
      "isClicked": true
    },
    {
      "name": "Technology",
      "value": 2,
      "isSelected": false,
      "isClicked": false
    },
    {
      "name": "Organization",
      "value": 3,
      "isSelected": false,
      "isClicked": false
    },
    {
      "name": "Market Unit",
      "value": 4,
      "isSelected": false,
      "isClicked": false
    },
    {
      "name": "Account",
      "value": 5,
      "isSelected": false,
      "isClicked": false
    }];

    this.commonLookup();

  }

  searchValues(event) {
    console.log(this.searchText);
    let valueToMatch = this.searchText.toLowerCase();
    this.categoryData.forEach(category => {
      if (category.title === 'Technology') {
        let technologies = this.technologies.filter(techData => {
          return techData.value.toLowerCase().includes(valueToMatch)
        });
        console.log("filterd result is", technologies);
        category.data = technologies
      }
    })
  }
}

