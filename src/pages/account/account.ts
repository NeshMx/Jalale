import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  facebookLoggedIn = false;
  facebookName = "";
  facebookProfilePicture = "";
  facebookEmail = "";

  googleLoggedIn = false;
  googleProfilePicture = "";
  googleName = "";
  googleEmail = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fire: AngularFireAuth) {
    
    this.facebookLoggedIn = (window.localStorage.getItem('fbLoggedIn') === 'true');
    this.facebookName = window.localStorage.getItem('fbName');
    this.facebookProfilePicture = window.localStorage.getItem('fbProfilePicture');
    this.facebookEmail = window.localStorage.getItem('fbEmail');
    this.googleLoggedIn = (window.localStorage.getItem('goLoggedIn') === 'true');
    this.googleName = window.localStorage.getItem('goName');
    this.googleProfilePicture = window.localStorage.getItem('goProfilePicture');
    this.googleEmail = window.localStorage.getItem('goEmail');
  }

  logoutOfFacebook() {
    this.fire.auth.signOut().then( res => {
      this.facebookLoggedIn = false;
      window.localStorage.clear();
      this.navCtrl.push('WelcomePage');
    });
  }

  logoutOfGoogle() {
    this.fire.auth.signOut().then( res => {
      this.googleLoggedIn = false;
      window.localStorage.clear();
      this.navCtrl.push('WelcomePage')
    });
  }
}
