import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../environments/environment';
import { UserStorageService } from '../../storage/storage.service';

@Injectable()
export class ResearchService {

  constructor(
    private http: HttpClient,
    private storage: UserStorageService
  ) { }

  getResearchProducts() {
    const body = {
      'pagination': {
        'page': 1,
        'size': 10
      },
      'filters': {
        'marketplace': 'A1PA6795UKMFR9',
      }
    };
    return this.http.post(`${environment.baseUrl}/research.products.get`, body)
      .catch(this.handleError);
  }

  getMarketplaces() {
    const userInfo = this.storage.get();
    return userInfo ? userInfo.user.entity.modules.advertising[0].marketplaces : null;
  }

  private handleError(data: any) {
    const errMsg = (data.error && data.error.request  && data.error.request.error && data.error.request.error.code ) ?
      data.error.request.error.code : 'Server error';
    console.error(errMsg); // log to console
    return Observable.throw(`FALCON_ERR_${errMsg}`);
  }
}
