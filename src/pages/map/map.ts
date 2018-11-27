import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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

  markerLatLng: {
    lat: number,
    long: number
  }

  map: GoogleMap;

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    private toast: Toast,
    private maps: GoogleMaps) {

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
         zoom: 18,
         tilt: 30
       }
    };

    let element = this.mapElement.nativeElement;
    this.map = this.maps.create(element, mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.usrLat,
        lng: this.usrLong
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

  addItem() {
    console.log('Add button its working');
  }

}
