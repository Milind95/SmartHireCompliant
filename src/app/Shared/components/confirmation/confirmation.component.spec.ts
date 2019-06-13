import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationComponent } from './confirmation.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConfirmationPage', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ConfirmationComponent],
      imports: [MatDialogModule, HttpClientModule, HttpModule, IonicStorageModule.forRoot(), IonicModule, RouterTestingModule],
      providers: [DataService, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do bookingdialog button click ', async(() => {
    spyOn(component, 'onNoClick');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.onNoClick).toHaveBeenCalled();
    });
  }));
  it('method  confirm should be called', () => {
    const spy = spyOn(component, 'confirm').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method  onNoClick should be called', () => {
    const spy = spyOn(component, 'onNoClick').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('should render title in paragraph tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toBe('Do you want to delete this Slot?');
  }));
});










