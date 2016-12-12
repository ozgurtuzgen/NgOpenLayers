import {Component, OnInit, Input, Output} from '@angular/core';
import {STMLayer} from "./stm-layer";
import {STMMapComponent} from "./stm-map.component";

@Component({
    selector: 'stm-layer-list',
    template: `
<table>
<tr><td>



<p-dataList [value]="layerlist">
  <header>
       Katmanlar
    </header>
  <template let-layer>
 <div sytle="padding:4px">
  <table style="font-size:14px" ><tr>
  <td>
  <img style="width: 12px;height:12px"  [ngStyle]="{'visibility': getVisibility(layer.isUserDefined)}"  src="app/img/delete.png" (click)="deleteLayer(layer)">
</td>
<td>
  <img style="width: 12px;height:12px"  src="app/img/four-arrows.png" (click)="zoomToLayer(layer)">

</td>
  <td style="padding:2px">
   <input type="checkbox" checked (click)="toggleVisibility(layer)" >
</td>
<td style="padding-right:4px">

{{layer.name}}

</td>


</tr></table>
</div>
  </template>
  
  </p-dataList>


  </table>
    `
})

export class STMLayerList implements OnInit {

    stmMap: STMMapComponent;
    layerlist: STMLayer[];

    toggleVisibility(layer: STMLayer) {
        var visible = layer.layer.getVisible();
        visible = !visible;
        layer.layer.setVisible(visible);
    }

    zoomToLayer(layer: STMLayer) {
        var src = layer.layer.getSource() as ol.source.Vector;
        if(src) {
            var extent = src.getExtent();
         //   extent = ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');

            if (extent) // minLon != null && minLat != null && maxLon != null && maxLat != null){
            {
             /*   var bottomLeft = ol.proj.transform([minLon, minLat], 'EPSG:4326', 'EPSG:3857');
                var topRight = ol.proj.transform([maxLon, maxLat], 'EPSG:4326', 'EPSG:3857');
                extent = new ol.extent.boundingExtent([bottomLeft,topRight]);*/
                this.stmMap.map.getView().fit(extent, this.stmMap.map.getSize());
            }
        }
    }

    ngOnInit(): void {

    }

    constructor() {
        this.layerlist = [];
    }

    deleteLayer(layer: STMLayer) {
        if (layer.isUserDefined) {
            var index = this.layerlist.indexOf(layer);
            this.layerlist.splice(index, 1);
        }

        this.stmMap.map.removeLayer(layer.layer);
    }

    getVisibility(isVisible: boolean) {
        var result = "visible";
        if (!isVisible)
            result = "hidden";
        return result;
    }

    setMap(stmMap: STMMapComponent) {
        this.stmMap = stmMap;
    }
}