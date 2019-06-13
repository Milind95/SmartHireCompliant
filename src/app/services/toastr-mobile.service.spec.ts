import { ToastrMobileService } from './toastr-mobile.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

describe('ToastrMobileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ToastrMobileService],
    imports: [HttpModule, HttpClientModule, IonicStorageModule.forRoot(),]
  }));

  it('should be created', () => {
    const service: ToastrMobileService = TestBed.get(ToastrMobileService);
    expect(service).toBeTruthy();
  });
  it('should contain show function', inject([ToastrMobileService], (service: ToastrMobileService) => {
    console.log('first Test ',service.toasterNotification);
    expect(service.toasterNotification).toBeTruthy();
  }));
});