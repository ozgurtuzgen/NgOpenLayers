import {City} from "./city";
import {CityList} from "./mock-city-list"
import { Injectable } from '@angular/core';


@Injectable()
export class CityService{
    getCityList():Promise<City[]>{
        return Promise.resolve(CityList);
    }
}