import { Component } from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";
import {ProjectItem} from "./ProjectItem";
import {FormsModule} from "@angular/forms";

@Component({
    selector:"stm-map-toolbar-create-project",
    template:`
<table><tr><td>
<input type="button" value="Create Project" (click)="createProject()">


</td></tr></table>

<div id="popup" class="ol-popup" >
                <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                <div id="popup-content">
                <table><tr><td>
                AD
                <input type="text" [(ngModel)]="projectItem1.name" />
</td>
<td>
<input type="text" [(ngModel)]="projectItem1.name"/>
</td>

</tr></table>
                
                
</div>
        </div>
`,
})

export class STMMapToolbarCreateProject {

    projectItem1={name:"deneme proj name"};

    isActive: boolean;

    stmMap: STMMapComponent;
    map: ol.Map;
    draw: ol.interaction.Draw;
    source: ol.source.Vector;
    overlay : ol.Overlay;

    container = document.getElementById('popup');
    content = document.getElementById('popup-content');
    closer = document.getElementById('popup-closer');

    constructor(){
       // this.projectItem1=new ProjectItem();
        // this.projectItem1.name="deneme proje adı";
    }

    setMap(stmMap: STMMapComponent) {
        this.isActive = false;
        this.stmMap = stmMap;
        this.map = stmMap.map;
        this.prepare();
    }

    createProject() {
        if (!this.isActive)
            this.addInteraction();
        else this.map.removeInteraction(this.draw);
        this.isActive = !this.isActive;
    }


    prepare() {
        this.source = new ol.source.Vector();

        var vector = new ol.layer.Vector({
            source: this.source,
            style: new ol.style.Style({
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
                })
            })
        });

        var container = document.getElementById("popup");
        this.overlay = new ol.Overlay({
            element: container
        });

        this.stmMap.addLayer("Projeler", vector);


        var element = document.getElementById('popup');


        this.map.addOverlay(this.overlay);

// display popup on click


        var self = this;
        this.map.on('click', function (evt) {


            var coordinate = evt.coordinate;
            var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
                coordinate, 'EPSG:3857', 'EPSG:4326'));

            var content = document.getElementById("popup-content");

          //  content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
          //      '</code>';
            self.overlay.setPosition(coordinate);

        }.bind(self));


        /*   var feature =evt.map.forEachFeatureAtPixel(evt.pixel,
         function (feature, layer) {
         return feature;
         });
         if (feature) {

         var coordinate = evt.coordinate;
         var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
         coordinate, 'EPSG:3857', 'EPSG:4326'));
         */

        // var typeSelect = document.getElementById('type');

        /**
         * Let user change the geometry type.
         * @param {Event} e Change event.
         */
        /*typeSelect.onchange = function(e) {
         this.removeInteraction(draw);
         addInteraction();
         };*/

    }

    addInteraction() {
        //var value = typeSelect.value;
        var value = "Point";

        if (value !== 'None') {
            this.draw = new ol.interaction.Draw({
                source: this.source,
                type: /** @type {ol.geom.GeometryType} */ (value)
            });
            this.map.addInteraction(this.draw);
        }
    }

}
