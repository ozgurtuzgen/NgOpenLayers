import { Injectable } from '@angular/core';
import { User } from './user';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
 private headers = new Headers({'Content-Type': 'application/json', 
                                'Access-Control-Allow-Headers': 'Content-Type',
                                'Access-Control-Allow-Methods': 'GET',
                                'Access-Control-Allow-Origin': '*'});

 private usersUrl = 'http://localhost/WebApiApp1/api/person';  // URL to web api

getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
               .toPromise()
               .then(response => response.json().data as User[])
               .catch(this.handleError);
  }

   constructor(private http: Http) { }

   private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}