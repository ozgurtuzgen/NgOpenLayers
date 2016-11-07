import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./app.component";
/* Feature Modules */
import { BasicModule }      from './modules/basic-module/basic.module';
import { RestConsumeModule }      from './modules/rest-consume-module/rest-consume.module';
/* Routing Module */
import { AppRoutingModule }   from './routing.module'

@NgModule({
    imports:      [ BrowserModule, AppRoutingModule, BasicModule, RestConsumeModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent]
})

export class AppModule { }
