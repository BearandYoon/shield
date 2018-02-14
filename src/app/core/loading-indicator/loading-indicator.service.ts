import { Injectable } from '@angular/core';

@Injectable()
export class LoadingIndicatorService {

    public show: boolean;

    constructor() {}

    toggle(show?: boolean) {
        if (show) {
            this.show = show;
        } else {
            this.show = !this.show;
        }
    }

}


