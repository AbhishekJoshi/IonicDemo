import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { JournalService } from "../../services/journal";
import { JournalEntry } from "../../models/journal-entry";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-place',
  templateUrl: 'journal.html'
})
export class JournalPage {
  journalEntry: JournalEntry;
  index: number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private journalService: JournalService,
              private translate: TranslateService) {

    this.journalEntry = this.navParams.get('journalEntry');
    this.index = this.navParams.get('index');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onDelete() {
    this.journalService.deleteJournals(this.index);
    this.onLeave();
  }
}
