import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserStorageService } from '../storage/storage.service';

import constants from '../core.constants';

@Injectable()
export class TokensInterceptor implements HttpInterceptor {

    constructor(private storage: UserStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const xsrfToken = this.storage.getXsrfToken();
        const falconToken = this.storage.getFalconToken();

        if (xsrfToken) {
            const xsrfTokenHeader = {};
            xsrfTokenHeader[constants.XSRF_TOKEN] = xsrfToken;
            request = request.clone({
                setHeaders: xsrfTokenHeader
            });
        }

        if (falconToken) {
            const falconTokenHeader = {};
            falconTokenHeader[constants.FALCON_TOKEN] = falconToken;
            request = request.clone({
                setHeaders: falconTokenHeader
            });
        }

        return next.handle(request);
    }
}
