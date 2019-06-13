import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { webFeedbackPage } from './webFeedback.page';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'src/app/Shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: webFeedbackPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbCarouselModule,
    MatMenuModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [webFeedbackPage]
})
export class webFeedbackPageModule {}
