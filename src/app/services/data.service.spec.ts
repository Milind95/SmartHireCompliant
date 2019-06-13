import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { async, ComponentFixture } from '@angular/core/testing';
// import {Http} from "@angular/http";

describe('DataService', () => {
  let fixture: ComponentFixture<DataService>;
let service=DataService;
  beforeEach(() => TestBed.configureTestingModule({

    providers: [DataService],
    imports: [HttpModule, HttpClientModule,IonicStorageModule.forRoot(),]
  }));
  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
  it('should contain getAllInterviewerSlots function', inject([DataService], (service: DataService) => {
    console.log('first Test ',service.getAllInterviewerSlots);
    expect(service.getAllInterviewerSlots).toBeTruthy();
  }));

  it('should contain handleEvent function', inject([DataService], (service: DataService) => {
    console.log('first Test ',service.handleEvent);
    expect(service.handleEvent).toBeTruthy();
  }));

  it('should contain getAllRecruitersSlots function', inject([DataService], (service: DataService) => {
    expect(service.getAllRecruitersSlots).toBeTruthy();
  }));
  it('should contain getInterviewersSlot function', inject([DataService], (service: DataService) => {
    expect(service.getInterviewersSlot).toBeTruthy();
  }));
  it('should contain getInterviewersSlotCount function', inject([DataService], (service: DataService) => {
    expect(service.getInterviewersSlotCount).toBeTruthy();
  }));
  it('should contain getFormattedDateString function', inject([DataService], (service: DataService) => {
    expect(service.getFormattedDateString).toBeTruthy();
  }));
  it('should contain getDateString function', inject([DataService], (service: DataService) => {
    expect(service.getDateString).toBeTruthy();
  }));
  it('should contain formatDate function', inject([DataService], (service: DataService) => {
    expect(service.formatDate).toBeTruthy();
  }));
  it('should contain getFeedbackForm function', inject([DataService], (service: DataService) => {
    expect(service.getFeedbackForm).toBeTruthy();
  }));
  it('should contain getlookUpData function', inject([DataService], (service: DataService) => {
    expect(service.getlookUpData).toBeTruthy();
  }));
  it('should contain sortEvents function', inject([DataService], (service: DataService) => {
    expect(service.sortEvents).toBeTruthy();
  }));
  it('should contain getEmployeeRole function', inject([DataService], (service: DataService) => {
    expect(service.getEmployeeRole).toBeTruthy();
  }));


  it('should contain registerUser function', inject([DataService], (service: DataService) => {
    expect(service.registerUser).toBeTruthy();
  }));
  it('should contain getGrades function', inject([DataService], (service: DataService) => {
    expect(service.getGrades).toBeTruthy();
  }));
  it('should contain getMarketUnitByBu function', inject([DataService], (service: DataService) => {
    expect(service.getMarketUnitByBu).toBeTruthy();
  }));
  it('should contain getAccountByMu function', inject([DataService], (service: DataService) => {
    expect(service.getAccountByMu).toBeTruthy();
  }));
  it('should contain saveFreeSlot function', inject([DataService], (service: DataService) => {
    expect(service.saveFreeSlot).toBeTruthy();
  }));
  it('should contain deleteInterviewSlot function', inject([DataService], (service: DataService) => {
    expect(service.deleteInterviewSlot).toBeTruthy();
  }));
  it('should contain fetchDropdowns function', inject([DataService], (service: DataService) => {
    expect(service.fetchDropdowns).toBeTruthy();
  }));
  it('should contain getInterviewerForRecruiter function', inject([DataService], (service: DataService) => {
    expect(service.getInterviewerForRecruiter).toBeTruthy();
  }));
  it('should contain rescheduleRecruiterSlot function', inject([DataService], (service: DataService) => {
    expect(service.rescheduleRecruiterSlot).toBeTruthy();
  }));
  it('should contain saveRecruiterSlot function', inject([DataService], (service: DataService) => {
    expect(service.saveRecruiterSlot).toBeTruthy();
  }));
  it('should contain deleteInterviewerSlot function', inject([DataService], (service: DataService) => {
    expect(service.deleteInterviewerSlot).toBeTruthy();
  }));
  it('should contain deleteRecruiterslot function', inject([DataService], (service: DataService) => {
    expect(service.deleteRecruiterslot).toBeTruthy();
  }));
  it('should contain setPrevData function', inject([DataService], (service: DataService) => {
    expect(service.setPrevData).toBeTruthy();
  }));
  it('should contain setNextData function', inject([DataService], (service: DataService) => {
    expect(service.setNextData).toBeTruthy();
  }));
  it('should contain setTodayData function', inject([DataService], (service: DataService) => {
    expect(service.setTodayData).toBeTruthy();
  }));
  it('should contain setViewForToolbar function', inject([DataService], (service: DataService) => {
    expect(service.setViewForToolbar).toBeTruthy();
  }));
  it('should contain setSlotInfo function', inject([DataService], (service: DataService) => {
    expect(service.setSlotInfo).toBeTruthy();
  }));
  it('should contain setBookingDataForBookingForm function', inject([DataService], (service: DataService) => {
    expect(service.setBookingDataForBookingForm).toBeTruthy();
  }));
  it('should contain setFilteredData function', inject([DataService], (service: DataService) => {
    expect(service.setFilteredData).toBeTruthy();
  }));
  it('should contain setRole function', inject([DataService], (service: DataService) => {
    expect(service.setRole).toBeTruthy();
  }));
  it('should contain deleteSlot function', inject([DataService], (service: DataService) => {
    expect(service.deleteSlot).toBeTruthy();
  }));
  it('should contain setRefreshDataFromBookingForm function', inject([DataService], (service: DataService) => {
    expect(service.setRefreshDataFromBookingForm).toBeTruthy();
  }));

  it('should contain downloadFeedbackForm function', inject([DataService], (service: DataService) => {
    expect(service.downloadFeedbackForm).toBeTruthy();
  }));

  it('should contain count function', inject([DataService], (service: DataService) => {
    expect(service.count).toBeTruthy();
  }));

  it('should contain downloadReport function', inject([DataService], (service: DataService) => {
    expect(service.downloadReport).toBeTruthy();
  }));

  it('should contain createHiperlink function', inject([DataService], (service: DataService) => {
    expect(service.createHiperlink).toBeTruthy();
  }));

  
  it('should contain  getReportsCompleteData function', inject([DataService], (service: DataService) => {
    expect(service.getReportsCompleteData).toBeTruthy();
  }));  


  // fit("should use the quoteList from the service", () => {
  //   let dataService = TestBed.get(DataService);
  //   let link: string = "http://3.209.34.157:8080";
  //   let body={
  //   emailId:"vasu.sharma@capgemini.com",
  //   interviewerTypeId: 1,
  //   technologyId:1,
  //   buId: 1,
  //   accountIdList:1 }
  //   expect(dataService.getInterviewersSlotCount(body)).toBe(this.http.post(`${link}/interviewer/getInterviewerSlots`, body));
  // });
});
  
