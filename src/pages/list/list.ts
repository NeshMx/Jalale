import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Restroom } from '../../models/restroom';
import { RestroomsProvider } from '../../providers/restrooms/restrooms';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  public currentRestrooms: any[];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public restrooms: RestroomsProvider) {
      this.restrooms.getRestroomList().subscribe(result => {
        this.currentRestrooms = result;
      });
  }

  addItem() {
    let addModal = this.modalCtrl.create('AddRestroomPage');
    addModal.onDidDismiss(rest => {
      if (rest) {
        this.restrooms.addRestroom(rest);
      }
    })
    addModal.present();
  }

  openItem(rest: Restroom) {
    this.navCtrl.push('RestroomDetailPage',{
      rest: rest
    })
  }

}
