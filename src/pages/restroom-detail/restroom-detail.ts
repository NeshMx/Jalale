import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

import { RestroomsProvider } from '../../providers/restrooms/restrooms';

/**
 * Generated class for the RestroomDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restroom-detail',
  templateUrl: 'restroom-detail.html',
})
export class RestroomDetailPage {

  @ViewChild('map') mapElement: ElementRef
  map: GoogleMap;

  public item: Object;

  constructor(private toast: Toast,
    private maps: GoogleMaps,
    private modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public restrooms: RestroomsProvider) {
    this.item = this.navParams.get('rest');
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.item['lat'],
           lng: this.item['long']
         },
         zoom: 16
       }
    };

    let element = this.mapElement.nativeElement;
    this.map = this.maps.create(element, mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Usted',
      position: {
        lat: this.item['lat'],
        lng: this.item['long']
      }
    });
  }

}
