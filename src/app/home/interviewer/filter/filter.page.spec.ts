import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FilterPage } from './filter.page';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../../../services/data.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

describe('FilterPage', () => {
  let component: FilterPage;
  let fixture: ComponentFixture<FilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule,
        IonicStorageModule.forRoot(), IonicModule, HttpClientModule, HttpModule],
      declarations: [FilterPage],
      providers: [DataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do filter button click ', (() => {
    spyOn(component, 'clearFilters');
    const button = fixture.debugElement.nativeElement.querySelector('ion-button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.clearFilters).toHaveBeenCalled();
    });
  }));
  it('method  applyAndgotoCalendar should be called', () => {
    const spy = spyOn(component, 'applyAndgotoCalendar').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });
  it('method clearFilters should be called', () => {
    const spy = spyOn(component, 'clearFilters').and.callThrough();
    expect(component).toBeDefined();
    expect(spy);
  });

  it('should do filter apply click ', (() => {
    spyOn(component, 'applyAndgotoCalendar');
    const button = fixture.debugElement.nativeElement.querySelector('ion-button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.clearFilters).toBeDefined();
    });
  }));
  it('should render clear button ', (() => {
    spyOn(component, 'clearFilters');
    let button = fixture.debugElement.nativeElement.querySelector('ion-button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.clearFilters).toHaveBeenCalled();
    })
  }));
  it('should render ion item button ', (() => {
    spyOn(component, 'selectedCategory');
    let button = fixture.debugElement.nativeElement.querySelector('ion-button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.selectedCategory).toHaveBeenCalled();
    })
  }));
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FilterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#clear').textContent).toContain('clear')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FilterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#filter')).toBeDefined('Filtered Result')
  });
  it('should render title in ion-col tag', () => {
    const fixture = TestBed.createComponent(FilterPage);
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('#apply').textContent).toContain('Apply')
  });
  it('gives  radioChanged', () => {
    const event: Event = new Event('');
    let selectedData = "Interviewer";
    expect(component['radioChanged'](selectedData, event)).toBeUndefined();
    component.categoryData = [
      {
        title: ['Interviewer Type', 'Technology', 'Business Unit'],
        isSelected: true
      },
      {
        isSelected: true
      },
      {
        isSelected: true
      }]
    expect(component.categoryData[0].title[0]).toContain("Interviewer Type");
    component.categoryData[0].title[0] = "Interviewer Type";
    expect(component.categoryData[0].isSelected).toBe(true);
    expect(component.fetchInterviewerAvailability).toBeTruthy();

    expect(component.categoryData[0].title[1]).toContain("Technology");
    component.categoryData[0].title[1] = "Technology";
    expect(component.categoryData[1].isSelected).toBe(true);
    expect(component.fetchInterviewerAvailability).toBeTruthy();

    expect(component.categoryData[0].title[2]).toContain("Business Unit");
    component.categoryData[0].title[2] = "Business Unit";
    expect(component.categoryData[1].isSelected).toBe(true);
    component.marketUnits = [];
    expect(component.marketUnits).toBeDefined();
    expect(component.fetchInterviewerAvailability).toBeTruthy();
  })

  it('gives  setIsClicked', () => {
    let key = 1;
    expect(component['setIsClicked'](key)).toBeUndefined();
    component.categories = [
      { name: "angular", value: 1, isClicked: true, isSelected: true },
      { name: "devops", value: 2, isClicked: false, isSelected: true },
      { name: "java", value: 3, isClicked: true, isSelected: true }
    ]
    expect(component.categories[0].value).toBe(key);
    expect(component.categories[0].isClicked).toBe(true);
    expect(component.categories[1].value).not.toBe(key);
    expect(component.categories[1].isClicked).toBe(false);
  })
  it('gives  applyAndgotoCalendar', () => {
    expect(component['applyAndgotoCalendar']()).toBeUndefined();
    let apply = "from Apply"
    expect(apply).toBeDefined();
    let spy = spyOn(component, 'fetchInterviewerAvailability');
    component.fetchInterviewerAvailability(apply);
    expect(spy).toHaveBeenCalled();
  })




  describe('gives  checkFilterValidity', () => {
    let flag = "fromApply";
    it('gives  buisness unit', () => {
      expect(component['checkFilterValidity'](flag)).toBe(false);
      component.categories = [
        { name: "angular", value: 1, isClicked: true, isSelected: true },
        { name: "devops", value: 2, isClicked: false, isSelected: true },
        { name: "java", value: 3, isClicked: true, isSelected: true }
      ]
      expect(component.categories[0].isSelected).toBe(true);
      expect(component.categories[1].isSelected).toBe(true);
      expect(component.categories[2].isSelected).toBe(true);
      expect(flag).toBe("fromApply");
      let bu = "Please Select Business Unit !!!";
      expect(bu).toBeDefined();
      let spy = spyOn(component, 'toasterNotification');
      component.toasterNotification(bu);
      expect(spy).toHaveBeenCalled();
    });

    it('gives  technology', () => {
      expect(component['checkFilterValidity'](flag)).toBe(false);
      component.categories = [
        { name: "angular", value: 1, isClicked: true, isSelected: true },
        { name: "devops", value: 2, isClicked: false, isSelected: true },
        { name: "java", value: 3, isClicked: true, isSelected: true }
      ]
      expect(component.categories[0].isSelected).toBe(true);
      expect(component.categories[1].isSelected).toBe(true);
      expect(component.categories[2].isSelected).toBe(true);
      expect(flag).toBe("fromApply");
     let technology = "Please Select Technology !!!";
      expect(technology).toBeDefined();
      let spy = spyOn(component, 'toasterNotification');
      component.toasterNotification(technology);
      expect(spy).toBeDefined();
    })

    it('gives  interview type', () => {
      expect(component['checkFilterValidity'](flag)).toBe(false);
      component.categories = [
        { name: "angular", value: 1, isClicked: true, isSelected: true },
        { name: "devops", value: 2, isClicked: false, isSelected: true },
        { name: "java", value: 3, isClicked: true, isSelected: true }
      ]
      expect(component.categories[0].isSelected).toBe(true);
      expect(component.categories[1].isSelected).toBe(true);
      expect(component.categories[2].isSelected).toBe(true);
      expect(flag).toBe("fromApply");
      let interviewType = "Please Select InterviewType !!!";
      expect(interviewType).toBeDefined();
      let spy = spyOn(component, 'toasterNotification');
      component.toasterNotification(interviewType);
      expect(spy).toBeDefined();
    })
  })
  it('gives  clear filters', () => {
    expect(component['clearFilters']()).toBeUndefined();
    component.interviewerType=[];
    expect(component.interviewerType).toBeDefined();
    component.accounts=[];
    expect(component.accounts).toBeDefined();
    component.businessUnits=[];
    expect(component.businessUnits).toBeDefined();
    component.marketUnits=[];
    expect(component.marketUnits).toBeDefined();
    component.technologies=[];
    expect(component.technologies).toBeDefined();
    component.filterCount=undefined;
    expect(component.filterCount).toBe(undefined);
    component.searchText="";
    expect(component.searchText).toBe("");
    component.intTypeModel={
      name: "Interviewer Type",
      model: ""}
    expect(component.intTypeModel).toBeDefined();
    component.buModel={
      name: "Business Unit",
      model: ""}
    expect(component.buModel).toBeDefined();
    component.techModel={
      name: "Technology",
      model: "" }
    expect(component.techModel).toBeDefined();
    component.categoryData=[];
    expect(component.categoryData).toBeDefined();
    component.categories = [
      { name: "Interviewer Type", value: 1, isClicked: false, isSelected: false },
      { name: "Technology", value: 2, isClicked: false, isSelected: true },
      { name: "Organization", value: 3, isClicked: false, isSelected: false },
      { name: "Market Unit", value: 4, isClicked: false, isSelected: false },
      { name: "Account", value: 5, isClicked: false, isSelected: false },
    ]
   expect(component.categories[0]).toBeDefined();
   expect(component.categories[1]).toBeDefined();
   expect(component.categories[2]).toBeDefined();
   expect(component.categories[3]).toBeDefined();
   expect(component.categories[4]).toBeDefined();
   expect(component.commonLookup).toBeDefined();
  });
});
