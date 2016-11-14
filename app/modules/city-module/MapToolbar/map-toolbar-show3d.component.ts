import {Component} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";

declare var create3d: Function;
declare var toggle3d:Function;


@Component({
    selector: "stm-map-toolbar-show3d",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/show3d.html"
})

export class STMMapToolbarShow3d {

    is3dLoaded: boolean = false;
    stmmap: STMMapComponent;

    show3d() {
        if (!this.is3dLoaded) {
            create3d(this.stmmap.map);
            this.is3dLoaded = true;
        }

        toggle3d();
    }


    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;
    }

}