import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  LatLng
} from '@ionic-native/google-maps';

import { Restroom } from '../../models/restroom';
import { RestroomsProvider } from '../../providers/restrooms/restrooms';
import { AddRestroomPage } from '../add-restroom/add-restroom';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  usrLat: number;
  usrLong: number;

  public restroomsList: any[];
  public orderedRestrooms: any[];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private geolocation: Geolocation,
    public restrooms: RestroomsProvider) {
    this.restrooms.getRestroomList().subscribe(result => {
      this.restroomsList = result;
      this.getDistances();
    });
  }

  getDistances() {
    this.geolocation.getCurrentPosition().then((location) => {
      this.usrLat = location.coords.latitude;
      this.usrLong = location.coords.longitude;
      this.updateDistanceRestrooms();
    });
  }

  updateDistanceRestrooms() {
    this.restroomsList.forEach((rest) => {
      rest.distance = this.distanceBetweenCoords(this.usrLat, this.usrLong, new LatLng(rest.lat, rest.long));
    });
    this.orderedRestrooms = this.restroomsList.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  distanceBetweenCoords(lat1, lon1, latlong) {
    var lat2 = Number(latlong.lat);
    var lon2 = Number(latlong.lng);

    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(lat2 - lat1);
    var dLon = this.degreesToRadians(lon2 - lon1);


    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(earthRadiusKm * c * 10) / 10;
  }

  addItem() {
    this.navCtrl.push(AddRestroomPage);
  }

  openItem(rest: Restroom) {
    this.navCtrl.push('RestroomDetailPage', {
      rest: rest
    })
  }

}
