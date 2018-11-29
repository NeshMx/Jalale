import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import { Restroom } from '../../models/restroom';
import { RestroomsProvider } from '../../providers/restrooms/restrooms';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef

  usrLat: number;
  usrLong: number;

  map: GoogleMap;

  public restroomsList: any[];

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    private toast: Toast,
    private maps: GoogleMaps,
    private modalCtrl: ModalController,
    public restrooms: RestroomsProvider ) {
    this.restrooms.getRestroomList().subscribe(result => {
      this.restroomsList = result;
    });
  }

  ionViewDidLoad(){
    this.getUserLocation();
  }

  getUserLocation() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.usrLat = res.coords.latitude;
      this.usrLong = res.coords.longitude;
      this.loadMap();
    }).catch((error) => {
      this.toast.show(error, '5000', 'bottom');
    });
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.usrLat,
           lng: this.usrLong
         },
         zoom: 16
       }
    };

    let element = this.mapElement.nativeElement;
    this.map = this.maps.create(element, mapOptions);

    let usrMarker: Marker = this.map.addMarkerSync({
      title: 'Usted',
      position: {
        lat: this.usrLat,
        lng: this.usrLong
      }
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
    this.navCtrl.push('RestroomDetailPage', {
      rest: rest
    });
  }

}
