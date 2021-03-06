import { Component,OnInit,Output } from '@angular/core';
import {City} from "./city";
import {STMLayer} from "./stm-layer";


@Component({
    selector: 'stm-map',
    template: `
<table><tr><td>

  <div id="map" style="width:800px;height:600px" class="map"></div>

</td>

<td>



</td>
</tr></table>
  
    `
})
export class STMMapComponent implements OnInit {

    map: ol.Map;
    layers: STMLayer[];

    addVector() {
        var geojsonObject = {
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
        };

        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
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

    addLayer(name: string, layer: ol.layer.Layer) {

        var stmLayer = new STMLayer();
        stmLayer.name = name;
        stmLayer.layer = layer;
        this.layers.push(stmLayer);
        this.map.addLayer(layer);
    }

    ngOnInit(): void {

        this.layers = [];


        var layer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });


        this.map = new ol.Map({
            target: 'map',
            layers: [],
            view: new ol.View({
                center: ol.proj.fromLonLat([39, 33]),
                zoom: 4
            })
        });

        this.addLayer("Openstreet map", layer);
        this.addVector();
    }

    constructor() {

    }
}