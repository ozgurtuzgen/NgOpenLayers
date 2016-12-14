/**
 * Created by shatipoglu on 12/14/2016.
 */
export class MapToolbarFactory {

    initializeToolbar(map: ol.Map) {
        var toolbarDiv = document.createElement('div');
        toolbarDiv.setAttribute("class", "map-toolbar-container");
        var btnGroupDiv = document.createElement("div");
        btnGroupDiv.setAttribute("class", "btn-group");

        toolbarDiv.appendChild(btnGroupDiv);

        var btnZoomIn = this.createZoomInControl(map);
        var btnZoomOut = this.createZoomOutControl(map);
        var btnAddNote = this.createAddNoteControl(map);
        var btnToggle3d = this.createToggle3dControl(map);
        var btnAddGeojson=this.createAddGeojsonControl(map);
        var btnAddShapefile=this.createAddShapefileControl(map);
        var btnMeasureDistance=this.createMeasureDistanceControl(map);
        var btnSaveMap=this.createSaveMapControl(map);

        btnGroupDiv.appendChild(btnZoomIn);
        btnGroupDiv.appendChild(btnZoomOut);
        btnGroupDiv.appendChild(btnAddNote);
        btnGroupDiv.appendChild(btnAddShapefile);
        btnGroupDiv.appendChild(btnAddGeojson);
        btnGroupDiv.appendChild(btnMeasureDistance);
        btnGroupDiv.appendChild(btnSaveMap);


        toolbarDiv.style.position = "absolute";
        toolbarDiv.style.top = "12px";
        toolbarDiv.style.left = "12px";
        var olControl = new ol.control.Control({element: toolbarDiv});
        map.addControl(olControl);
    }

    createButton(iconClass: string, title: string, clickHandler: any) {
        var btn = document.createElement("button");
        btn.title = title;
        btn.setAttribute("class", "btn btn-flat btn-default");
        var icon = document.createElement("i");
        icon.setAttribute("class", iconClass);
        icon.addEventListener("click", clickHandler, false);
        btn.appendChild(icon);
        return btn;
    }

    createZoomInControl(map: ol.Map) {
        var handler = function (e) {
            map.getView().setZoom(map.getView().getZoom() + 1);
        };

        var title = "Yakınlaş";
        var iconClass = "fa fa-plus";
        var btn = this.createButton(iconClass, title, handler);
        return btn;
    }

    createZoomOutControl(map: ol.Map) {
        var handler = function (e) {
            map.getView().setZoom(map.getView().getZoom() - 1);
        };

        var title = "Uzaklaş";
        var iconClass = "fa fa-minus";
        var btn = this.createButton(iconClass, title, handler);
        return btn;
    }

    createAddNoteControl(map: ol.Map) {
        var handler = null;
        var title = "Not ekle";
        var iconClass = "fa fa-sticky-note";
        var btn = this.createButton(iconClass, title, handler);
        return btn;
    }

    createToggle3dControl(map: ol.Map) {
        var handler = null;
        var title = "3D/2D";
        var iconClass = " fa fa-cubes";
        var btn = this.createButton(iconClass, title, handler);
        return btn;
    }

    createAddShapefileControl(map:ol.Map)
    {
        var handler = null;
        var title = "Shape dosyası ekle";
        var iconClass = "fa fa-file-archive-o";
        var btn = this.createButton(iconClass, title, handler);
        return btn;
    }

    createAddGeojsonControl(map:ol.Map)
    {
        var handler = null;
        var title = "Geojson dosyası ekle";
        var iconClass = "fa fa-file-image-o";
        var btn = this.createButton(iconClass, title, handler);
        return btn;
    }

    createMeasureDistanceControl(map:ol.Map)
    {
        var handler = null;
        var title = "Mesafe Ölç";
        var iconClass = "fa fa-arrows-h";
        var btn = this.createButton(iconClass, title, handler);
        return btn;
    }

    createSaveMapControl(map:ol.Map) {
        var handler = null;
        var title = "Haritayı Kaydet";
        var iconClass = "fa fa-floppy-o";
        var btn = this.createButton(iconClass, title, handler);
        return btn;
    }



}
