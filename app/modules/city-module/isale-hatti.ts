import { EventEmitter, Output } from "@angular/core";

export class IsaleHatti extends ol.Feature
{
    @Output() isaleHattiClicked = new EventEmitter<IsaleHatti>();

    constructor() {
        super();
        //      this.onSelectedCityChanged.emit(city);

        this.on('click', function (e) {
            alert("item clicked");
        });
    }

    public Id:Number;
    public Name:string;
    public Category:string;
    public Price:number;

}
