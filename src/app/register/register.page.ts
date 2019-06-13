import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  showProgressBar: boolean = false;
  mhide = true;
  hide = true;
  recruiterElements: boolean = false;
  fullName: any;
  emailId: any;
  empId: any;
  gradeModel: any;
  roleModel: any;
  loc: any;
  techModel: any;
  buModel: any;
  muModel: any;
  accountModel: any;
  pass: any;
  roles: any[] = [
    {
      id: 1,
      name: "Interviewer"
    },
    {
      id: 2,
      name: "Recruiter"
    }
  ];

  buArray = [];
  technologyArray = [];
  buId: any;
  marketunitArray = [];
  accountsArray = [];
  gradesArray = [];
  constructor(private service: DataService,
     private router: Router,
      private storage: Storage,
      private toastr: ToastrService,) { }

  ngOnInit() {

    this.service.eventEmitterForLookup.subscribe(res => {
      console.log("emitted event is", res);
      if (res.flag) {
        this.buArray = this.service.buArray;
        this.technologyArray = this.service.technologyArray;
      }
    });

    this.service.getlookUpData();

    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
      organization: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
      id: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      account: new FormControl('', Validators.required),
      marketUnit: new FormControl('', Validators.required),
      technology: new FormControl('', Validators.required),
    });


    this.service.getGrades().subscribe(g => {
      let arr = [];
      arr.push(g);
      this.gradesArray = arr[0];
    })


  }

  validateRegistartion(register) {
    console.log(register);
    // this.showProgressBar = true;
    console.log('id ...', register.id);
    let obj = {};
    if (register.role.name === "Recruiter") { // interviewer
      obj = {
        id: Number(register.id),
        name: register.name,
        email: register.email,
        location: register.location,
        grade: register.grade.name,
        technology: ['NA'],
        role: register.role.name,
        password: register.password
      }
    } else {
      let techArr = [];
      register.technology.forEach(tech => {
        techArr.push(tech.name);
      });
      obj = {
        id: Number(register.id),
        name: register.name,
        email: register.email,
        location: register.location,
        grade: register.grade.name,
        technology: techArr,
        role: register.role.name,
        password: register.password,
        account: register.account.name,
        marketUnit: register.marketUnit.name,
        organization: register.organization.name,
      }
    }

    console.log("register body", obj);

    // this.service.registerUser(obj).subscribe(res => {
    //   console.log("this is response", res);
    //   if (res) {
    //     localStorage.setItem("email", register.email);
    //     localStorage.setItem("role", register.role.name);
    //     this.showProgressBar = false;
    //     this.toastr.success('Regsiter','Successfully Registered !!');
    //     this.router.navigate(["/login"]);
    //   }else{
    //     this.toastr.error('Register','Something went wrong !!');
    //   }

    // })

  }

  selectedRole(role) {
    console.log("selectedRole : ", role);
    if (role.id == 2) { // recruiter
      this.recruiterElements = false;
      this.registerForm = new FormGroup({
        name: new FormControl(this.fullName, Validators.required),
        email: new FormControl(this.emailId, [Validators.required, Validators.email]),
        role: new FormControl(this.roleModel, Validators.required),
        organization: new FormControl(''),
        password: new FormControl(this.pass, [Validators.required, Validators.minLength(8)]),
        id: new FormControl(this.empId, Validators.required),
        grade: new FormControl(this.gradeModel, Validators.required),
        location: new FormControl(this.loc, Validators.required),
        account: new FormControl(''),
        marketUnit: new FormControl(''),
        technology: new FormControl(''),
      });
    }
    else {

      this.recruiterElements = true;
      this.registerForm = new FormGroup({
        name: new FormControl(this.fullName, Validators.required),
        email: new FormControl(this.emailId, [Validators.required, Validators.email]),
        role: new FormControl(this.roleModel, Validators.required),
        organization: new FormControl(this.buModel, Validators.required),
        password: new FormControl(this.pass, [Validators.required, Validators.minLength(8)]),
        id: new FormControl(this.empId, Validators.required),
        grade: new FormControl(this.gradeModel, Validators.required),
        location: new FormControl(this.loc, Validators.required),
        account: new FormControl(this.accountModel, Validators.required),
        marketUnit: new FormControl(this.muModel, Validators.required),
        technology: new FormControl(this.techModel, Validators.required),
      });


    }
  }

  selectedBU(bu) {
    console.log("selectedBU", bu);
    if (bu) {
      this.service.getMarketUnitByBu(bu.id).subscribe(bu => {
        let arr = [];
        arr.push(bu);
        this.marketunitArray = arr[0];
      });
    }
  }

  selectedMU(mu) {
    console.log("selectedMU", mu);
    if (mu) {
      let muArr = [];
      muArr.push(mu.id);
      this.service.getAccountByMu({ muId: muArr }).subscribe(mu => {
        let arr = [];
        arr.push(mu);
        this.accountsArray = arr[0];
      });
    }

  }
  selectedTechnology(tech) {
  }


}
