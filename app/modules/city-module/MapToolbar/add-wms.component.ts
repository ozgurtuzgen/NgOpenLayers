import {Component, OnInit} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";


@Component({
    selector: "stm-map-toolbar-addwms",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/addwms.html"
})

export class STMMapToolbarAddWMS implements OnInit {

    url: string = "http://localhost:8082/geoserver/wms";
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

    addWMS() {
        var params = {'LAYERS': this.layer};

        var wmsSource = new ol.source.ImageWMS({
            url: this.url,
            serverType: this.serverType,
            params: params,
            projection:null
        });

        var wmsLayer = new ol.layer.Image({
            source: wmsSource
        });

        this.stmmap.addLayer(this.layer,wmsLayer,true);
    }

    closeDialog()
    {
        this.display=false;
    }
}