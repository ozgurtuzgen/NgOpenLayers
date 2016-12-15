import {STMMapComponent} from "./stm-map.component";
import forEach = require("core-js/fn/array/for-each");

export class Hakedis
{
    map: ol.Map;
    source: ol.source.Vector;
    stmMap: STMMapComponent;

    initialize(stmmap:STMMapComponent)
    {
        this.stmMap=stmmap;
        this.map=this.stmMap.map;
        this.source = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            source: this.source,
            style: this.getStyle
        });

        this.stmMap.addLayer("Hakedişler", vector);
    }



    getStyle(feature, resolution) {
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#00ff00',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
         /*   ,text: new ol.style.Text({
                text: feature.get('name'),
                offsetY: -10
            })*/
        })
    }

    clearLayer()
    {
        this.source.clear();
    }

    addHakedis(geom:ol.geom.LineString,dist1:number,dist2:number)
    {
        var lineLength=geom.getLength();
        var fraction1=dist1/lineLength;
        var fraction2=dist2/lineLength;
        var startIndex=-1;
        var endIndex=-1;
        var index_param={value:0};
        var start=geom.getCoordinateAt2(fraction1,index_param);
        startIndex=index_param.value;

        var end=geom.getCoordinateAt2(fraction2,index_param);
        endIndex=index_param.value;

        var coords=geom.getCoordinates();
        var newCoords= coords.slice(startIndex,endIndex);
     //   newCoords.push(end);
     //   newCoords.splice(0,0,start);

        var line=new ol.geom.LineString(newCoords);

        var feature = new ol.Feature({
            geometry: line
        });

        this.source.addFeature(feature);
    }

    getCoordinateAtDist(geom:ol.geom.LineString,dist1:number)
    {
        var coords= geom.getCoordinates();
        var length=coords.length;
        var l=0;
        var index=-1;
        var i=0;
        for (i = 0; i < length-1; i ++)
        {
            var p1 = coords[i];
            var p2 = coords[i + 1];
            var x1=p1[0];
            var x2=p2[0];
            var y1=p1[1];
            var y2=p1[1];

            l+= Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            if(l>dist1)
            {
                index=i;
                break;

            }
        }

        return index;
    }
}