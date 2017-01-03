import {Component, OnInit} from '@angular/core';
import {STMLayer} from "../stm-layer";
import {STMMapComponent} from "../stm-map.component";

@Component({
    selector: "stm-map-attribute-table",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/attribute-table.html"
})

export class STMMapAttributeTable {



    isVisible: boolean = false;
    stmLayer: STMLayer;
    title: string = "";
    keys: string[];

    featureList:ol.Feature[];
    stmMap:STMMapComponent;
    selectInteraction:ol.interaction.Select;

    constructor() {
        this.keys = [];
        this.featureList=[];
    }

    setMap(stmmap:STMMapComponent)
    {
        this.stmMap=stmmap;
        var interactions=this.stmMap.map.getInteractions().getArray();
        for(var i=0;i<interactions.length;i++)
        {
            var s=interactions[i] as ol.interaction.Select;

            if( s)
            {
                this.selectInteraction=s;
            }
        }
    }


    zoomToFeature(feature:ol.Feature) {
        var features = this.selectInteraction.getFeatures();
        features.clear();
        features.push(feature);

        var extent = feature.getGeometry().getExtent();
        this.stmMap.map.getView().fit(extent, this.stmMap.map.getSize());
    }

    showFeatureInfo(layer: STMLayer) {
        this.keys = [];

        this.isVisible = true;
        this.stmLayer = layer;
        this.title = layer.name + " - Öznitelik Bilgileri";

        var vector = layer.layer as ol.layer.Vector;
        var src = vector.getSource();
        this.featureList = src.getFeatures();
        var table = document.getElementById("tblFeatureList") as HTMLTableElement;

        var tbody = table.createTBody();
     //   var thead = table.createTHead();

        if (this.featureList.length > 0) {
            this.keys = this.featureList[0].getKeys();
        }

       /* for (var i = 0; i < this.featureList.length; i++) {

            var feature = this.featureList[i];


           for (var k = 0; k < this.keys.length; k++) {
                var td = document.createElement("td");
                td.innerText = this.keys[k];
                tr.appendChild(td);
            }
            thead.appendChild(tr);

            var tr = document.createElement("tr");
            for (var k = 0; k < this.keys.length; k++) {
                var td = document.createElement("td");
                td.innerText = feature.get(this.keys[k]);
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }*/
   //     table.appendChild(thead);
      //  table.appendChild(tbody);
    }
}