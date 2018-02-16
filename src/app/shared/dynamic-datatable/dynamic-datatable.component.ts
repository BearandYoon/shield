import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jp from 'jsonpath';

import { NotificationService } from '../utils/notification.service';
import { LoadingIndicatorService } from '../../core/loading-indicator/loading-indicator.service';
import { DatatableComponent } from '@swimlane/ngx-datatable/release';

@Component({
    selector: 'app-dynamic-datatable',
    templateUrl: './dynamic-datatable.component.html',
    styleUrls: ['./dynamic-datatable.component.css']
})
export class DynamicDatatableComponent implements OnInit, OnChanges {

    @Input() url: string;
    @Input() filters = {};
    @Input() schema: any[];
    @Input() rootField: string;
    @Input() options: Object;

    data: any[];

    columns: any[];

    // pagination

    sizes = [10, 25, 50, 100];

    serverPagination = true;

    pagination = {
        page: 1,
        size: this.sizes[0]
    };

    total: number; // total number of rows on server

    // row selection

    selected = [];

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService,
        private loadingIndicator: LoadingIndicatorService
    ) {}

    ngOnInit() {
        this.columns = this.schema.map(field => ({
            name:  field.display,
            show: true
        }));
        console.log(this.columns);
    }

    ngOnChanges() {
        this.getData();
    }

    getData() {
        const data = Object.assign({ filters: this.filters }, this.options);
        if (this.serverPagination) {
            Object.assign(data, { pagination: this.pagination });
        }
        this.loadingIndicator.toggle(true);
        this.http.post(this.url, data)
            .subscribe(res => {
                this.total = res['pagination']['filtered'];

                this.data = this.transformData(res[this.rootField]);
                this.loadingIndicator.toggle(false);

            }, error => {
                this.notificationService.smallBox({
                    content: error,
                    color: '#a90329',
                    timeout: 4000,
                    icon: 'fa fa-warning shake animated'
                });
                this.loadingIndicator.toggle(false);
            })
    }

    transformData(entries: any[]) {
        const transformedEntries = [];
        entries.forEach(entry => {
            const transformedEntry = {};
            this.schema.forEach(rule => {
                if (rule.path) {
                    if (rule.fn) {
                        transformedEntry[rule.name] = jp.apply(entry, rule.path, rule.fn)[0].value;
                    } else {
                        transformedEntry[rule.name] = jp.value(entry, rule.path);
                    }
                } else {
                    transformedEntry[rule.name] = '';
                }
            });
            transformedEntries.push(transformedEntry);
        });
        return transformedEntries;
    }

    updatePageSize(event) {
        this.pagination.page = 1;
        this.pagination.size = event.target.value;
        this.getData();
    }

    getShownColumns() {
        return this.columns.filter(c => c.show);
    }

    toggleColumn(column) {
        column.show = !column.show;
    }

    isColumnChecked(column) {
        return this.columns.find(c => {
            return c.name === column.name;
        });
    }

    refresh() {
        this.getData();
    }

    setPage(pageInfo) {
        this.pagination.page = pageInfo.offset + 1;
        this.getData();
    }

    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);

        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }
}
