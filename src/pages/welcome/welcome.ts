import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase  from 'firebase';
import { MainPage } from '..';

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

  // Our translated text strings
  private loginSuccessString: string;

  constructor(private fire: AngularFireAuth, 
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_SUCCESS').subscribe((value) => {
      this.loginSuccessString = value;
    })
  }

  loginWithFacebook() {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then( res => {
      this.navCtrl.push(MainPage);
      let toast = this.toastCtrl.create({
        message: this.loginSuccessString,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  logoutOfFacebook() {
    this.fire.auth.signOut().then( res => {
      // console.log(res);
    });
  }

  loginWithGoogle() {

  }

  logoutOfGoogle() {
    
  }

}
