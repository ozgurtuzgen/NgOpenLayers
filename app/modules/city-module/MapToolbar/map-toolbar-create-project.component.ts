import {Component, AfterViewInit} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";
import {ProjectItem} from "./ProjectItem";

@Component({
    selector: "stm-map-toolbar-create-project",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/ProjectItemPopup.html"
})

export class STMMapToolbarCreateProject implements AfterViewInit {

    projectItemList: ProjectItem[];
    container: any;
    content: any;
    closer: any;
    btnSave: any;
    imgNewPlacemark: any;

    projectItem1 = new ProjectItem("deneme proj name", 0, 0);
    isActive: boolean;
    stmMap: STMMapComponent;
    map: ol.Map;
    source: ol.source.Vector;
    overlay: ol.Overlay;
    clickListenerKey: any;

    ngAfterViewInit(): void {
        this.container = document.getElementById('popup');
        this.content = document.getElementById('popup-content');
        this.closer = document.getElementById('popup-closer');
        this.btnSave = document.getElementById('btnSave');
        this.imgNewPlacemark = document.getElementById('imgNewPlacemark');
        var self = this;
        this.imgNewPlacemark.onclick = function (evt) {
            self.isActive = !self.isActive;
            if (!self.isActive) {
                self.map.unByKey(self.clickListenerKey);
            }
            else {
                self.clickListenerKey = self.map.on('click', function (evt) {
                    var coordinate = evt.coordinate;

                    var wgs84 = ol.proj.transform(
                        coordinate, 'EPSG:3857', 'EPSG:4326');
                    var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
                        coordinate, 'EPSG:3857', 'EPSG:4326'));
                    self.projectItem1 = new ProjectItem("", wgs84[0], wgs84[1]);
                    var content = document.getElementById("popup-content");
                    self.overlay.setPosition(coordinate);
                }.bind(self));
            }

        }.bind(self)
    }


    constructor() {
        this.projectItemList = [];
    }


    setMap(stmMap: STMMapComponent) {
        this.stmMap = stmMap;
        this.map = stmMap.map;
        this.prepare();
    }

    getStyle(feature, resolution) {
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            }),
            text: new ol.style.Text({
                text: feature.get('name'),
                offsetY: -10
            })
        })
    }

    prepare() {
        var self = this;

        this.closer.onclick = function (evt) {
            self.overlay.setPosition(undefined);
            return false;
        }.bind(self);

        this.btnSave.onclick = function (evt) {
            var coord3857 = ol.proj.transform(
                [self.projectItem1.lat, self.projectItem1.lon], 'EPSG:4326', 'EPSG:3857');

            var feature = new ol.Feature({
                geometry: new ol.geom.Point(coord3857),
                name: self.projectItem1.name
            });

            self.source.addFeature(feature);
            self.overlay.setPosition(undefined);
        }.bind(self);

        this.source = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            source: this.source,
            style: this.getStyle
        });

        var container = document.getElementById("popup");
        this.overlay = new ol.Overlay({
            element: container
        });

        this.stmMap.addLayer("Yer İmleri", vector);
        this.map.addOverlay(this.overlay);

    }
}
