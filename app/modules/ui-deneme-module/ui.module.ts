import { NgModule }      from '@angular/core';
import { CommonModule }        from '@angular/common';
import {UiComponent} from "./ui.component";
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {PersonListComponentPrime} from "./person-list-prime.component"

/* Routing Module */
import { UiRoutingModule }   from './ui-routing.module'

@NgModule({
    imports:      [ CommonModule, UiRoutingModule, DataTableModule, SharedModule ],
    declarations: [ UiComponent, PersonListComponentPrime ],
    bootstrap:    [ UiComponent]
})

export class UiModule { }
