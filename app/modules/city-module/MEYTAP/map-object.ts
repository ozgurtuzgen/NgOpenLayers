import { EventEmitter, Output } from "@angular/core";

export class MapObject extends ol.Feature {
    @Output() clicked = new EventEmitter<MapObject>();

    constructor() {
        super();
    }
}

