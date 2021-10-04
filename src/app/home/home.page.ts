import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy{
  latitude: any = 0;
  longitude: any = 0;
  interval:any;
  isCurrent:boolean = true;

  constructor(
    private geolocation: Geolocation
  ) {}

  ngOnInit(): void {
    this.getCurrentCoordinates();
  }

  ngOnDestroy(): void {
    this.isCurrent=false;
    this.stopCurrentCoordinates()
  }

  getCurrentCoordinates() {
    this.isCurrent=true;
    this.interval = setInterval(()=>{
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    },5000);
  }

  stopCurrentCoordinates(){
    this.isCurrent=false;
    clearInterval(this.interval);
  }
}