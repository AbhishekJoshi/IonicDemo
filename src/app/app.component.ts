import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';

declare var cordova: any;
declare var codePush: any;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = TabsPage;
  tabsPage = TabsPage;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      platform.resume.subscribe(() => {
        if(platform.is('ios')) {
          codePush.sync(null, {updateDialog: true, deploymentKey: 'fNm4cYe35HZniV9HNAldFCUiYDQS2c4a3b49-b526-48dd-a8ae-32a55286cddf'});
        }
        else{
          codePush.sync(null, {updateDialog: true, deploymentKey: 'hdxpiLBXk_opNu8bFixHSYwotn6M2c4a3b49-b526-48dd-a8ae-32a55286cddf'});
        }
      });    
      // let permissions = cordova.plugins.permissions;

      // if(platform.is('android')) {
        // we should check in order, handle error messages properly and coherently
        // this plugin supports a list. you'd want to handle permissions either at app launch, or casebycase and lock certain features of the app up if there is missing permissions

        // permissions.requestPermissions(permissions.CAMERA, function(){}, null);
        // permissions.requestPermissions(permissions.READ_EXTERNAL_STORAGE, function(){}, null);
        // permissions.requestPermissions(permissions.WRITE_EXTERNAL_STORAGE, function(){}, null);
      // }

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page.component);
    this.menuCtrl.close();
  }

}
