import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';
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

@IonicPage()
@Component({
  selector: 'page-add-restroom',
  templateUrl: 'add-restroom.html',
})
export class AddRestroomPage {

  @ViewChild('map') mapElement: ElementRef

  isReadyToSave: boolean;

  rest: any;

  form: FormGroup;

  map: GoogleMap;

  usrLat: number;
  usrLong: number;

  public restroomsList: any[];
  public types = [];
  public uniqueTypes = [];

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    private toast: Toast,
    private geolocation: Geolocation,
    private maps: GoogleMaps,
    public restrooms: RestroomsProvider) {

    this.restrooms.getRestroomList().subscribe(result => {
      this.restroomsList = result;
      this.restroomsList.forEach(rest => {
        this.types.push(rest.type);
      });
      this.uniqueTypes = this.types.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    });

    this.form = formBuilder.group({
      name: ['', Validators.required],
      comment: ['', Validators.required],
      type: [null, Validators.required],
      isfree: [null, Validators.required],
      hasaccessibility: [null, Validators.required],
      price: [null, Validators.required],
      concurrence: [null, Validators.required],
      score: [null, Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
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

    let marker: Marker = this.map.addMarkerSync({
      title: 'Yo',
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: this.usrLat,
        lng: this.usrLong
      },
      draggable: true
    });
    marker.on(GoogleMapsEvent.MARKER_DRAG).subscribe((mrk) => {
      this.usrLat = mrk.lat
      this.usrLong = mrk.long
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) {
      return;
    }
    let data = {
      comment: this.form.value['comment'] ,
      concurrence: this.form.value['concurrence'],
      hasaccessibility: this.form.value['hasaccessibility'],
      isfree: this.form.value['isfree'],
      lat: this.usrLat,
      long: this.usrLong,
      name: this.form.value['name'],
      price: this.form.value['price'],
      score: this.form.value['score'],
      type: this.form.value['type'],
    }
    this.restrooms.addRestroom(data).then(result => {
      this.navCtrl.pop();
    })
  }

}
