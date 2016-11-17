export class STMLayer {

    name: string;
    layer: ol.layer.Layer;
    isUserDefined: boolean;

    constructor() {
        this.isUserDefined=false;
    }
}