export class STMLayer {

    name: string;
    layer: ol.layer.Layer;
    isUserDefined: boolean;
    isHakedisGirisKatmani:boolean;

    constructor() {
        this.isUserDefined=false;
        this.isHakedisGirisKatmani=false;
    }
}