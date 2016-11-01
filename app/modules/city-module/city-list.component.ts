import { City } from "./city";
import { CityService } from "./city.service";
import { OnInit } from "@angular/core";
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "stm-city-list",
    template: `
<table>
    <tr>
        <td>
            <h2>{{title}}</h2>
        </td>
    </tr>
    <tr>
        <td>
            <ul class="illerClass">
                <li class="ilClass" *ngFor="let city of cityList" (click)="onSelect(city)">
                    <span >{{city.id}}</span>{{city.name}}
                </li>
            </ul>
        </td>
    </tr>
</table>
`,
    providers: [CityService]
})

export class STMCityListComponent implements OnInit {

    title = "İller";

    @Output() onSelectedCityChanged = new EventEmitter<City>();

    ngOnInit(): void {
        this.getCityList();
    }

    onSelect(city: City): void {
        this.onSelectedCityChanged.emit(city);
        this.selectedCity = city;
    }

    selectedCity: City;

    cityList: City[];

    getCityList(): void {
        this.cityService.getCityList().then(cityList => this.cityList = cityList);
    }

    constructor(private cityService: CityService) {
    }
}