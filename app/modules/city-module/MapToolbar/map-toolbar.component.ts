import { Component,ViewChild } from '@angular/core';
import {STMMapToolbarCreateProject} from "./map-toolbar-create-project.component";
import {STMMapComponent} from "../stm-map.component";
import {STMMapToolbarGoToCoordinate} from "./map-toolbar-gotocoordinate.component";



@Component({
    selector:"stm-map-toolbar",
    template:`
<table  style="height:26px"><tr><td style="border:solid 1px #888888">
<stm-map-toolbar-create-project #toolItemCreateProject1></stm-map-toolbar-create-project>

</td>
<td style="border:solid 1px #888888">
<stm-map-toolbar-gotocoordinate #toolItemGoToCoord > </stm-map-toolbar-gotocoordinate>
</td>
</tr></table>
`,
})

export class STMMapToolbar {

    @ViewChild("toolItemCreateProject1") private itemCreateProject: STMMapToolbarCreateProject;
    @ViewChild("toolItemGoToCoord") private itemGoToCoord: STMMapToolbarGoToCoordinate;

    map:STMMapComponent;

    setMap(stmMap:STMMapComponent) {
        this.map=stmMap;
        this.itemCreateProject.setMap(stmMap);
        this.itemGoToCoord.setMap(stmMap);
    }



}
