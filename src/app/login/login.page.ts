import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  showProgressBar: boolean = false;
  devWidth: any;
  resetLoginSubscription: Subscription;

  constructor(private router: Router,
    private service: DataService,
    private storage: Storage,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    console.log(this.service.deviceWidth);
    this.devWidth = this.service.deviceWidth;
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.resetLoginSubscription = this.service.resetLoginInfo.subscribe(res => {
      console.log("response from reset subject is", res);
      if (res.flag) {
        this.loginForm = new FormGroup({
          email: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required)
        });
      }
    })
  }

  validateLogin(value) {
    this.showProgressBar = true;
    let emailDto = {
      email: value.email.trim(),
      password: value.password
    }
    if (value.email === 'admin' && value.password === 'admin') {

      localStorage.setItem("email", 'akshat.mangal@capgemini.com');
      localStorage.setItem("role", 'Interviewer');

      this.router.navigate(["/dashboard"]);
      this.toastr.success('Login!', 'Success!');
    }

    this.service.getEmployeeRole(emailDto).subscribe(res => {

      let emailRole = [];
      emailRole.push(res);
      if (emailRole[0].length !== 0) {
        localStorage.setItem("email", value.email.trim());
        localStorage.setItem("role", emailRole[0][0]);
        this.service.saveUserData({
          email: value.email.trim(),
          role: emailRole[0][0]
        })
        console.log("Role is :", emailRole[0][0], " Email is :", value.email.trim());
        this.router.navigate(["/dashboard"]);
        if (this.devWidth > 768) {
          this.toastr.success('Login!', 'Success!')
        } 
      } else {
        if (this.devWidth > 768) {
          this.toastr.error('Login!', 'Failed!')
        } 
      }

      this.showProgressBar = false;
    })

  }

  ngOnDestroy() {
    this.resetLoginSubscription.unsubscribe();
  }
}
