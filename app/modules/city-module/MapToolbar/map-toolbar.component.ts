import { Component,ViewChild } from '@angular/core';
import {STMMapToolbarCreateProject} from "./map-toolbar-create-project.component";
import {STMMapComponent} from "../stm-map.component";

@Component({
    selector:"stm-map-toolbar",
    template:`
<table><tr><td>
<stm-map-toolbar-create-project #toolItemCreateProject1></stm-map-toolbar-create-project>

</td></tr></table>
`,
})

export class STMMapToolbar {

    @ViewChild("toolItemCreateProject1") private itemCreateProject: STMMapToolbarCreateProject;

    map:STMMapComponent;

    setMap(stmMap:STMMapComponent) {
        this.map=stmMap;
        this.itemCreateProject.setMap(stmMap);

    }



}
