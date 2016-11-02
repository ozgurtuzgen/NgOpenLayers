import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { City } from "./city"
import { STMMapComponent } from "./stm-map.component";
import { STMLayerList } from "./stm-layerlist.component";
import {STMMapStatusBar} from "./stm-mapstatusbar.component";

@Component({
    selector: "stm-app",
    template: `
<table><tr><td style="vertical-align:top">
  <stm-city-list   (onSelectedCityChanged)="onCityChanged($event,stmmap1)"> loading</stm-city-list>
</td>
<td>
    <stm-map id="ozgur" #stmmap1>Loading...</stm-map>
    <stm-mapstatusbar #mapstatusbar1></stm-mapstatusbar>
    </td><td align="top" style="vertical-align: top">
   <stm-layer-list #stmlayerlist1 ></stm-layer-list>
    
</td></tr></table>
`
})

export class STMAppComponent implements OnInit, AfterViewInit {

    @ViewChild("stmmap1") private mapObj: STMMapComponent;
    @ViewChild("stmlayerlist1") private stmLayerList: STMLayerList;
    @ViewChild("mapstatusbar1") private stmMapStatusBar: STMMapStatusBar;

    ngAfterViewInit(): void {
        this.stmLayerList.layerlist = this.mapObj.layers;
        this.stmMapStatusBar.setMap(this.mapObj.map);
    }

    ngOnInit(): void {
    }

    onCityChanged(city: City, stmmap: STMMapComponent) {
        // stmmap.zoomtoExtent(city);
        this.mapObj.zoomtoExtent(city);
    }
}