import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase  from 'firebase';
import { MainPage } from '../';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  provider = {
    name: '',
    profilePicture: '',
    email: '',
    loggedIn: false
  }


  // Our translated text strings
  private loginSuccessString: string;

  constructor(private fire: AngularFireAuth, 
    public navCtrl: NavController, 
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_SUCCESS').subscribe((value) => {
      this.loginSuccessString = value;
    })
  }

  loginWithFacebook() {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then( res => {
      console.log(res);
      this.provider.loggedIn = true;
      this.provider.name = res.user.displayName;
      this.provider.profilePicture = res.user.photoURL;
      this.provider.email = res.user.email;
      window.localStorage.setItem('fbLoggedIn', this.provider.loggedIn.toString());
      window.localStorage.setItem('fbName', this.provider.name);
      window.localStorage.setItem('fbProfilePicture', this.provider.profilePicture);
      window.localStorage.setItem('fbEmail', this.provider.email);
      this.navCtrl.push(MainPage);
    });
  }

  loginWithGoogle() {
    this.fire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then( res => {
      console.log(res);
      this.provider.loggedIn = true;
      this.provider.name = res.user.displayName;
      this.provider.profilePicture = res.user.photoURL;
      this.provider.email = res.user.email;
      window.localStorage.setItem('goLoggedIn', this.provider.loggedIn.toString());
      window.localStorage.setItem('goName', this.provider.name);
      window.localStorage.setItem('goProfilePicture', this.provider.profilePicture);
      window.localStorage.setItem('goEmail', this.provider.email);
      this.navCtrl.push(MainPage);
    });
  }

}
