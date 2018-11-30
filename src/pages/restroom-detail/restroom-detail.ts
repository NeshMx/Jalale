import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
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
    public navCtrl: NavController,
    public navParams: NavParams,
    public restrooms: RestroomsProvider,
    private nativeGeocoder: NativeGeocoder) {
    this.item = this.navParams.get('rest');
  }

  ionViewDidLoad() {
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

    var icon = 'assets/icon/favicon.ico'

    let marker: Marker = this.map.addMarkerSync({
      title: this.item['name'],
      position: {
        lat: this.item['lat'],
        lng: this.item['long']
      },
      icon: icon
    });

    this.getAddress();
  }

  getAddress() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(this.item['lat'], this.item['long'], options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.item['address'] = result[0].thoroughfare + " " + result[0].subThoroughfare +
        ", " + result[0].subLocality + ", " + result[0].locality + ", " + result[0].subAdministrativeArea
        + ", " + result[0].countryName + " CP " + result[0].postalCode;
      })
      .catch((error: any) => console.log(error));
  }
}

