import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jp from 'jsonpath';

import { NotificationService } from '../utils/notification.service';
import { LoadingIndicatorService } from '../../core/loading-indicator/loading-indicator.service';

@Component({
    selector: 'app-dynamic-datatable',
    templateUrl: './dynamic-datatable.component.html',
    styleUrls: ['./dynamic-datatable.component.css']
})
export class DynamicDatatableComponent implements OnInit, OnChanges {

    // we pass either url, filters, rootField to make a request or rawData
    @Input() url?: string;
    @Input() filters? = {};
    @Input() rootField?: string;

    @Input() rawData?: any[];

    @Input() schema: any[];

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

    ngOnInit() {}

    ngOnChanges() {
        this.columns = this.schema.map(field => ({
            name:  field.display,
            show: true
        }));
        if (this.url) {
            this.serverPagination = true;
            this.getData();
        } else if (this.rawData) {
            this.serverPagination = false;
            // we don't want to modify initial objects
            this.data = this.transformData(this.rawData.map( entry => Object.assign({}, entry)));
        }
    }

    getData() {
        const reqData = { filters: this.filters, pagination: this.pagination };
        this.loadingIndicator.toggle(true);
        this.http.post(this.url, reqData)
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
        if (this.serverPagination) {
            this.getData();
        }
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
        if (this.serverPagination) {
            this.pagination.page = pageInfo.offset + 1;
            this.getData();
        }
    }

    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);

        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }
}
