import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { AddJournalEntryPage } from "../add-journal-entry/add-journal-entry";
import { JournalEntry } from "../../models/journal-entry";
import { JournalService } from "../../services/journal";
import { JournalPage } from "../journal/journal";
import { TranslateService } from '@ngx-translate/core';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addJournalPage = AddJournalEntryPage;
  journals: JournalEntry[] = [];

  constructor(public navCtrl: NavController, 
              private modalCtrl: ModalController,
              private journalService: JournalService, 
              private translate: TranslateService) {

        translate.setDefaultLang('en');

  }
  
  ngOnInit() {
    this.journalService.fetchJournals()
      .then(
        (journals: JournalEntry[]) => {
          console.log(journals);
          this.journals = journals
      }
      );
  }

  ionViewWillEnter() {
    this.journals = this.journalService.loadJournals();
  }

  onOpenJournal(journal: JournalEntry, index: number) {
    const modal = this.modalCtrl.create(JournalPage, {journalEntry: journal, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.journals = this.journalService.loadJournals();
      }
    );
  }

}
