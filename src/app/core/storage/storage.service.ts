import { Injectable } from '@angular/core';

@Injectable()
export class UserStorageService {

    private userKey = 'am-user';

    constructor() {}

    save(value, persist) {
        let storage = persist ? localStorage : sessionStorage;
        storage.setItem(this.userKey, JSON.stringify(value));
    }

    get() {
        return JSON.parse(localStorage.getItem(this.userKey) || sessionStorage.getItem(this.userKey));
    }

    remove() {
        localStorage.removeItem(this.userKey);
        sessionStorage.removeItem(this.userKey);
    }

}


