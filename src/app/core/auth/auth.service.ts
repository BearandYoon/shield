import { Injectable  } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { UserStorageService } from "../storage/storage.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
import constants from '../../shared/constants';

@Injectable()
export class AuthService {

    private loginStatusChangeManager;
    public loginStatusChange: Observable<boolean>;

    constructor(private http: HttpClient, private userStorage: UserStorageService) {
        this.loginStatusChangeManager = new BehaviorSubject<boolean>(this.isLoggedIn());
        this.loginStatusChange = this.loginStatusChangeManager.asObservable();
    }

    login(data) {
        const body = { username: data.username, password_md5: Md5.hashStr(data.password), captcha: data.captcha };
        const persist = data.persist;

        return this.http.post(environment.baseUrl + '/system.user.login', JSON.stringify(body),
            { observe: 'response' })
            .do(res => {
                const falconToken = res.headers.get(constants.FALCON_TOKEN);
                const xsrfToken = res.headers.get(constants.XSRF_TOKEN);

                this.userStorage.save(res.body, xsrfToken, falconToken, persist);

                this.loginStatusChangeManager.next(true);
            })
            .catch(this.handleError);
    }

    logout() {
        return this.http.post(environment.baseUrl + '/system.user.logout', null)
            .do(() => {
                this.userStorage.remove();
                this.loginStatusChangeManager.next(false);
            })
            .catch(this.handleError);
    }

    isLoggedIn() {
        return !!this.userStorage.get();
    }

    resetPassword(data) {
        return this.http.post(environment.baseUrl + '/system.user.recover', JSON.stringify(data))
            .catch(this.handleError);
    }

    checkStatus() {
        return this.http.post(environment.baseUrl + '/system.user.status', null)
            .catch(this.handleError);
    }

    private handleError(data:any) {
        let errMsg = (data.error && data.error.request  && data.error.request.error && data.error.request.error.code ) ?
            data.error.request.error.code : 'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(`FALCON_ERR_${errMsg}`);
    }

}


