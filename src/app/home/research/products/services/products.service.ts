import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserStorageService } from '../../../../core/storage/storage.service';

@Injectable()
export class ProductsService {

  constructor(
    private http: HttpClient,
    private storage: UserStorageService
  ) { }

  getMarketplaces() {
    const userInfo = this.storage.get();
    return userInfo ? userInfo.user.entity.modules.research.marketplaces : null;
  }
}
