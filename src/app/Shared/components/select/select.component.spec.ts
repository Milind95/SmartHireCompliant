import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "src/app/services/data.service";
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { IonicSelectableComponent } from 'ionic-selectable';

describe('SelectPage', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectComponent ,IonicSelectableComponent],
      imports:[HttpClientModule,HttpModule,IonicStorageModule.forRoot(),IonicModule,
        RouterTestingModule,CommonModule],
        providers:[DataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
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
  it('method change should be called', () => {
    const spy = spyOn(component, 'change').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
});
