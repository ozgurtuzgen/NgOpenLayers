import {Component} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";

declare var loadshp:Function;

@Component({
    selector: "stm-map-toolbar-addshapefile",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/addShapefile.html"
})

export class STMMapToolbarAddShapefile {

    is3dLoaded: boolean = false;
    stmmap: STMMapComponent;

    loaded: boolean;

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
    }

    lazyLoadScript(src: string) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = src;
        document.body.appendChild(s);
    }


    returnData = function (data, tag, processFunction) {

        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(data)
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        processFunction(data);
        //  self.stmmap.addLayer("Shapefile layer", vectorLayer);
    }



    addShapefile() {
        //this.loadScripts();
        var self = this;

        loadshp({
            url: 'app//testdata//10tnvillage.zip',
            encoding: 'big5',
            EPSG: 3826,

        }, this.returnData, this.processData);
    }

    processData(data) {

    }

    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;
    }

}