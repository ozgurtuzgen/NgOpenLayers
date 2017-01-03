import {STMMapComponent} from "./stm-map.component";
import {Component, OnInit} from '@angular/core';
import forEach = require("core-js/fn/array/for-each");
import {KeyValue} from "./KeyValue";
import {TreeNode} from "primeng/components/common/api";
import {IsKalemleriService} from "./isKalemleri.service";
import {IsaleHattiService} from "./isale-hatti.service";
import {IsaleHatti} from "./isale-hatti";
import {STMLayer} from "./stm-layer";


@Component({
    selector: "stm-map-toolbar-hakedis",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/hakedis.html",
    providers: [IsKalemleriService, IsaleHattiService]
})

export class Hakedis {
    startMeter: number = 0;
    endMeter: number;
    selectedFeatureList: ol.Feature[];


    isKalemleri: TreeNode[];

    getIsKalemleriList(): void {
        //   this.isKalemleriService.getIsKalemleri().then(isKalemleri => this.isKalemleri = isKalemleri);
        // var isaleHattiList= this.isaleHatlariService.getIsaleHatlari();
        var isaleHattiList = [];
        var errorMessage = "";
        this.isaleHatlariService.getIsaleHatlari()
            .subscribe(
                isaleHatlari => isaleHattiList = isaleHatlari,
                error => errorMessage = <any>error);
    }

    constructor(private isKalemleriService: IsKalemleriService, private isaleHatlariService: IsaleHattiService) {

    }

    display: boolean = false;
    keys: KeyValue[];

    map: ol.Map;
    source: ol.source.Vector;
    stmMap: STMMapComponent;

    tblSingleFeatureTable: HTMLElement;




    initialize(stmmap: STMMapComponent) {
        // this.isKalemleri=TreeNode[];
        this.selectedFeatureList=[];
        this.keys = [];
        this.stmMap = stmmap;
        this.map = this.stmMap.map;
        this.source = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            source: this.source,
            style: this.getStyle
        });

        this.stmMap.addLayer("Hakedişler", vector);
        this.activate();
        this.tblSingleFeatureTable = document.getElementById("tblSingleFeatureTable");
        // this.getIsKalemleriList();
    }


    initializeIsKalemleri() {

    }

    getStyle(feature, resolution) {
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#00ff00',
                width: 6,
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ff0000'
                }),
            })
            , text: new ol.style.Text({
                text: feature.get('name'),
                offsetY: -10
            })
        })
    }

    clearLayer() {
        this.source.clear();
    }

    addHakedis() {
        // multiple selection
        if(this.selectedFeatureList.length>1)
        {
            for(var i=0;i<this.selectedFeatureList.length;i++)
            {
                var tempGeom=this.selectedFeatureList[i].getGeometry() as ol.geom.LineString;
                var coords=tempGeom.getCoordinates();
                var tempArray=coords.slice(0,coords.length);
                var newGeom=new ol.geom.LineString(tempArray);

                    var feature = new ol.Feature({
                    geometry: newGeom
                });

                this.source.addFeature(feature);
            }
        }
        else if(this.selectedFeatureList.length==1) {

            var selectedFeature = this.selectedFeatureList[0];

            var dist1 = this.startMeter;
            var dist2 = this.endMeter;

            var selectedFeatureGeometry = selectedFeature.getGeometry() as ol.geom.LineString;
            var selectedFeatureLength = selectedFeatureGeometry.getLength();
            var fraction1 = dist1 / selectedFeatureLength;

            var fraction2 = dist2 / selectedFeatureLength;
            var startIndex = -1;
            var endIndex = -1;
            var index_param = {value: 0};
            var startCoord = selectedFeatureGeometry.getCoordinateAt2(fraction1, index_param);
            startIndex = index_param.value;
            startIndex++;

            var endCoord = selectedFeatureGeometry.getCoordinateAt2(fraction2, index_param);
            endIndex = index_param.value;

            var resultGeom;

            var resultGeomCoords;

            var coords = selectedFeatureGeometry.getCoordinates();
            resultGeomCoords = coords.slice(startIndex, endIndex);
            resultGeomCoords.push(endCoord);
            resultGeomCoords.splice(0, 0, startCoord);
            resultGeom = new ol.geom.LineString(resultGeomCoords);

            var feature = new ol.Feature({
                geometry: resultGeom
            });

            this.source.addFeature(feature);
        }
    }

    displayHakedisWindow() {
        if(this.selectedFeatureList.length>0) {
            var feature = this.selectedFeatureList[0];

            var totalLength = this.getTotalLengthOfSelectedFeatures();
            this.startMeter = 0;
            this.endMeter = totalLength;

            this.getIsKalemleriList();

            var geom = feature.getGeometry() as ol.geom.LineString;
            this.keys = [];
            var arr = feature.getKeys();
            for (let t of arr) {
                var key = t;
                var value = feature.get(t);
                this.keys.push(new KeyValue(key, value));
            }

            this.display = true;
        }
    }

    getTotalLengthOfSelectedFeatures() {
        var totalLength = 0;
        for (var i = 0; i < this.selectedFeatureList.length; i++) {
            var geom = this.selectedFeatureList[i].getGeometry() as ol.geom.LineString;
            var length = geom.getLength();
            totalLength += length;
        }

        return length;
    }


    activate() {

        var context=this;

        var isHakedisKatmani=function(olLayer:ol.layer.Layer)
        {
            return this.stmMap.isHakedisKatmani(olLayer);
        }.bind(context);

        var selectClick = new ol.interaction.Select({
            condition: ol.events.condition.click,
            multi: true,
            layers:isHakedisKatmani
        });

        selectClick.setHitTolerance(5);
        var context = this;

        this.map.addInteraction(selectClick);

        selectClick.on('select', function (e) {

            var coll = e.target.getFeatures();
            var length = coll.getLength();
            var visibility = "visible";
            if (length > 0) {

                if(length>1) {
                    visibility = "hidden";
                }


                var features = coll.getArray();
                context.selectedFeatureList = features;
                // context.displayHakedisWindow(feature);
                // context.addHakedis(feature, lineLength / 5, lineLength * 2 / 5);
            }
            this.tblSingleFeatureTable.style.visibility = visibility;
        }.bind(context));
    }


    getCoordinateAtDist(geom: ol.geom.LineString, dist1: number) {
        var coords = geom.getCoordinates();
        var length = coords.length;
        var l = 0;
        var index = -1;
        var i = 0;
        for (i = 0; i < length - 1; i++) {
            var p1 = coords[i];
            var p2 = coords[i + 1];
            var x1 = p1[0];
            var x2 = p2[0];
            var y1 = p1[1];
            var y2 = p1[1];

            l += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            if (l > dist1) {
                index = i;
                break;

            }
        }

        return index;
    }
}