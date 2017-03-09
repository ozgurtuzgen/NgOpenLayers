import {MapObject} from "./map-object";
import {STMLayer} from "../stm-layer";

export class VectorLayer extends STMLayer
{
    vectorSource:ol.source.Vector;
    constructor()
    {
        super();
        this.isHakedisGirisKatmani=false;
        this.isUserDefined=true;
        this.vectorSource = new ol.source.Vector();

        this.layer= new ol.layer.Vector({
            source: this.vectorSource
        });
    }

    addMapObject(mapObject:MapObject)
    {
        this.vectorSource.addFeature(mapObject);
        mapObject.clicked.subscribe(this.mapObjectClicked);
    }

    mapObjectClicked()
    {

    }
}