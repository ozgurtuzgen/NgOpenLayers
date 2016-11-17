import { Component,OnInit,Input,Output } from '@angular/core';
import {STMLayer} from "./stm-layer";

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
 
  <table style="padding:2px" ><tr>
  <td style="padding:2px">
  <img style="width: 12px;height:12px"  src="app/img/delete.png" (click)="deleteLayer(layer)">
</td>
  <td style="padding:2px">
   <input type="checkbox" checked (click)="toggleVisibility(layer)" >
</td>
<td style="padding-right:6px">

{{layer.name}}

</td>


</tr></table>
  </template>
  
  </p-dataList>

  </table>
    `
})

export class STMLayerList implements OnInit {

    layerlist: STMLayer[];

    toggleVisibility(layer: STMLayer) {
        var visible = layer.layer.getVisible();
        visible = !visible;
        layer.layer.setVisible(visible);
    }

    ngOnInit(): void {

    }

    constructor() {
        this.layerlist = [];
    }

    deleteLayer(layer:STMLayer) {
        if(layer.isUserDefined) {
            var index = this.layerlist.indexOf(layer);
            this.layerlist.splice(index, 1);
        }
    }
}