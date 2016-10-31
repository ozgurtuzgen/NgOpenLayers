import { Component,OnInit } from '@angular/core';
import {City} from "./city";

@Component({
    selector: 'stm-map',
    template: `
    <div id="map" style="width:600px;height:400px" class="map"></div>
    `
})
export class STMMapComponent implements OnInit {

    zoomtoExtent(city:City) {
        var zoomLevel =8;
        var position = ol.proj.fromLonLat([city.longitude, city.latitude]);
        this.map.setView(new ol.View({
            center: position,
            zoom: zoomLevel
        }));
    }

    map:any;
    //ol: any;

    ngOnInit():void{
        this.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([39, 33]),
                zoom: 4
            })
        });
    }
    constructor() {


    }
}