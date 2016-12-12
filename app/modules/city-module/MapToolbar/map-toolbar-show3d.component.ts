import {Component} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";

declare var create3d: Function;
declare var toggle3d: Function;


@Component({
    selector: "stm-map-toolbar-show3d",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/show3d.html"
})

export class STMMapToolbarShow3d {

    show3dTooltip: string = "3d görünüme geç";
    show2dTooltip: string = "2d görünüme geç";
    is2dActive: boolean = true;

    tooltip: string;
    is3dLoaded: boolean = false;
    stmmap: STMMapComponent;

    show3d() {
        if (!this.is3dLoaded) {
            create3d(this.stmmap.map);
            this.is3dLoaded = true;
        }

        this.is2dActive = !this.is2dActive;
        this.tooltip = this.is2dActive ? this.show3dTooltip : this.show2dTooltip;

        toggle3d();
    }


    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;
    }

    constructor() {
        this.tooltip = this.show3dTooltip;
    }

}