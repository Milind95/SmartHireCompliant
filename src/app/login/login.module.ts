import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { SharedModule } from '../Shared/shared.module';
import { AuthService } from '../services/auth.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
