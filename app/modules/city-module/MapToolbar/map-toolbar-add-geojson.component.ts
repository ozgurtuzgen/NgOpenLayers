import {Component, OnInit} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";
import forEach = require("core-js/fn/array/for-each");

declare var addGeojsonTool:STMMapToolbarAddGeojson;

@Component({
    selector: "stm-map-toolbar-addGeojson",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/addGeojson.html"
})

export class STMMapToolbarAddGeojson implements OnInit {

    stmmap: STMMapComponent;
    inputFile: HTMLInputElement;
    url: any;
    geojsonFileName:string;
    display: boolean = false;

    ngOnInit(): void {
        this.inputFile = document.getElementById("inputFile1") as HTMLInputElement;
        addGeojsonTool=this;
    }

    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;
    }

    loadGeojson() {
        var files = this.inputFile.files;
        this.url = files[0];
        this.geojsonFileName = files[0].name;


        if (this.url) {
            var r = new FileReader();
            r.onloadend = function (e) {
              addGeojsonTool.addGeojsonDataToMap(r.result);
            }

            r.readAsText(this.url);
        } else {
            alert("Failed to load file");
        }



    }

    addGeojsonDataToMap(data:any)
    {
        var features = (new ol.format.GeoJSON()).readFeatures(data, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857"
        });

        var vectorSource = new ol.source.Vector({
            features: features
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        this.stmmap.addLayer(this.geojsonFileName, vectorLayer, true);
    }



    closeDialog()
    {
        this.display = false;
    }

    showDialog() {
        this.display = true;
    }
}