import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
// import { File } from "@ionic-native/File";

import { JournalEntry } from "../models/journal-entry";
import { Location } from "../models/location";

declare var cordova: any;

@Injectable()
export class JournalService {
  private journals: JournalEntry[] = [];

  constructor(private storage: Storage,) {}

  addJournal(title: string,
           description: string,
           location: Location,
           imageUrl: string) {
    const journal = new JournalEntry(title, new Date().toISOString(), description, location, imageUrl);
    this.journals.push(journal);
    this.storage.set('journals', this.journals)
      .then()
      .catch(
        err => {
          this.journals.splice(this.journals.indexOf(journal), 1);
        }
      );
  }

  loadJournals() {
    return this.journals.slice();
  }

  fetchJournals() {
    return this.storage.get('journals')
      .then(
        (journals: JournalEntry[]) => {
          this.journals = journals != null ? journals : [];
          return this.journals;
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  deleteJournals(index: number) {
    const journal = this.journals[index];

    this.journals.splice(index, 1);
    this.storage.set('journals', this.journals)
      .then(
        () => {
          this.removeFile(journal);
        }
      )
      .catch(
        err => console.log(err)
      );
  }

private removeFile(journal: JournalEntry) {


    // const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    //  this.file.removeFile(cordova.file.dataDirectory, currentName)
    //   .then(
    //     () => console.log('Removed File')
    //   )
    //   .catch(
    //     () => {
    //       console.log('Error while removing File');
    //       this.addPlace(place.title, place.description, place.location, place.imageUrl);
    //     }
    //   );
  
}
}
