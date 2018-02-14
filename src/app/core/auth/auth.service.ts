import { Injectable  } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { UserStorageService } from '../storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
import constants from '../core.constants';

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

        return this.http.post(environment.baseUrl + '/system.user.login', body,
            { observe: 'response' })
            .do(res => {
                const falconToken = res.headers.get(constants.FALCON_TOKEN);
                const xsrfToken = res.headers.get(constants.XSRF_TOKEN);

                this.userStorage.save(res.body, xsrfToken, falconToken, persist);

                this.loginStatusChangeManager.next(true);
            })
    }

    logout() {
        return this.http.post(environment.baseUrl + '/system.user.logout', null)
            .do(() => {
                this.userStorage.remove();
                this.loginStatusChangeManager.next(false);
            })
    }

    isLoggedIn() {
        return !!this.userStorage.get();
    }

    resetPassword(data) {
        return this.http.post(environment.baseUrl + '/system.user.recover', data)
    }

    checkStatus() {
        return this.http.post(environment.baseUrl + '/system.user.status', null)
            .catch((error: string) => {
                this.userStorage.remove();
                return Observable.throw(error);
            })
    }
}
