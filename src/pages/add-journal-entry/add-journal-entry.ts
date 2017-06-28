import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';

import { ModalController, ToastController, LoadingController } from 'ionic-angular';
import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { JournalService } from "../../services/journal";
import { TranslateService } from '@ngx-translate/core';

declare var cordova: any;

@Component({
  selector: 'page-add-journal-entry',
  templateUrl: 'add-journal-entry.html',
})
export class AddJournalEntryPage {
  location: Location = {
    lat: 45.4215,
    lng: -75.6972
  }
  locationIsSet = false;
  imageUrl = '';
  translateInstance;

  constructor(private journalService: JournalService,
              private modalCtrl: ModalController,
            private loadingCtrl: LoadingController,
            private toastCtrl: ToastController,
            private camera: Camera,
            private geolocation: Geolocation,
            private file: File,
            public translate: TranslateService ) {

            // need access in .create methods below
            this.translateInstance = translate;
  }
  
  onLocate(){
    const loader = this.loadingCtrl.create({
      content: this.translateInstance.get('addJournalPage.GETTING_LOCATION').value
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      ).catch(
        error => {
          console.log(error);
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: this.translateInstance.get('addJournalPage.LOCATION_ERROR').value,
            duration: 1500
          });
          toast.present();
        }
      
      )

  }

  onTakePhoto(){
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }).then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then(
              (data: Entry) => {
                this.imageUrl = data.nativeURL;
                this.camera.cleanup();
              }
            ).catch(
              (err: FileError) => {
                this.imageUrl = '';
                const toast = this.toastCtrl.create({
                  message: this.translateInstance.get('addJournalPage.IMAGE_ERROR').value,
                  duration: 2000
                });
                toast.present();
                this.camera.cleanup();
              }
            );
            this.imageUrl = imageData;
        }
    ).catch(
      err => {
        const toast = this.toastCtrl.create({
          message: this.translateInstance.get('addJournalPage.IMAGE_ERROR').value,
          duration: 2000
        });
        toast.present();
      }
    );
  }



  onSubmit(form: NgForm){
    this.journalService
      .addJournal(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }
  
  onOpenMap(){
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if(data){
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

}
