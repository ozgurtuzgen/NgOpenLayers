import { NgModule }      from '@angular/core';
import { CommonModule }        from '@angular/common';
import { STMMapComponent }   from './stm-map.component';
import {STMCityListComponent} from "./city-list.component";
import {STMAppComponent} from "./city.component";
import {CityRoutingModule} from "./city-routing.module";
import {STMLayerList} from "./stm-layerlist.component";
import {STMMapStatusBar} from "./stm-mapstatusbar.component";
import {STMMapToolbar} from "./MapToolbar/map-toolbar.component";
import {STMMapToolbarCreateProject} from "./MapToolbar/map-toolbar-create-project.component";
import {FormsModule} from '@angular/forms';

@NgModule({
    imports:      [ CommonModule, CityRoutingModule,FormsModule ],
    declarations: [ STMMapComponent,STMCityListComponent,STMAppComponent,STMLayerList,STMMapStatusBar,STMMapToolbar,STMMapToolbarCreateProject ],
    bootstrap:    [ STMAppComponent]
})

export class CityModule { }
