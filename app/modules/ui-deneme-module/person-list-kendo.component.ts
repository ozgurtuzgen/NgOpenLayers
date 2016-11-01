import {Person} from "./person";
import {PersonService} from "./person.service";
import { Component } from '@angular/core';
import {OnInit} from "@angular/core";
import {
  GridDataResult,
  SortDescriptor,
  orderBy
} from '@progress/kendo-angular-grid';

@Component({
    selector: 'person-list-kendo',
    template: `
    <div>
    Kendo
        <kendo-grid [data]="gridView"
                    [sortable]="{ mode: 'multiple' }"
                    [sort]="sort"
                    (sortChange)="sortChange($event)"
                    [selectable]="true"
                    (selectionChange) = "selected($event)"
          >
            <kendo-grid-column field="id" title="id"></kendo-grid-column>
            <kendo-grid-column field="ad" title="Ad"></kendo-grid-column>
            <kendo-grid-column field="soyad" title="Soyad"></kendo-grid-column>
            <kendo-grid-column field="yas" title="Yaş"></kendo-grid-column>
        </kendo-grid>
    </div>
        <div *ngIf = "selectedPerson">
            {{selectedPerson.ad}} {{selectedPerson.soyad}} {{selectedPerson.yas}}
        </div>
    `,
    providers: [PersonService]
})

export class PersonListComponentKendo implements OnInit {
    
   personList: Person[];
   private sort: SortDescriptor[] = [];
   private gridView: GridDataResult;

   ngOnInit(): void {
        this.getPersonList();
    }


    selectedPerson : Person;

    getPersonList(): void {
        this.personService.getPersonListKendo().then(personList=>this.personList = personList);
    }

    constructor(private personService: PersonService) {
    }

     protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadProducts();
    }

    private loadProducts(): void {
        this.gridView = {
            data: orderBy(this.personList, this.sort),
            total: this.personList.length
        };
    }

    protected selected($event)
    {
        this.selectedPerson = this.gridView.data[$event.index];
    }
}