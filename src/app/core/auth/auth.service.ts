import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import { CorsHttpService } from '../api/cors-http.service';
import {UserStorageService} from "../storage/storage.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private storage: UserStorageService) {}

    login(data) {
        const body = { username: data.username, password_md5: Md5.hashStr(data.password) };
        return this.http.post(environment.baseUrl + '/system.user.login/', JSON.stringify(body))
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
        let errMsg = (data.error && data.error.request  && data.error.request.error) ? data.error.request.error :  'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(errMsg);
    }


}


