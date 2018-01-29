import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CampaignsService {

    constructor(private http: HttpClient) {
    }

}