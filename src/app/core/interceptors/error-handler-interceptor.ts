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
        const errMsg = (data.error && data.error.request  && data.error.request.error && data.error.request.error.code ) ?
            data.error.request.error.code : 'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(`FALCON_ERR_${errMsg}`);
    }
}

