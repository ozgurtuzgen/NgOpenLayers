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
import {STMMapToolbarGoToCoordinate} from "./MapToolbar/map-toolbar-gotocoordinate.component"
import {FormsModule} from '@angular/forms';
import {DialogModule,DataListModule,OrderListModule} from 'primeng/primeng';
import {OverlayPanelModule} from 'primeng/primeng';
import {STMMapToolbarShow3d} from './MapToolbar/map-toolbar-show3d.component';
import {STMMapToolbarAddShapefile} from './MapToolbar/map-toolbar-add-shapefile.component';
import {STMMapToolbarMeasureDistance} from './MapToolbar/map-toolbar-measure-distance.component';
import {STMMapToolbarSaveMap} from "./MapToolbar/map-toolbar-save-map.component";
import {STMMapToolbarAddGeojson} from "./MapToolbar/map-toolbar-add-geojson.component";
import {Hakedis} from "./hakedis";
import {TabViewModule} from 'primeng/primeng';
import {TreeTableModule,TreeNode,SharedModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';

@NgModule({
    imports:      [ CommonModule, CityRoutingModule,FormsModule,DialogModule,DataListModule,OrderListModule,OverlayPanelModule,TabViewModule,TreeTableModule,SharedModule,InputTextModule,SpinnerModule ],
    declarations: [ STMMapComponent,STMCityListComponent,STMAppComponent,STMLayerList,STMMapStatusBar,STMMapToolbar,STMMapToolbarCreateProject,
        STMMapToolbarGoToCoordinate,STMMapToolbarShow3d,STMMapToolbarAddShapefile, STMMapToolbarMeasureDistance,STMMapToolbarSaveMap,STMMapToolbarAddGeojson,Hakedis],
    bootstrap:    [ STMAppComponent]
})

export class CityModule { }
