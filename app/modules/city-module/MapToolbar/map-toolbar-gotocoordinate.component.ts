import {Component, AfterViewInit} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";
import {ProjectItem} from "./ProjectItem";

@Component({
    selector: "stm-map-toolbar-gotocoordinate",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/gotocoordinate.html"
})


export class STMMapToolbarGoToCoordinate  {

    popup: HTMLElement;
    stmmap: STMMapComponent;
    display: boolean = false;

    lat:Number=33;
    lon:Number=41;
    cs:Number=4326;

    showDialog()
    {
        this.display=true;
    }

    closeDialog()
    {
        this.display=false;
    }

    gotoCoord()
    {
        var coord=[new Number(this.lat), new Number(this.lon)];

        if(this.cs==3857) {
            coord = ol.proj.transform(
                coord, 'EPSG:3857', 'EPSG:4326');
        }

        var view =new ol.View({
            center: ol.proj.fromLonLat(coord),
            zoom: 8
        });

        this.stmmap.map.setView(view);
    }


    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;
    }
}