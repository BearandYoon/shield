import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request)
            .catch(this.handleError);
    }

    private handleError(data: any): Observable<any> {
        const errCode = (data.error && data.error.request  && data.error.request.error && data.error.request.error.code ) ?
            data.error.request.error.code : null;
        const errMessage = errCode ? `FALCON_ERR_${errCode}` : 'Server error';
        return Observable.throw(errMessage);
    }
}

