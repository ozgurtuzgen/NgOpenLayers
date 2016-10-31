import { NgModule }      from '@angular/core';
import { CommonModule }        from '@angular/common';
import {UiComponent} from "./ui.component";
import {DataTableModule,SharedModule} from 'primeng/primeng';
import { GridModule } from '@progress/kendo-angular-grid';
import {PersonListComponentPrime} from "./person-list-prime.component"
import {PersonListComponentKendo} from "./person-list-kendo.component"

/* Routing Module */
import { UiRoutingModule }   from './ui-routing.module'

@NgModule({
    imports:      [ CommonModule, UiRoutingModule, DataTableModule, SharedModule, GridModule ],
    declarations: [ UiComponent, PersonListComponentPrime, PersonListComponentKendo ],
    bootstrap:    [ UiComponent]
})

export class UiModule { }
