import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { LoaderMobileService } from './loader-mobile.service';

describe('LoaderMobileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  
  beforeEach(() => TestBed.configureTestingModule({
    providers: [LoaderMobileService],
    imports: [HttpModule, HttpClientModule, IonicStorageModule.forRoot(),]
  }));

  it('should be created', () => {
    const service: LoaderMobileService = TestBed.get(LoaderMobileService);
    expect(service).toBeTruthy();
  });
  it('should contain show function', inject([LoaderMobileService], (service: LoaderMobileService) => {
    console.log('first Test ',service.show);
    expect(service.show).toBeTruthy();
  }));
  it('should contain hide function', inject([LoaderMobileService], (service: LoaderMobileService) => {
    console.log('first Test ',service.hide);
    expect(service.hide).toBeTruthy();
  }));
});
