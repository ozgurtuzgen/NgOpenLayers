import {Person} from "./person";
import {PersonService} from "./person.service";
import { Component } from '@angular/core';
import {OnInit} from "@angular/core";

@Component({
    selector: 'person-list-prime',
    template: `
    <div>
    Prime
        <input #gb type="text" placeholder="Global search">
        <p-dataTable [value]="personList" [sortMode]="multiple" [globalFilter]="gb"  selectionMode="single" [(selection)]="selectedPerson" [responsive]="true">
            <p-column field="id" header="id"  sortable="true" [filter]="true"></p-column>
            <p-column field="ad" header="Ad" sortable="true" [filter]="true"></p-column>
            <p-column field="soyad" header="Soyad" sortable="true" [filter]="true"></p-column>
            <p-column field="yas" header="Yaş" sortable="true" [filter]="true"></p-column>
        </p-dataTable>
        <div *ngIf = "selectedPerson">
            {{selectedPerson.ad}} {{selectedPerson.soyad}} {{selectedPerson.yas}}
        </div>
    </div>
    `,
    providers: [PersonService]
})

export class PersonListComponentPrime implements OnInit {
  
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