import {STMMapComponent} from "./stm-map.component";
import {Component, OnInit} from '@angular/core';
import forEach = require("core-js/fn/array/for-each");
import {KeyValue} from "./KeyValue";
import {TreeNode} from "primeng/components/common/api";
import {IsKalemleriService} from "./isKalemleri.service";
import {Http} from "@angular/http";


@Component({
    selector: "stm-map-toolbar-hakedis",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/hakedis.html",
    providers: [IsKalemleriService]
})

export class Hakedis {
    startMeter: number;
    endMeter: number;
    selectedFeature: ol.Feature;

    isKalemleri: TreeNode[];

    getIsKalemleriList(): void {
        this.isKalemleriService.getIsKalemleri().then(isKalemleri => this.isKalemleri = isKalemleri);
    }

    constructor(private isKalemleriService: IsKalemleriService) {

    }

    display: boolean = false;
    keys: KeyValue[];

    map: ol.Map;
    source: ol.source.Vector;
    stmMap: STMMapComponent;

    initialize(stmmap: STMMapComponent) {
        // this.isKalemleri=TreeNode[];
        this.keys = [];
        this.stmMap = stmmap;
        this.map = this.stmMap.map;
        this.source = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            source: this.source,
            style: this.getStyle
        });

        this.stmMap.addLayer("Hakedişler", vector);
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
                width: 2,
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
        var dist1 = this.startMeter;
        var dist2 = this.endMeter;
        var feature = this.selectedFeature;
        var geom = feature.getGeometry() as ol.geom.LineString;
        var lineLength = geom.getLength();
        var fraction1 = dist1 / lineLength;
        var fraction2 = dist2 / lineLength;
        var startIndex = -1;
        var endIndex = -1;
        var index_param = {value: 0};
        var start = geom.getCoordinateAt2(fraction1, index_param);
        startIndex = index_param.value;
        startIndex++;
        var end = geom.getCoordinateAt2(fraction2, index_param);
        endIndex = index_param.value;

        var coords = geom.getCoordinates();
        var newCoords = coords.slice(startIndex, endIndex);
        //  newCoords.push(start);


        var startFeature = new ol.Feature({geometry: new ol.geom.Point(start), name: "start"});
        var endFeature = new ol.Feature({geometry: new ol.geom.Point(end), name: "end"});

        var startIndexFeature = new ol.Feature({geometry: new ol.geom.Point(coords[startIndex]), name: "start index"});
        var endIndexFeature = new ol.Feature({geometry: new ol.geom.Point(coords[endIndex]), name: "end index"});

        /*   this.source.addFeature(startFeature);
         this.source.addFeature(endFeature);
         this.source.addFeature(startIndexFeature);
         this.source.addFeature(endIndexFeature);*/

        newCoords.push(end);
        newCoords.splice(0, 0, start);

        var line = new ol.geom.LineString(newCoords);

        var feature = new ol.Feature({
            geometry: line
        });

        this.source.addFeature(feature);
    }

    displayHakedisWindow(feature: ol.Feature) {
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

    activate() {
        var selectClick = new ol.interaction.Select({
            condition: ol.events.condition.click,
            multi: true
        });

        selectClick.setHitTolerance(5);
        var context = this;

        this.map.addInteraction(selectClick);
        selectClick.on('select', function (e) {
            var coll = e.target.getFeatures();
            var length = coll.getLength();
            if (length > 0) {
                var features = coll.getArray();
                var feature = features[0];
                var geom = feature.getGeometry();
                var line = geom as  ol.geom.LineString;
                var lineLength = line.getLength();
                context.selectedFeature = feature;
                context.displayHakedisWindow(feature);
                // context.addHakedis(feature, lineLength / 5, lineLength * 2 / 5);
            }
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