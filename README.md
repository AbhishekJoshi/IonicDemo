# Journalling
This is an app that allows you to create journal entries (including taking a photo), view your journal entries and post them to Facebook. Another feature is it allows over the air updates 

### Features
- Ability to create, delete, and view posts of your journal
- Ability to receive CodePush updates directly via the App's Production deployment on both iOS and Android. If the latest update is not installed, the app will indicate that an update is available.
- Ability to save a photo and associate it with that particular post when viewing it a second time
- Cross platform: Handles runtime Android permissions for the native device features. Not fully tested - only was tested on a single device.
- Localization ready - we just need some strings in a different language.

## Orgnization of code
- *app* - Contains the App Component
- *assets* - Contains the /i18n/ folder containig localized strings
- *models* - Two models are used for the single user version of the application. Location and Journal Entries.
- *pages* - This holds individual UI pages. Sub-folders organized by screen/feature.
- *services* - This is where I retrieve all my records. There is a single Angular service to handle the Journal Records.


## Setup Instructions
```
npm install
ionic cordova platform add ios
ionic cordova run ios

If you run into issues, you may need to edit the Xcode Project to handle either Automatic or Manual signing of the code for the devices and/or Simulators.
```
replace `ios` with `android` if you wish to run on android
or run the setup script, then `ionic run ios` or `ionic run android` after.

## Tested on iPhone 6 Plus (iOS 10), Google Pixel (API 25)
## Built with Xcode 8 and Android Studio, Ionic 3.4.2
## See below for output of `ionic info`


### Future Considerations
- Implement a login system that that leverages Auth0/Azure AD/etc.
- Utilize the full power of PouchDB, and have a server implementation that syncs based on your username (from the previous point) across devices. My personal choice would be Couchbase and SyncGateway. I discuss this further below for my approach.
- Implement a timeline or Calendar view, and view your entries by the month
- Utilize CodePush's helper methods, and build a full Angular service around the plugin rather than talk to the plugin directly

### Cordova Plugins/Angular Libraries Utilized
- [Code Push 2.x][codePush]  
    I like this plugin. This plugin and combined with PouchDB + a serverside NoSQL setup, you can get a very clean app. You can organize the app with different deployment channels, and bypass App Store updating procedures. Combining this with ADAL would allow an equivalent version of Test Flight/HockeyApp/Fabric Beta.
- [Android Permissions][permissions] 
    I would use this and softly block parts of the UI if certain Android permissions were blocked. This plugin helps to recognize what permissions are available, especially since Android 6+, permission structured is also applied at Runtime, and not just in the `AndroidManifest.xml` file in the Android project.
- [ngx-translate][ngx]
    I handle localization (with only English right now!). I load a raw JSON file from the /assets/ directory.
- [ngular-google-maps][agm] 
    I use this for the Google Maps marker position and location feature.

#### Testing Libraries
- I would choose to use Karma and Jasmine if I were to write unit tests as recommended by Ionic.

### Deploying to CodePush
```
code-push release-cordova Demo-Android Android -d Production
code-push release-cordova Demo-iOS ios -d Production

This will not work unless you are logged in as me on the [CodePush CLI][codepushcli]
```

## Security Considerations/Notes and Requirements 
- Minifying and full obfuscation of all web files needs to be done
- Need to add the helper Strings that would be used for the iOS 10 prompts for Apple's permission of Camera/Location dialogs. These strings are required before App Store submission. They are blank right now in config.xml
- CodePush Keys in the source code are only one factor for how Microsoft handles CodePush. It requires the installation of the CodePush CLI and be logged into an account where the account has access to push updates to app's which have those keys.
- Encryption of any DB to be used
- HTTPS for all communications
- Sync the Production and Staging repositories and have that matching the Code Push deployments. Although many Cordova/Ionic apps are always in "one" repo since it's "one" codebase, Microsoft recommends splitting the repositories by their OS. This will allow ease when doing version promotions via Code Push, or if a hotfix is needed in Production.


## Output of my `ionic info`

```
global packages:

    @ionic/cli-utils : 1.4.0
    Cordova CLI      : 6.5.0 
    Ionic CLI        : 3.4.0

local packages:

    @ionic/app-scripts              : 1.3.7
    @ionic/cli-plugin-cordova       : 1.4.0
    @ionic/cli-plugin-ionic-angular : 1.3.1
    Cordova Platforms               : android 6.1.2 ios 4.3.1
    Ionic Framework                 : ionic-angular 3.4.2

System:

    Node       : v8.0.0
    OS         : macOS Sierra
    Xcode      : Xcode 8.2.1 Build version 8C1002 
    ios-deploy : 1.9.1 
    ios-sim    : not installed
    npm        : 5.0.0 

```

### If I had more time
- I would setup a small environment with Azure Active Directory with the official [Authentication Library][cordovaADAL] for an authentication system, along with Couchbase for a server side NoSQL solution running on a CentOS environment
- I would handle the saved entries in the JSON documents with IDs, and would be created in a manner similar to this within my file containing my DB methods.
```
    createTimeBasedIDSuffix(){
      return new Date().toJSON() + Math.random();
    }

    newJournalEntryID(){
      return "journalApp::journalEntry::" + this.createTimeBasedIDSuffix();
    }

```
- Dedicated unit tests against the DB transactions
- Unit test the services
- Previously in Angular 1, I would use $rootScope.$broadcast() to be able to sync my DB
- Couchbase [released][pouchCouchbaseAngular2] a Couchbase project with Angular 2 and how to sync with PouchDB - technicalities I have not included in this specific project.
- Images would be saved on a CDN, such as Cloudinary

[codePush]: https://github.com/Microsoft/cordova-plugin-code-push
[codepushcli]:https://github.com/Microsoft/code-push
[pouchDB]: https://pouchdb.com/
[cordovaADAL]: https://github.com/AzureAD/azure-activedirectory-library-for-cordova
[pouchCouchbaseAngular2]:https://github.com/couchbaselabs/pouchdb-angular2
[agm]:https://github.com/SebastianM/angular-google-maps
[ngx]:https://github.com/ngx-translate/core
[permissions]:https://github.com/NeoLSN/cordova-plugin-android-permissions