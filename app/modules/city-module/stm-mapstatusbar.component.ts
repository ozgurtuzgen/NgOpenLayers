import { Component,OnInit, Output } from '@angular/core';

@Component({
    selector: 'stm-mapstatusbar',
    template: ` <div id="mouse-position"></div>
  
    `
})

export class STMMapStatusBar implements OnInit {


    setMap(map:ol.Map){
        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326',
            // comment the following two lines to have the mouse position
            // be placed within the map.
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
            undefinedHTML: '&nbsp;'
        });
        map.addControl(mousePositionControl);
    }

    ngOnInit(): void {

    }

    constructor() {
    }

}

