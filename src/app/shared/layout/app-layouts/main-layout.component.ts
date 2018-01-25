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

    //---------------------------------
    // Test code for cache service
    //---------------------------------
    this.cache.clearCache();

    let httpObservable = this.jsonApi.fetch('/projects.json');
    this.cache.observable('project', httpObservable, 10).subscribe(result => {
      console.log("FIRST", result);
    });


    setTimeout(() => {
      let httpObservable = this.jsonApi.fetch('/projects.json');
      this.cache.observable('project', httpObservable, 10).subscribe(result => {
        console.log("SECOND", result);
      });
    }, 8000);

    setTimeout(() => {
      let httpObservable = this.jsonApi.fetch('/projects.json');
      this.cache.observable('project', httpObservable, 10).subscribe(result => {
        console.log("Third", result);
      });
    }, 20000);
    //---------------------------------    
  }

}
