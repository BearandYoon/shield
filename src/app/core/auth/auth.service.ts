import { Injectable } from '@angular/core';

import { CorsHttpService } from '../api/cors-http.service';
import {UserStorageService} from "../storage/storage.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

    constructor(private router: Router, private http: HttpClient, private storage: UserStorageService) {}

    login(data) {
        return this.http.post(environment.baseUrl + '/system.user.login/', JSON.stringify(data))
            .do(res => {
                this.storage.save(res);
            })
            .catch(this.handleError);
    }

    logout() {
        this.storage.remove();
    }

    isLoggedIn() {
        return !!this.storage.get();
    }

    private handleError(data:any) {
        console.log(data);
        console.log(data.error.request.error);
        let errMsg = (data.error && data.error.request  && data.error.request.error) ? data.error.request.error :  'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(errMsg);
    }


}


