import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { STMMapComponent }   from './stm-map.component';
import {STMCityListComponent} from "./city-list.component";
import {STMAppComponent} from "./app.component";

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ STMMapComponent,STMCityListComponent,STMAppComponent ],
    bootstrap:    [ STMAppComponent]
})

export class AppModule { }
