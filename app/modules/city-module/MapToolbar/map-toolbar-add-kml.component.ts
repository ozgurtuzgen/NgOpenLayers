import {Component, OnInit} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";
import forEach = require("core-js/fn/array/for-each");

declare var addKmlTool:STMMapToolbarAddKml;

@Component({
    selector: "stm-map-toolbar-addKml",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/addKml.html"
})

export class STMMapToolbarAddKml implements OnInit {

    stmmap: STMMapComponent;
    inputFile: HTMLInputElement;
    url: any;
    KmlFileName:string;
    display: boolean = false;

    ngOnInit(): void {
        this.inputFile = document.getElementById("inputFileKml") as HTMLInputElement;
        addKmlTool=this;
    }

    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;
    }

    loadKml() {
        var files = this.inputFile.files;
        this.url = files[0];
        this.KmlFileName = files[0].name;


        if (this.url) {
            var r = new FileReader();
            r.onloadend = function (e) {
                addKmlTool.addKmlDataToMap(r.result);
            }

            r.readAsText(this.url);
        } else {
            alert("Failed to load file");
        }
    }

    addKmlDataToMap(data:any)
    {
        var features = (new ol.format.KML()).readFeatures(data, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857"
        });

        var vectorSource = new ol.source.Vector({
            features: features
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });


        this.stmmap.addLayer(this.KmlFileName, vectorLayer, true);
    }



    closeDialog()
    {
        this.display = false;
    }

    showDialog() {
        this.display = true;
    }
}