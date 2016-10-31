import { NgModule }      from '@angular/core';
import { CommonModule }        from '@angular/common';
import {UiComponent} from "./ui.component";

/* Routing Module */
import { UiRoutingModule }   from './ui-routing.module'

@NgModule({
    imports:      [ CommonModule, UiRoutingModule ],
    declarations: [ UiComponent ],
    bootstrap:    [ UiComponent]
})

export class UiModule { }
