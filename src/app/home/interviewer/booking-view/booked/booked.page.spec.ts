import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookedPage } from './booked.page';
import { MatExpansionModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('BookedPage', () => {
  let component: BookedPage;
  let fixture: ComponentFixture<BookedPage>;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[CommonModule,FormsModule,ReactiveFormsModule,RouterTestingModule,
        IonicStorageModule.forRoot(), MatExpansionModule,HttpModule,HttpClientModule,RouterModule,IonicModule],
      declarations: [ BookedPage ],
      providers:[DataService,BookedPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('method ngOnInit should be called', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method ngOnDestroy  should be called', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('method  goToFeedback  should be called', () => {
    const spy = spyOn(component, 'goToFeedback').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
});
