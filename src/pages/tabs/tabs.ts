import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Tab1Root, Tab2Root } from '../';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any;
  tab2Root: any;

  tab1Title = " ";
  tab2Title = " ";

  constructor(public navCtrl: NavController, 
    public translateService: TranslateService,
    public navParams: NavParams) {

    this.tab1Root = Tab1Root;
    this.tab2Root = Tab2Root;

    translateService.get(['TAB1_TITLE', 'TAB2_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
    });
  }
}
