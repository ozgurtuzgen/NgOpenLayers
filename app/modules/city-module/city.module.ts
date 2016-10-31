import { NgModule }      from '@angular/core';
import { CommonModule }        from '@angular/common';
import { STMMapComponent }   from './stm-map.component';
import {STMCityListComponent} from "./city-list.component";
import {STMAppComponent} from "./city.component";
import {CityRoutingModule} from "./city-routing.module";

@NgModule({
    imports:      [ CommonModule, CityRoutingModule ],
    declarations: [ STMMapComponent,STMCityListComponent,STMAppComponent ],
    bootstrap:    [ STMAppComponent]
})

export class CityModule { }
