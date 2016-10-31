import {Person} from "./person";
import {PersonService} from "./person.service";
import { Component } from '@angular/core';
import {OnInit} from "@angular/core";

@Component({
    selector: 'person-list-prime',
    template: `
    <div>
    Prime
        <p-dataTable [value]="personList">
            <p-column field="id" header="ID"></p-column>
            <p-column field="ad" header="Adı"></p-column>
            <p-column field="soyad" header="Enlem"></p-column>
            <p-column field="yas" header="Boylam"></p-column>
        </p-dataTable>
    </div>
    `,
    providers: [PersonService]
})

export class PersonListComponentPrime implements OnInit {
  
   ngOnInit(): void {
        this.getPersonList();
    }

    
    personList: Person[];

    getPersonList(): void {
        this.personService.getPersonList().then(personList=>this.personList = personList);
    }

    constructor(private personService: PersonService) {
    }
}