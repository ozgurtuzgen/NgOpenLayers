import { City } from "./city";
import { CityService } from "./city.service";
import { OnInit } from "@angular/core";
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "stm-city-list",
    templateUrl: 'app/modules/city-module/city-list.component.html',
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