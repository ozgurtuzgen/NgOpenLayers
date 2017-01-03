import {Component, OnInit} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";
import forEach = require("core-js/fn/array/for-each");

declare var loadshp: Function;
declare var addShapeTool: STMMapToolbarAddShapefile;
declare var shapefileName: string;

@Component({
    selector: "stm-map-toolbar-addshapefile",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/addShapefile.html"
})

export class STMMapToolbarAddShapefile implements OnInit {



    stmmap: STMMapComponent;
    display: boolean = false;
    loaded: boolean = false;
    inputFile: HTMLInputElement;
    url: any;
    layerName: string;
    cs: Number = 4326;

    ngOnInit(): void {
        this.inputFile = document.getElementById("inputFile") as HTMLInputElement;
    }

    loadScripts() {
        var s1 = "https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.3/proj4.js";
        var s2 = "lib/jszip.js";
        var s3 = "lib/jszip-utils.js";
        var s4 = "lib/preprocess.js";
        var s5 = "lib/preview.js";
        var scriptArray = [s1, s2, s3, s4, s5];

        if (!this.loaded) {

            for (let s of scriptArray) {
                this.lazyLoadScript(s);
            }
        }

        this.loaded = true;
    }

    lazyLoadScript(src: string) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = src;
        document.body.appendChild(s);
    }

    returnData(data) {

        var features = (new ol.format.GeoJSON()).readFeatures(data, {
            dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857"
        });

        var isFeatureValid=true;
        for (var f = 0; f < features.length; f++) {
            isFeatureValid=true;
            var g = features[f].getGeometry() as ol.geom.Polygon;
            var coordList = g.getCoordinates();
            for (var i = 0; i < coordList.length; i++) {
                for (var k = 0; k < coordList[i].length; k++) {

                    var hole = coordList[i][k];
                    if(g.getType()=="Point") {
                        if (isNaN(hole[0]) || isNaN(hole[1])) {
                            features.splice(f, 1);
                            f--;
                            break;
                        }
                    }
                }
                if(!isFeatureValid)
                {
                    break;
                }
            }
        }

        //  features = [features[0], features[1]];

        var format = new ol.format.GeoJSON();

        var vectorSource = new ol.source.Vector({
            features: features,
            format: format,
        });

        var extent = vectorSource.getExtent();

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        var extent = vectorLayer.getSource().getExtent();

        addShapeTool.stmmap.addLayer(shapefileName, vectorLayer, true,true);
    }

    addShapefile() {
        //this.loadScripts();
        addShapeTool = this;


        loadshp({
            url: this.url,
            encoding: 'windows-1254',
            EPSG: this.cs,

        }, this.returnData);
    }

    loadShapefile() {
        var files = this.inputFile.files;
        this.url = files[0];
        shapefileName = files[0].name;
        this.addShapefile();
    }

    closeDialog() {
        this.display = false;
    }

    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;
    }

    showDialog() {
        this.display = true;
    }

    showFeatureInfo(feature:ol.Feature)
    {

    }




}