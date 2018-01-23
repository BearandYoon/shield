import { Injectable } from '@angular/core';

@Injectable()
export class UserStorageService {

    private userKey = 'am-user';

    constructor() {}

    save(value) {
        localStorage.setItem(this.userKey, JSON.stringify(value));
    }

    get() {
        return JSON.parse(localStorage.getItem(this.userKey));
    }

    remove() {
        localStorage.removeItem(this.userKey);
    }

}


