import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BasicComponent} from "./basic.component";

/* Routing Module */
import { BasicRoutingModule }   from './basic-routing.module'

@NgModule({
    imports:      [ BrowserModule, BasicRoutingModule ],
    declarations: [ BasicComponent ],
    bootstrap:    [ BasicComponent]
})

export class BasicModule { }
