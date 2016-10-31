import {Person} from "./person";
import {PersonService} from "./person.service";
import { Component } from '@angular/core';
import {OnInit} from "@angular/core";
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
    selector: 'stm-city-list-prime',
    template: `
    <div>
    Prime
        <p-dataTable [value]="cityList">
            <p-column field="id" header="ID"></p-column>
            <p-column field="name" header="Adı"></p-column>
            <p-column field="latitude" header="Enlem"></p-column>
            <p-column field="longitude" header="Boylam"></p-column>
        </p-dataTable>
    </div>
    `,
    providers: [PersonService]
})

export class STMCityListComponentPrime implements OnInit {
  
   ngOnInit(): void {
        this.getPersonList();
    }

    
    personList: Person[];

    getPersonList(): void {
        this.personService.getCityList().then(personList=>this.personList = personList);
    }

    constructor(private personService: PersonService) {
    }
}