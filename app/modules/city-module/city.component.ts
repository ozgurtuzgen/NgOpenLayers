import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {City} from "./city"
import {STMMapComponent} from "./stm-map.component";
import {STMLayerList} from "./stm-layerlist.component";
import {STMMapStatusBar} from "./stm-mapstatusbar.component";
import {STMMapToolbar} from "./MapToolbar/map-toolbar.component";

@Component({
    selector: "stm-app",
    template: `
<stm-map-toolbar id="mapToolbar1" #mapToolbar1 ></stm-map-toolbar>
<stm-layer-list id="stmlayerlist1" #stmlayerlist1 style="position:absolute;top:150px;left:12px;z-index: 10001"></stm-layer-list>
   <stm-map  id="ozgur" #stmmap1>Loading...</stm-map>
`
})

export class STMAppComponent implements OnInit, AfterViewInit {

    @ViewChild("stmmap1") private mapObj: STMMapComponent;
    @ViewChild("stmlayerlist1") private stmLayerList: STMLayerList;
   // @ViewChild("mapstatusbar1") private stmMapStatusBar: STMMapStatusBar;
    @ViewChild("mapToolbar1") private stmMapToolbar: STMMapToolbar;


    ngAfterViewInit(): void {
        this.stmLayerList.layerlist = this.mapObj.layers;
     //   this.stmMapStatusBar.setMap(this.mapObj.map);
        this.stmMapToolbar.setMap(this.mapObj);
        this.stmLayerList.setMap(this.mapObj);
    }

    ngOnInit(): void {
    }

    onCityChanged(city: City, stmmap: STMMapComponent) {
        // stmmap.zoomtoExtent(city);
        this.mapObj.zoomtoExtent(city);
    }
}