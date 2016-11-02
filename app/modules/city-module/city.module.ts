import { NgModule }      from '@angular/core';
import { CommonModule }        from '@angular/common';
import { STMMapComponent }   from './stm-map.component';
import {STMCityListComponent} from "./city-list.component";
import {STMAppComponent} from "./city.component";
import {CityRoutingModule} from "./city-routing.module";
import {STMLayerList} from "./stm-layerlist.component"

@NgModule({
    imports:      [ CommonModule, CityRoutingModule ],
    declarations: [ STMMapComponent,STMCityListComponent,STMAppComponent,STMLayerList ],
    bootstrap:    [ STMAppComponent]
})

export class CityModule { }
