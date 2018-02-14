import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.post(`${environment.baseUrl}/research.products.get`, body)}

  getMarketplaces() {
    const userInfo = this.storage.get();
    return userInfo ? userInfo.user.entity.modules.research.marketplaces : null;
  }
}
