import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var codePush: any;

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  isUpdated = true;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ionViewWillEnter() {
    let update;
    codePush.checkForUpdate(function (update) {
      if (!update) {
        update = true;
          console.log("The app is up to date.");
      } else {
        update = false;
          console.log("An update is available! Should we download it?");
      }

    });
    this.isUpdated = update;
  }

}
