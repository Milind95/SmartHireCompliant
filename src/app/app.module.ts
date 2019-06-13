import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { initializer } from './app-init';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ToastrMobileService } from './services/toastr-mobile.service';
import { LoaderMobileService } from './services/loader-mobile.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    // KeycloakAngularModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  exports: [],
  providers: [
    StatusBar,
    AuthService,
    DataService,
    SplashScreen,
    ToastrMobileService,
    LoaderMobileService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializer,
    //   multi: true,
    //   deps: [KeycloakService]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
