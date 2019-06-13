import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './home/interviewer/interviewer.module#InterviewerPageModule' },
  { path: 'webFeedback', loadChildren: './home/webFeedback/webFeedback.module#webFeedbackPageModule' },
  { path: 'report', loadChildren: './reports/reports.module#ReportsPageModule' },
  { path: 'booking-view', loadChildren: './home/interviewer/booking-view/booking-view.module#BookingViewPageModule' },
  { path: 'booking-form', loadChildren: './home/interviewer/booking-form/booking-form.module#BookingFormPageModule' },
  { path: 'filter', loadChildren: './home/interviewer/filter/filter.module#FilterPageModule' },
  { path: 'feedback', loadChildren: './home/interviewer/feedback/feedback.module#FeedbackPageModule' },
  { path: 'available', loadChildren: './home/interviewer/booking-view/available/available.module#AvailablePageModule' },
  { path: 'booked', loadChildren: './home/interviewer/booking-view/booked/booked.module#BookedPageModule' },
  { path: 'interviewed', loadChildren: './home/interviewer/booking-view/interviewed/interviewed.module#InterviewedPageModule' },
  { path: 'panel-availability', loadChildren: './home/interviewer/booking-view/panel-availability/panel-availability.module#PanelAvailabilityPageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
