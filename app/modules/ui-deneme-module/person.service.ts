import {Person} from "./person";
import {PersonList} from "./mock-person-list"
import { Injectable } from '@angular/core';


@Injectable()
export class PersonService{
    getCityList():Promise<Person[]>{
        return Promise.resolve(PersonList);
    }
}