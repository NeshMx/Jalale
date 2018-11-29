import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { GoogleMaps } from '@ionic-native/google-maps';

import { MyApp } from './app.component';
import { RestroomsProvider } from '../providers/restrooms/restrooms';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC92P8rpGSZ068CXddHK9H71P5DpcFUfGM",
  authDomain: "jalale-d6c8e.firebaseapp.com",
  databaseURL: "https://jalale-d6c8e.firebaseio.com",
  projectId: "jalale-d6c8e",
  storageBucket: "jalale-d6c8e.appspot.com",
  messagingSenderId: "393378620271"
};

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Toast,
    GoogleMaps,
    // { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestroomsProvider
  ]
})
export class AppModule {}
