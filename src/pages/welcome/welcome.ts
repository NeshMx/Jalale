import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { MainPage } from '../';

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

  constructor(private fire: AngularFireAuth,
    public navCtrl: NavController,
    public translateService: TranslateService) {

  }

  loginWithFacebook() {
    this.fire.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
      .then(() => {
        this.fire.auth.getRedirectResult().then(res => {
          this.navCtrl.push(MainPage);
          this.provider.loggedIn = true;
          this.provider.name = res.user.displayName;
          this.provider.profilePicture = res.user.photoURL;
          this.provider.email = res.user.email;
          window.localStorage.setItem('fbLoggedIn', this.provider.loggedIn.toString());
          window.localStorage.setItem('fbName', this.provider.name);
          window.localStorage.setItem('fbProfilePicture', this.provider.profilePicture);
          window.localStorage.setItem('fbEmail', this.provider.email);
        }).catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
      }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  loginWithGoogle() {
    this.fire.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.fire.auth.getRedirectResult().then(res => {
          this.navCtrl.push(MainPage);
          this.provider.loggedIn = true;
          this.provider.name = res.user.displayName;
          this.provider.profilePicture = res.user.photoURL;
          this.provider.email = res.user.email;
          window.localStorage.setItem('goLoggedIn', this.provider.loggedIn.toString());
          window.localStorage.setItem('goName', this.provider.name);
          window.localStorage.setItem('goProfilePicture', this.provider.profilePicture);
          window.localStorage.setItem('goEmail', this.provider.email);
          
        }).catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
      }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

}
