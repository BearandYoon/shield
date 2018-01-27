import { Component, OnInit } from '@angular/core';
import {FadeZoomInTop} from "../../animations/fade-zoom-in-top.decorator";
import { CacheService } from 'app/core/cache/cache.service';
import { JsonApiService } from 'app/core/api/json-api.service';

@FadeZoomInTop()
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styles: []
})
export class MainLayoutComponent implements OnInit {

  constructor(private cache: CacheService, private jsonApi: JsonApiService) { }

  ngOnInit() {
  }

}
