import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {City} from "./city"
import {STMMapComponent} from "./stm-map.component";
import {STMLayerList} from "./stm-layerlist.component";
import {STMMapStatusBar} from "./stm-mapstatusbar.component";
import {STMMapToolbar} from "./MapToolbar/map-toolbar.component";

@Component({
    selector: "stm-app",
    template: `
<table>
<tr>
<td style="vertical-align:top">
  <stm-city-list   (onSelectedCityChanged)="onCityChanged($event,stmmap1)"> loading</stm-city-list>
</td>
<td>

<table>
<tr>
<td>
<stm-map-toolbar #mapToolbar1></stm-map-toolbar>
</td>
<td>&nbsp;</td>
</tr>
<tr><td>
    <stm-map id="ozgur" #stmmap1>Loading...</stm-map>

</td>
<td style="vertical-align: top;padding-left: 4px">
   <stm-layer-list #stmlayerlist1 ></stm-layer-list>

</td>

</tr>
<tr><td>
    <stm-mapstatusbar #mapstatusbar1></stm-mapstatusbar>
</td></tr>

</table>

    
</td></tr></table>
`
})

export class STMAppComponent implements OnInit, AfterViewInit {

    @ViewChild("stmmap1") private mapObj: STMMapComponent;
    @ViewChild("stmlayerlist1") private stmLayerList: STMLayerList;
    @ViewChild("mapstatusbar1") private stmMapStatusBar: STMMapStatusBar;
    @ViewChild("mapToolbar1") private stmMapToolbar: STMMapToolbar;


    ngAfterViewInit(): void {
        this.stmLayerList.layerlist = this.mapObj.layers;
        this.stmMapStatusBar.setMap(this.mapObj.map);
        this.stmMapToolbar.setMap(this.mapObj);
    }

    ngOnInit(): void {
    }

    onCityChanged(city: City, stmmap: STMMapComponent) {
        // stmmap.zoomtoExtent(city);
        this.mapObj.zoomtoExtent(city);
    }
}