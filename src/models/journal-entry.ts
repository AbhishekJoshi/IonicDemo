import { Location } from "./location";

export class JournalEntry {
    constructor(public title: string, public date: string, public description: string, public location: Location, public imageUrl: string){

    }

} 