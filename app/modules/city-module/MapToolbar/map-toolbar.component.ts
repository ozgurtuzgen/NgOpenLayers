import {Component, ViewChild} from '@angular/core';
import {STMMapToolbarCreateProject} from "./map-toolbar-create-project.component";
import {STMMapComponent} from "../stm-map.component";
import {STMMapToolbarGoToCoordinate} from "./map-toolbar-gotocoordinate.component";
import {STMMapToolbarShow3d} from "./map-toolbar-show3d.component";
import {STMMapToolbarAddShapefile} from "./map-toolbar-add-shapefile.component";
import {STMMapToolbarMeasureDistance} from "./map-toolbar-measure-distance.component";
import {STMMapToolbarSaveMap} from "./map-toolbar-save-map.component";
import {STMMapToolbarAddGeojson} from "./map-toolbar-add-geojson.component";

@Component({
    selector: "stm-map-toolbar",
    template: `
<table  style="height:26px"><tr><td>
<stm-map-toolbar-create-project #toolItemCreateProject1></stm-map-toolbar-create-project>

</td>
<td >
<stm-map-toolbar-gotocoordinate #toolItemGoToCoord > </stm-map-toolbar-gotocoordinate>
</td>
<td >
<stm-map-toolbar-show3d #toolItemShow3d> </stm-map-toolbar-show3d>
</td>
<td>
<stm-map-toolbar-addshapefile #toolItemAddShapefile></stm-map-toolbar-addshapefile>
</td>
<td>
<stm-map-toolbar-addGeojson #toolItemAddGeojson></stm-map-toolbar-addGeojson>
</td>
<td>
<stm-map-toolbar-measure-distance #toolItemMeasureDistance></stm-map-toolbar-measure-distance>
</td>
<td>
<stm-map-toolbar-savemap #toolItemSaveMap></stm-map-toolbar-savemap>
</td>


</tr></table>
`,
})

export class STMMapToolbar {

    @ViewChild("toolItemCreateProject1") private itemCreateProject: STMMapToolbarCreateProject;
    @ViewChild("toolItemGoToCoord") private itemGoToCoord: STMMapToolbarGoToCoordinate;
    @ViewChild("toolItemShow3d") private itemShow3d: STMMapToolbarShow3d;
    @ViewChild("toolItemAddShapefile") private itemAddShapefile: STMMapToolbarAddShapefile;
    @ViewChild("toolItemAddGeojson") private itemAddGeojson: STMMapToolbarAddGeojson;
    @ViewChild("toolItemMeasureDistance") private itemMeasureDistance: STMMapToolbarMeasureDistance;
    @ViewChild("toolItemSaveMap") private itemSaveMap: STMMapToolbarSaveMap;



    map: STMMapComponent;

    setMap(stmMap: STMMapComponent) {
        this.map = stmMap;
        this.itemCreateProject.setMap(stmMap);
        this.itemGoToCoord.setMap(stmMap);
        this.itemShow3d.setMap(stmMap);
        this.itemAddShapefile.setMap(stmMap);
        this.itemAddGeojson.setMap(stmMap);
        this.itemMeasureDistance.setMap(stmMap);
        this.itemSaveMap.setMap(stmMap);
    }
}
