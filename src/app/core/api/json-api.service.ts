import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { config } from '../../shared/smartadmin.config';

@Injectable()
export class JsonApiService {

  constructor(private http: HttpClient) {}

  public fetch(url): Observable<any> {
    return this.http.get(config.API_URL + url)
      .delay(100)
      .map((data: any) => (data.data || data))
  }

  private getBaseUrl() {
    return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'
  }

}


