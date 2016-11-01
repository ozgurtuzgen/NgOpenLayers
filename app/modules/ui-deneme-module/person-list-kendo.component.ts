import {Person} from "./person";
import {PersonService} from "./person.service";
import { Component } from '@angular/core';
import {OnInit} from "@angular/core";

@Component({
    selector: 'person-list-kendo',
    template: `
    <div>
    Kendo
        <kendo-grid [data]="personList">
            <kendo-grid-column field="id" title="id"></kendo-grid-column>
            <kendo-grid-column field="ad" title="Ad"></kendo-grid-column>
            <kendo-grid-column field="soyad" title="Soyad"></kendo-grid-column>
            <kendo-grid-column field="yas" title="Yaş"></kendo-grid-column>
        </kendo-grid>
    </div>
    `,
    providers: [PersonService]
})

export class PersonListComponentKendo implements OnInit {
  
   ngOnInit(): void {
        this.getPersonList();
    }

    personList: Person[];

    selectedPerson : Person;

    getPersonList(): void {
        this.personService.getPersonList().then(personList=>this.personList = personList);
    }

    constructor(private personService: PersonService) {
    }
}