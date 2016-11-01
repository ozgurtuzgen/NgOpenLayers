import {Person} from "./person";
import {PersonListPrime} from "./mock-person-list"
import {PersonListKendo} from "./mock-person-list"
import { Injectable } from '@angular/core';


@Injectable()
export class PersonService{
    getPersonListPrime():Promise<Person[]>{
        return Promise.resolve(PersonListPrime);
    }
    getPersonListKendo():Promise<Person[]>{
        return Promise.resolve(PersonListKendo);
    }
}