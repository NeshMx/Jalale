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
  Environment,
  LatLng
} from '@ionic-native/google-maps';

import { Restroom } from '../../models/restroom';
import { RestroomsProvider } from '../../providers/restrooms/restrooms';
import { AddRestroomPage } from '../add-restroom/add-restroom';
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
  restroomsMarkers: any;
  map: GoogleMap;

  public restroomsList: any[];
  public orderedRestrooms: any[];
  public nearestRestroom: Object;

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    private toast: Toast,
    private maps: GoogleMaps,
    public restrooms: RestroomsProvider) {
    this.restrooms.getRestroomList().subscribe(result => {
      this.restroomsList = result;
      this.getDistances();
    });
  }

  ionViewDidLoad() {
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
    this.restrooms.getRestroomList().subscribe(result => {
      result.forEach(restroom => {
        this.addMarker(restroom)
      })
    });
  }

  addMarker(restroom) {
    var icon = 'assets/icon/favicon.ico';
    var markerOptions: MarkerOptions = {
      position: new LatLng(restroom.lat, restroom.long),
      title: restroom['name'],
      icon: icon
    };
    //console.log('OPTIONS FOR NEW MARKER', markerOptions)
    this.map.addMarker(markerOptions);
  }

  addItem() {
    this.navCtrl.push(AddRestroomPage);
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
    this.nearestRestroom = this.orderedRestrooms[0];
    return this.nearestRestroom;
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

  openItem(rest: Restroom) {
    this.navCtrl.push('RestroomDetailPage', {
      rest: rest
    });
  }

}
