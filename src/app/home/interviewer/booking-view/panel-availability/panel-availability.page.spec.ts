import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAvailabilityPage } from './panel-availability.page';
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

describe('PanelAvailabilityPage', () => {
  let component: PanelAvailabilityPage;
  let fixture: ComponentFixture<PanelAvailabilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[CommonModule,FormsModule,ReactiveFormsModule,RouterTestingModule,
        IonicStorageModule.forRoot(), MatExpansionModule,HttpModule,HttpClientModule,RouterModule,IonicModule],
      declarations: [ PanelAvailabilityPage ],
      providers:[DataService,PanelAvailabilityPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAvailabilityPage);
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
  it('method bookInterviewersSlot  should be called', () => {
    const spy = spyOn(component, 'bookInterviewersSlot').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method gotoBookingForm  should be called', () => {
    const spy = spyOn(component, 'gotoBookingForm').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
});  
