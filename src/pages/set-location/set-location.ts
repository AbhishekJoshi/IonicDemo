import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Location } from "../../models/location";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  location: Location;
  marker: Location;

  constructor(private navParams: NavParams, private viewCtrl: ViewController, private translate: TranslateService){
    this.location = this.navParams.get('location');
    if(this.navParams.get('isSet')){
      this.marker = this.location;
    }
    translate.setDefaultLang('en');

  }

  onSetMarker(event: any){
    console.log(event);
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  onConfirm(){
    this.viewCtrl.dismiss({location: this.marker});
  }

  onAbort(){
    this.viewCtrl.dismiss();
  }
}
