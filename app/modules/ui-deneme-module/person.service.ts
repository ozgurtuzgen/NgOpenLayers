import {Person} from "./person";
import {PersonList} from "./mock-person-list"
import { Injectable } from '@angular/core';


@Injectable()
export class PersonService{
    getPersonList():Promise<Person[]>{
        return Promise.resolve(PersonList);
    }
}