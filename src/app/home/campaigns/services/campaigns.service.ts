import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserStorageService } from '../../../core/storage/storage.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CampaignsService {

    constructor(private http: HttpClient, private storage: UserStorageService) {
    }

    getCampaigns() {
        return this.http.get(environment.baseUrl + '/advertising.campaigns.get');
    }

    getMerchants() {
        const userInfo = this.storage.get();
        return userInfo && userInfo.user.entity.modules.advertising.merchants;
    }

    getMarketplaces() {
        const userInfo = this.storage.get();
        return userInfo && userInfo.user.entity.modules.advertising.marketplaces;
    }

    checkAsin(data) {
        return this.http.post(environment.baseUrl + '/generic.asin.check', data)
            .catch(this.handleError)
    }

    checkSku(data) {
        return this.http.post(environment.baseUrl + '/generic.sku.check', data)
            .catch(this.handleError)
    }

    getTargetingCompetitors() {
        return this.http.post(environment.baseUrl + '/advertising.campaigns.targeting.competitors.get', null)
            .catch(this.handleError)
    }

    getCalculation() {
        return this.http.post(environment.baseUrl + '/advertising.campaigns.calculation.get', null)
            .catch(this.handleError)
    }

    // TODO move to separate file and reuse
    private handleError(data:any) {
        let errMsg = (data.error && data.error.request  && data.error.request.error && data.error.request.error.code ) ?
            data.error.request.error.code : 'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(`FALCON_ERR_${errMsg}`);
    }

}