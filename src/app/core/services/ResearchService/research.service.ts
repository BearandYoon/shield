import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../environments/environment';

@Injectable()
export class ResearchService {

  constructor(
    private http: HttpClient
  ) { }

  getResearchProducts() {
    console.log('getResearchProducts Api calling');
    const body = {
      'pagination': {
        'page': 1,
        'size': 10
      },
      'filters': {
      }
    };
    return this.http.post(`${environment.baseUrl}/research.products.get`, body)
      .catch(this.handleError);
  }

  private handleError(data: any) {
    const errMsg = (data.error && data.error.request  && data.error.request.error && data.error.request.error.code ) ?
      data.error.request.error.code : 'Server error';
    console.error(errMsg); // log to console
    return Observable.throw(`FALCON_ERR_${errMsg}`);
  }
}
