import {Injectable}     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {IsaleHatti} from "./isale-hatti";
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class IsaleHattiService {
    private isaleUrl = 'http://localhost:14209/api/products';

    // URL to web API
    constructor (private http: Http) {}
    getIsaleHatlari (): Observable<IsaleHatti[]> {
        return this.http.get(this.isaleUrl)
            .map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

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
