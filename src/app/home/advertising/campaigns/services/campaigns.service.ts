import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class CampaignsService {

    constructor(private http: HttpClient) {
    }

    getCampaigns() {
        return this.http.get(environment.baseUrl + '/advertising.campaigns.get');
    }

}