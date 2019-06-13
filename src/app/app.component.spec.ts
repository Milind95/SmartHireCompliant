import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from "src/app/services/data.service";
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import {MatButtonModule, MatCheckboxModule, MatMenuModule,MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatAutocompleteModule, 
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule,CommonModule, MatMenuModule,MatCheckboxModule,
        MatButtonModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule, MatAutocompleteModule, 
          FormsModule, HttpClientModule, HttpModule,  IonicModule,IonicStorageModule.forRoot(), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        [DataService, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
      ],
    }).compileComponents();
  }));



});
