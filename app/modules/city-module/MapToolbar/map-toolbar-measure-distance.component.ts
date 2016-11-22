import {Component} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";
import Layer = ol.layer.Layer;

declare var toolMeasureDistance:STMMapToolbarMeasureDistance;

@Component({
    selector: "stm-map-toolbar-measure-distance",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/measure-distance.html"
})


export class STMMapToolbarMeasureDistance {

    stmmap: STMMapComponent;
    wgs84Sphere: ol.Sphere;
    source: ol.source.Vector;
    raster: ol.layer.Tile;
    vector: ol.layer.Vector;
    sketch: ol.Feature;
    helpTooltipElement: Element;
    helpTooltip: ol.Overlay; // Overlay to show the help messages.
    measureTooltipElement: Element; // The measure tooltip element
    measureTooltip: ol.Overlay; //Overlay to show the measurement
    continuePolygonMsg = 'Click to continue drawing the polygon'; //  Message to show when the user is drawing a polygon.
    continueLineMsg = 'Click to continue drawing the line'; //Message to show when the user is drawing a line.
    helpMsg = 'Click to start drawing';
    isGeodesic: Boolean = true;
    draw: any; // global so we can remove it later
    type = 'LineString';// or 'Polygon'
    activated: Boolean = false;
    overlayList:Array;

    tooltip="Mesafe Ölç";

    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;

      //  stmMap.addLayer("Ölçüm katmanı-2", this.raster, false);

        this.overlayList=new Array();
    }

    constructor() {
        toolMeasureDistance=this;
        toolMeasureDistance.wgs84Sphere = new ol.Sphere(6378137);
        toolMeasureDistance.source = new ol.source.Vector();
        toolMeasureDistance.raster = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        toolMeasureDistance.vector = new ol.layer.Vector({
            source: toolMeasureDistance.source,
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
    }


    /**
     * Handle pointer move.
     * @param {ol.MapBrowserEvent} evt The event.
     */
    pointerMoveHandler = function (evt) {
        if (evt.dragging) {
            return;
        }

        if (toolMeasureDistance.sketch) {
            var geom = (toolMeasureDistance.sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                toolMeasureDistance.helpMsg = toolMeasureDistance.continuePolygonMsg;
            } else if (geom instanceof ol.geom.LineString) {
                toolMeasureDistance.helpMsg = toolMeasureDistance.continueLineMsg;
            }
        }

        toolMeasureDistance.helpTooltipElement.innerHTML = toolMeasureDistance.helpMsg;
        toolMeasureDistance.helpTooltip.setPosition(evt.coordinate);
        toolMeasureDistance.helpTooltipElement.classList.remove('hidden');
    };


    // var typeSelect = document.getElementById('type');
    // var geodesicCheckbox = document.getElementById('geodesic');


    /**
     * Format length output.
     * @param {ol.geom.LineString} line The line.
     * @return {string} The formatted length.
     */
    formatLength = function (line) {
        var length;
        if (toolMeasureDistance.isGeodesic) {
            var coordinates = line.getCoordinates();
            length = 0;
            var sourceProj = toolMeasureDistance.stmmap.map.getView().getProjection();
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
                var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
                length += toolMeasureDistance.wgs84Sphere.haversineDistance(c1, c2);
            }
        } else {
            length = Math.round(line.getLength() * 100) / 100;
        }
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
        }
        return output;
    };


    /**
     * Format area output.
     * @param {ol.geom.Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    formatArea = function (polygon) {
        var area;
        if (toolMeasureDistance.isGeodesic) {
            var sourceProj = toolMeasureDistance.stmmap.map.getView().getProjection();
            var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
                sourceProj, 'EPSG:4326'));
            var coordinates = geom.getLinearRing(0).getCoordinates();
            area = Math.abs(toolMeasureDistance.wgs84Sphere.geodesicArea(coordinates));
        } else {
            area = polygon.getArea();
        }
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    };

    addInteraction() {
        toolMeasureDistance.draw = new ol.interaction.Draw({
            source: toolMeasureDistance.source,
            type: /** @type {ol.geom.GeometryType} */ (toolMeasureDistance.type),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });


        toolMeasureDistance.stmmap.map.addInteraction(toolMeasureDistance.draw);

        toolMeasureDistance.createMeasureTooltip();
        toolMeasureDistance.createHelpTooltip();

        var listener;
        toolMeasureDistance.draw.on('drawstart',
            function (evt) {
                // set sketch
                toolMeasureDistance.sketch = evt.feature;

                /** @type {ol.Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = toolMeasureDistance.sketch.getGeometry().on('change', function (evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Polygon) {
                        output = toolMeasureDistance.formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof ol.geom.LineString) {
                        output = toolMeasureDistance.formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    toolMeasureDistance.measureTooltipElement.innerHTML = output;
                    toolMeasureDistance.measureTooltip.setPosition(tooltipCoord);
                });
            }, this);

        toolMeasureDistance.draw.on('drawend',
            function () {
                toolMeasureDistance.measureTooltipElement.className = 'tooltip tooltip-static';
                toolMeasureDistance.measureTooltip.setOffset([0, -7]);
                // unset sketch
                toolMeasureDistance.sketch = null;
                // unset tooltip so that a new one can be created
                toolMeasureDistance.measureTooltipElement = null;
                toolMeasureDistance.createMeasureTooltip();
                ol.Observable.unByKey(listener);
            }, this);
    }

    /**
     * Creates a new help tooltip
     */
    createHelpTooltip() {
        if (toolMeasureDistance.helpTooltipElement) {
            toolMeasureDistance.helpTooltipElement.parentNode.removeChild(toolMeasureDistance.helpTooltipElement);
        }
        toolMeasureDistance.helpTooltipElement = document.createElement('div');
        toolMeasureDistance.helpTooltipElement.className = 'tooltip hidden';
        toolMeasureDistance.helpTooltip = new ol.Overlay({
            element: toolMeasureDistance.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });

        toolMeasureDistance.overlayList.push(toolMeasureDistance.helpTooltip);
        toolMeasureDistance.stmmap.map.addOverlay(toolMeasureDistance.helpTooltip);
    }

    /**
     * Creates a new measure tooltip
     */
    createMeasureTooltip() {
        if (toolMeasureDistance.measureTooltipElement) {
            toolMeasureDistance.measureTooltipElement.parentNode.removeChild(toolMeasureDistance.measureTooltipElement);
        }
        toolMeasureDistance.measureTooltipElement = document.createElement('div');
        toolMeasureDistance.measureTooltipElement.className = 'tooltip tooltip-measure';
        toolMeasureDistance.measureTooltip = new ol.Overlay({
            element: toolMeasureDistance.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        toolMeasureDistance.stmmap.map.addOverlay(toolMeasureDistance.measureTooltip);
        toolMeasureDistance.overlayList.push(toolMeasureDistance.measureTooltip);

    }

    eventRegistered:Boolean=false;
    activate() {
        toolMeasureDistance.stmmap.addLayer("Ölçüm katmanı", this.vector, false);
        toolMeasureDistance.addInteraction();

        // toolMeasureDistance.stmmap.map.removeInteraction(toolMeasureDistance.draw);
        if (!toolMeasureDistance.eventRegistered) {
            toolMeasureDistance.stmmap.map.on('pointermove', toolMeasureDistance.pointerMoveHandler);
            toolMeasureDistance.stmmap.map.getViewport().addEventListener('mouseout', function () {
                toolMeasureDistance.helpTooltipElement.classList.add('hidden');
            });
        }
        toolMeasureDistance.eventRegistered=true;

    }

    deactivate() {

        toolMeasureDistance.stmmap.removeLayer(this.vector);

        this.vector.getSource().clear();
        toolMeasureDistance.stmmap.map.removeInteraction(toolMeasureDistance.draw);
        var i=0;
        for(i=0;i<this.overlayList.length;i++) {
            toolMeasureDistance.stmmap.map.removeOverlay(this.overlayList[i]);
        }
        this.overlayList=new Array();

    }


    buttonClicked() {
        if (toolMeasureDistance.activated) {
            toolMeasureDistance.deactivate();
        }
        else {
            toolMeasureDistance.activate();
        }

        toolMeasureDistance.activated = !toolMeasureDistance.activated;
    }
}
