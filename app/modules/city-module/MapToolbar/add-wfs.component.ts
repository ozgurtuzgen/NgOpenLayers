import {Component, OnInit} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";


@Component({
    selector: "stm-map-toolbar-addwfs",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/addwfs.html"
})

export class STMMapToolbarAddWFS implements OnInit {

    url: string = "https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=osm:water_areas&outputFormat=application/json&srsname=EPSG:3857&EPSG:3857'";
    serverType: string = "geoserver";
    layer: string = "topp:states";
    stmmap: STMMapComponent;
    display: boolean = false;

    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;
    }

    ngOnInit(): void {

    }

    showDialog() {
        this.display = true;
    }

    addWFS() {
        var vectorSource = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function(extent:any) {
                return 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
                    'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                    'outputFormat=application/json&srsname=EPSG:3857&' +
                    'bbox=' + extent.join(',') + ',EPSG:3857';
            },
            strategy: ol.loadingstrategy.bbox
        });


        var vector = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 255, 1.0)',
                    width: 2
                })
            })
        });


        this.stmmap.addLayer(this.layer,vector,true);
    }

    closeDialog()
    {
        this.display=false;
    }
}