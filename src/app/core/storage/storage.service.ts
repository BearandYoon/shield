import { Injectable } from '@angular/core';
import constants from '../core.constants';

@Injectable()
export class UserStorageService {

    constructor() {}

    save(value, xsrfToken, falconToken, persist) {
        const storage = persist ? localStorage : sessionStorage;
        storage.setItem(constants.USER_STORAGE_KEY, JSON.stringify(value));
        storage.setItem(constants.XSRF_TOKEN, JSON.stringify(xsrfToken));
        storage.setItem(constants.FALCON_TOKEN, JSON.stringify(falconToken));
    }

    get() {
        return JSON.parse(localStorage.getItem(constants.USER_STORAGE_KEY)
            || sessionStorage.getItem(constants.USER_STORAGE_KEY) || 'null');
    }

    getXsrfToken() {
        return JSON.parse(localStorage.getItem(constants.XSRF_TOKEN) || sessionStorage.getItem(constants.XSRF_TOKEN) || 'null');
    }

    getFalconToken() {
        return JSON.parse(localStorage.getItem(constants.FALCON_TOKEN) || sessionStorage.getItem(constants.FALCON_TOKEN) || 'null');
    }

    remove() {
        localStorage.removeItem(constants.USER_STORAGE_KEY);
        localStorage.removeItem(constants.XSRF_TOKEN);
        localStorage.removeItem(constants.FALCON_TOKEN);
        sessionStorage.removeItem(constants.USER_STORAGE_KEY);
        sessionStorage.removeItem(constants.XSRF_TOKEN);
        sessionStorage.removeItem(constants.FALCON_TOKEN);
    }

}


