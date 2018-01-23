import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";

import {config} from '../../shared/smartadmin.config';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';


@Injectable()
export class CorsHttpService {

    constructor(private http: HttpClient) {}

    public get(url): Observable<any> {
        return this.makeRequest('GET', url);
    }

    public post(url, data): Observable<any>{
        return this.makeRequest('POST', url, data);
    }

    public put(url, data): Observable<any>{
        return this.makeRequest('PUT', url, data);
    }

    public delete(url): Observable<any>{
        return this.makeRequest('DELETE', url);
    }

    private makeRequest(method, url, data?): Observable<any> {
        //const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
        const body = JSON.stringify(data);

        const request = new HttpRequest(method, environment.baseUrl + url, body);
        return this.http.request(request)
            .catch(this.handleError);
    }

    private handleError(data:any) {
        console.log(data);
        console.log(data.error.request.error);
        let errMsg = (data.error && data.error.request  && data.error.request.error) ? data.error.request.error :  'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(errMsg);
    }

    private serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

        return result.join("&");
    }

}


