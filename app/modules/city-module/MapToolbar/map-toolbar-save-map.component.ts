import {Component} from '@angular/core';
import {STMMapComponent} from "./../stm-map.component";

declare var saveAs:Function;

@Component({
    selector: "stm-map-toolbar-savemap",
    templateUrl: "./app/modules/city-module/MapToolbar/templates/save-map.html"
})

export class STMMapToolbarSaveMap {


    tooltip: string="Haritayı Kaydet";
    stmmap: STMMapComponent;

    setMap(stmMap: STMMapComponent) {
        this.stmmap = stmMap;
    }

    constructor() {
        this.loadScripts();
    }

    saveMap()
    {


        this.stmmap.map.once('postcompose', function(event) {
            var canvas = event.context.canvas;
            canvas.toBlob(function(blob) {
                saveAs(blob, 'map.png');
            });
        });
        this.stmmap.map.renderSync();

    }

    loaded:Boolean=false;

    loadScripts() {
        var src1 = "https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL";
        var src2 = "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js";
        var scriptArray = [src1, src2];

        if (!this.loaded) {

            for (let s of scriptArray) {
                this.lazyLoadScript(s);
            }
        }

        this.loaded=true;
    }

    lazyLoadScript(src: string) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = src;
        document.body.appendChild(s);
    }
}

//saveMap