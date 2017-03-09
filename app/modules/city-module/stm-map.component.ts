import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {City} from "./city";
import {STMLayer} from "./stm-layer";
import {MapToolbarFactory} from "./MapToolbar/MapToolbarFactory"
import {Dialog} from "primeng/components/dialog/dialog";
import {Hakedis} from "./hakedis";
import {IsaleHatti} from "./isale-hatti";
import { EventEmitter } from "@angular/core";

@Component({
    selector: 'stm-map',
    template: `


  <div id="map" style="width:100%;height:100%" class="map"></div>

    `
})

export class STMMapComponent implements OnInit {

    keys: string[];

    @ViewChild("pd") private pd: Dialog;
    display: boolean = false;

    map: ol.Map;
    layers: STMLayer[];

    getSTMLayer(olLayer:ol.layer.Layer)
    {
        for(var i=0;i<this.layers.length;i++)
        {
            if(this.layers[i].layer==olLayer)
            {
                return this.layers[i];
            }
        }
    }

    isHakedisKatmani(layer:ol.layer.Layer) {

        var result=false;
        var stmLayer = this.getSTMLayer(layer);
        if(stmLayer) {
            result= stmLayer.isHakedisGirisKatmani;
        }
        return result;
    }

    addVector() {
        /*    var geojsonObject = {
         'type': 'FeatureCollection',
         'crs': {
         'type': 'name',
         'properties': {
         'name': 'EPSG:3857'
         }
         },
         'features': [{
         'type': 'Feature',
         'geometry': {
         'type': 'Point',
         'coordinates': [3642187, 4842049]
         }
         }, {
         'type': 'Feature',
         'geometry': {
         'type': 'LineString',
         'coordinates': [[3797383, 4709299], [3352116, 4862418]]
         }
         }]
         };*/

        var geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:4326'
                }
            },
            'features': [{
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [33, 39]
                }
            }, {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[35, 36], [36, 37]]
                }
            }]
        };

        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
        });

        this.addLayer("Vector-GeoJson Layer", vectorLayer);
    }

    zoomtoExtent(city: City) {
        var zoomLevel = 8;
        var position = ol.proj.fromLonLat([city.longitude, city.latitude]);
        this.map.setView(new ol.View({
            center: position,
            zoom: zoomLevel
        }));
    }

    addLayer(name: string, layer: ol.layer.Layer, isUserDefined: boolean = false,isHakedisGirisLayer:boolean=false) {

        var stmLayer = new STMLayer();
        stmLayer.name = name;
        stmLayer.layer = layer;
        stmLayer.isUserDefined = isUserDefined;
        stmLayer.isHakedisGirisKatmani=isHakedisGirisLayer;
        this.layers.push(stmLayer);
        this.map.addLayer(layer);
    }

    addSTMLayer(stmLayer:STMLayer)
    {
        this.layers.push(stmLayer);
        this.map.addLayer(stmLayer.layer);
    }

    addIsaleLayer()
    {

    }

    removeLayer(layer: ol.layer.Layer) {

        this.map.removeLayer(layer);
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].layer == layer) {
                this.layers.splice(i, 1);
                break;
            }
        }
    }

    getHakedisGirisLayers()
    {
        var arr=[];
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].isHakedisGirisKatmani) {
                arr.push(this.layers[i]);
            }
        }

        return arr;
    }

    ngOnInit(): void {

        this.layers = [];

        var layer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        this.map = new ol.Map({
            target: 'map',
            layers: [],
            controls: ol.control.defaults({attribution: false, zoom: false}),
            view: new ol.View({
                center: ol.proj.fromLonLat([-79.24756180000, 43.1552386000]),
                zoom:13
            })
        });

        var glayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: '  http://mt3.google.com/vt/lyrs=y&z={z}&x={x}&y={y}'
            })
        })

        //
        //   this.addLayer("Google Layer", glayer);
        this.addLayer("Openstreet map", layer);
        this.addVector();

        var toolbarFactory = new MapToolbarFactory();
        //  toolbarFactory.initializeToolbar(this.map);

        var context = this;
        this.map.on('click', function (evt) {

            context.displayFeatureInfo(evt.pixel);
        }.bind(context));
    }



    displayFeatureInfo = function (pixel: ol.Pixel) {

        var feature = this.map.forEachFeatureAtPixel(pixel, function (feature) {
            return feature;
        });
        var isaleHatti = feature as IsaleHatti;
        if (isaleHatti) {
            if (isaleHatti.isaleHattiClicked)
                isaleHatti.isaleHattiClicked.emit();
        }

        /*  var feature = this.map.forEachFeatureAtPixel(pixel, function (feature) {
         return feature;
         });

         if (feature) {
         this.keys = feature.getKeys();
         this.display = true;

         var geom = feature.getGeometry();
         if (geom.getType() == "LineString") {

         }

         }*/

        /*  var info = document.getElementById('info');
         if (feature) {
         info.innerHTML = feature.getId() + ': ' + feature.get('name');
         } else {
         info.innerHTML = '&nbsp;';
         }


         if (feature !== highlight) {
         if (highlight) {
         featureOverlay.getSource().removeFeature(highlight);
         }
         if (feature) {
         featureOverlay.getSource().addFeature(feature);
         }
         highlight = feature;
         }
         */

    };


    constructor() {
        this.keys = [];
    }
}