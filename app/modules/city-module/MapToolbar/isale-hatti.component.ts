import {Component, OnInit} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";
import {IsaleHatti} from "../isale-hatti";
import {IcmeSuyuDeposu} from "../MEYTAP/icme-suyu-deposu";
import {VectorLayer} from "../MEYTAP/vector-layer";
import {MapObject} from "../MEYTAP/map-object";


@Component({
    selector: "stm-map-toolbar-addisalehatti",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/addIsaleHatti.html"
})

export class STMAddIsaleHattiComponent {

    stmmap:STMMapComponent;

    addIsaleHatti()
    {
        alert("aa");
    }

    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;
        this.initializeLayer();
    }

    initializeLayer()
    {
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

        var a=new IsaleHatti();

        var icmeSuyuDeposu=new IcmeSuyuDeposu();
        icmeSuyuDeposu.setGeometry(new ol.geom.Point(ol.proj.transform([33,39],'EPSG:4326', 'EPSG:3857')));

        var icmeSuyuDeposuKatmani=new VectorLayer();
        icmeSuyuDeposuKatmani.name="İçme Suyu Depoları";
        icmeSuyuDeposuKatmani.addMapObject(icmeSuyuDeposu);

        this.stmmap.addSTMLayer(icmeSuyuDeposuKatmani);

        icmeSuyuDeposu.clicked.subscribe(this.icmeSuyuClicked);

        var polyCoords = [];
        var coords = "95.61,42.60 95.22,37.98 95.60,37.66 94.97,37.65".split(' ');

        for (var i in coords) {
            var c = coords[i].split(',');
            polyCoords.push(ol.proj.transform([parseFloat(c[0]), parseFloat(c[1])], 'EPSG:4326', 'EPSG:3857'));
        }



        a.setGeometry(new ol.geom.Polygon([polyCoords]));

        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
        });

        vectorSource.addFeature(a);

        a.isaleHattiClicked.subscribe(this.isaleHattiItemClicked);
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });


        this.stmmap.addLayer("Isale Hatlari", vectorLayer, true,true);
    }

    isaleHattiItemClicked(){
        alert("on subs");
    }

    icmeSuyuClicked(mapObject:MapObject)
    {
        alert("depo clicked");

    }


}