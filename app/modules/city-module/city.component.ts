import { Component,Input,OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {City} from "./city"
import {STMMapComponent} from "./stm-map.component";
import {STMLayerList} from "./stm-layerlist.component";

@Component({
    selector:"stm-app",
    template:`
<table><tr><td style="vertical-align:top">
  <stm-city-list   (onSelectedCityChanged)="onCityChanged($event,stmmap1)"> loading</stm-city-list>
</td>
<td>
    <stm-map id="ozgur" #stmmap1>Loading...</stm-map>
    </td><td align="top" style="vertical-align: top">
   <stm-layer-list #stmlayerlist1 ></stm-layer-list>
    
</td></tr></table>
`
})

export class STMAppComponent implements OnInit,AfterViewInit{

//@Input(STMMapComponent) private mapComp:STMMapComponent;

    @ViewChild(STMMapComponent) private mapObj:STMMapComponent;
    @ViewChild("stmlayerlist1") private stmLayerList:STMLayerList;



    ngAfterViewInit():void{

        this.stmLayerList.layerlist=this.mapObj.layers;

        //alert(this.mapObj);
//        console.log(this.mapObj[0].zoomtoExtent);

      //  console.log(this.mapComp.zoomtoExtent);
    }

    ngOnInit():void {


      //  var mapC=document.getElementById("ozgur");
      //  alert(mapC);
    }

    onCityChanged(city: City,stmmap:STMMapComponent) {
       // stmmap.zoomtoExtent(city);
        this.mapObj.zoomtoExtent(city);
    }
}