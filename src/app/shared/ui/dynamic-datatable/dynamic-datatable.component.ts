import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jp from 'jsonpath';

@Component({
  selector: 'dynamic-datatable',
  templateUrl: './dynamic-datatable.component.html',
  styleUrls: ['./dynamic-datatable.component.css']
})
export class DynamicDatatableComponent implements OnInit, OnChanges {

  @Input() url: string;
  @Input() filters: Object = {};
  @Input() schema: any[];
  @Input() rootField: string;

  data: any[];

  sizes = [10, 20, 50];

  pagination = {
    page: 1,
    size: this.sizes[0]
  };

  columns: any[];
  displayColumns: string[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.columns = this.schema.map(field => ({ 'data': field.name }));
    this.displayColumns = this.schema.map(field => field.display);

    this.getData();
  }

  ngOnChanges() {
    this.getData();
  }

  getData() {
    const data = { pagination: this.pagination, filters: this.filters };
    this.http.post(this.url, data)
        .subscribe(res => {
          this.data = this.transformData(res[this.rootField]);
        }, error => {
          alert(error);
        })
  }

  transformData(entries: any[]) {
    const transformedEntries = [];
    entries.forEach(entry => {
      const transformedEntry = {};
      this.schema.forEach(rule => {
        transformedEntry[rule.name] = jp.value(entry, rule.path);
      });
      transformedEntries.push(transformedEntry);
    });
    return transformedEntries;
  }

}
