// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { PopoverComponent } from './popover.component';
// import { HttpClientModule } from '@angular/common/http';
// import { DataService } from "src/app/services/data.service";
// import { HttpModule } from '@angular/http';
// import { IonicStorageModule } from '@ionic/storage';
// import { IonicModule } from '@ionic/angular';
// import { RouterTestingModule } from '@angular/router/testing';
// import { CommonModule } from '@angular/common';
// import { PopoverController, NavParams } from '@ionic/angular';
// import { NavController } from '@ionic/angular';

// class NavParamsMock {
//   static returnParam = null;
//   public get(key): any {
//       if (NavParamsMock.returnParam) {
//           return NavParamsMock.returnParam
//       }
//       return 'default';
//   }
//   static setParams(value){
//       NavParamsMock.returnParam = value;
//   }
// }

// // export class NavParamsMock {
// //   static returnParam = null;
// //   public get(key): any {
// //     if (NavParamsMock.returnParam) {
// //        return NavParamsMock.returnParam
// //     }
// //     return 'default';
// //   }
// //   static setParams(value){
// //     NavParamsMock.returnParam = value;
// //   }
// // }

// describe('PopoverPage', () => {
//   let component: PopoverComponent;
//   let fixture: ComponentFixture<PopoverComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ PopoverComponent ],
//       imports:[HttpClientModule,HttpModule,IonicStorageModule.forRoot(),IonicModule,
//         RouterTestingModule,CommonModule],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//       providers:[DataService,PopoverController,{provide: NavParams, useClass: NavParamsMock},NavController]
//     })
//     .compileComponents();
//   }));


//   beforeEach(() => {
//     fixture = TestBed.createComponent(PopoverComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   fit('should create', () => {
//     expect(component).toBeTruthy();
//   });

// });
