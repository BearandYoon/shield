import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserStorageService } from '../../../core/storage/storage.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CampaignsService {

    constructor(private http: HttpClient, private storage: UserStorageService) {
    }

    getMerchants() {
        const userInfo = this.storage.get();
        return userInfo.user.entity.modules.advertising.map(advertising => advertising.merchant);
    }

    getMarketplaces(merchantId: string) {
        const userInfo = this.storage.get();
        return userInfo.user.entity.modules.advertising.find(advertising => {
            return advertising.merchant.id === merchantId;
        }).marketplaces;
    }

    checkAsin(data) {
        return this.http.post(environment.baseUrl + '/generic.asin.check', data)
    }

    checkSku(data) {
        return this.http.post(environment.baseUrl + '/generic.sku.check', data)
    }

    getCalculation(data) {
        return this.http.post(environment.baseUrl + '/advertising.campaign.spa.optimization.genius.calculation.get', data)
    }

    getKeywords(data) {
        return this.http.post(environment.baseUrl + '/advertising.campaign.spa.targeting.keywords.get', data);
    }

    getCompetitors(data) {
        return this.http.post(environment.baseUrl + '/advertising.campaign.spa.targeting.competitors.get', data);
    }

}