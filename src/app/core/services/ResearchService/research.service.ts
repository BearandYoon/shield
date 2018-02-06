import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ResearchService {

  constructor() { }

  getResearchProducts() {
    // return this.http.get(`${environment.baseUrl}system.user.status`);
  }
}
