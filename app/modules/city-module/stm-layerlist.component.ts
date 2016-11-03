import { Component,OnInit,Input,Output } from '@angular/core';
import {STMLayer} from "./stm-layer";

@Component({
    selector: 'stm-layer-list',
    template: `
<table>
<tr><td>

</td></tr>

<h4>Katmanlar</h4>
<ul>
<li *ngFor="let layer of layerlist">
<span>
<table><tr><td>
   <input type="checkbox" checked (click)="toggleVisibility(layer)" >
</td>
{{layer.name}}

</tr></table>
</span>
</li>
</ul>
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

}