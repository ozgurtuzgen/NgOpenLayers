import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RestConsumeComponent} from "./rest-consume.component";

/* Routing Module */
import { RestConsumeRoutingModule }   from './rest-consume-routing.module'

import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import {UserService} from './user.service';

import {DataTableModule,SharedModule} from 'primeng/primeng';


@NgModule({
    imports:      [ BrowserModule, RestConsumeRoutingModule, HttpModule, InMemoryWebApiModule.forRoot(InMemoryDataService), DataTableModule, SharedModule],
    declarations: [ RestConsumeComponent ],
    providers:    [ UserService ],
    bootstrap:    [ RestConsumeComponent]
})

export class RestConsumeModule { }