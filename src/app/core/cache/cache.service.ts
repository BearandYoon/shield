import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { expressionType } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class CacheService {

    private cacheKey:any = 'cache';
    private defaultExpires = 86400;

    constructor() {
        this.cacheKey = Md5.hashStr('cache');
    }

    clearCache() {
        localStorage.removeItem(this.cacheKey);
        sessionStorage.removeItem(this.cacheKey);
    }

    public observable(key: string, observable: Observable<any>, expiresInSec: number = this.defaultExpires, persist:boolean = false): Observable<any> {
        let dataObj = this.getCache(key, persist);
        if(dataObj && new Date(dataObj.expireAt).getTime() > Date.now()) {
            return Observable.of(dataObj);
        } else {
            return observable.mergeMap((result: any) => this.doCache(key, result, expiresInSec, persist));
        }
    }

    private doCache(key: string, value: any, expireAt: number, persist: boolean = false) {
        let storage = persist ? localStorage : sessionStorage;
        let dataObj = JSON.parse(storage.getItem(this.cacheKey));
        let cached = {
            value: value,
            expireAt: (Date.now() + expireAt * 1000),
        };
        dataObj = dataObj ? dataObj : {};
        dataObj[key] = cached;
        try {
            storage.setItem(this.cacheKey, JSON.stringify(dataObj));
        } catch (errMsg) {
            console.error(errMsg); // log to console
            dataObj[key] = undefined;
            try {
                storage.setItem(this.cacheKey, JSON.stringify(dataObj));
            } catch (err) {
                console.error(err); // log to console
                return Observable.throw(`FALCON_ERR_${err}`);
            }
            return Observable.throw(`FALCON_ERR_${errMsg}`);    
        }
        return Observable.of(cached);
    }

    private getCache(key: string, persist: boolean = false) {
        let storage = persist ? localStorage : sessionStorage;
        let dataObj = JSON.parse(storage.getItem(this.cacheKey));
        return dataObj ? dataObj[key] || null : null;
    }

}


