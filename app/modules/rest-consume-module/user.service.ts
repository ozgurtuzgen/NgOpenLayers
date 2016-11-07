import { Injectable } from '@angular/core';
import { User } from './user';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class UserService {
 private headers = new Headers({'Content-Type': 'application/json', 
                                'Access-Control-Allow-Headers': 'Content-Type',
                                'Access-Control-Allow-Methods': 'GET',
                                'Access-Control-Allow-Origin': '*'});

 private urlInMemory = 'app/users';
 private urlWeb = 'http://localhost/WebApiApp1/api/users/';  // URL to web api

/*getUsers(): Promise<User[]> {
    return this.http.get(this.urlWeb)
               .toPromise()
               .then(response => response.json().data as User[])
               .catch(this.handleError);
  }*/

    getUsers (): Observable<User[]> {
    return this.http.get(this.urlInMemory)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

   constructor(private http: Http) { }

private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}