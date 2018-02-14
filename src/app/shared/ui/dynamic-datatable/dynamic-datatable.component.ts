import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jp from 'jsonpath';

import { NotificationService } from '../../utils/notification.service';
import { LoadingIndicatorService } from '../../../core/loading-indicator/loading-indicator.service';

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
    @Input() serverPagination = true;

    render = true;

    data: any[];

    sizes = [10, 20, 50];

    pagination = {
        page: 1,
        size: this.sizes[0]
    };

    columns: any[];
    displayColumns: string[];

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService,
        private loadingIndicator: LoadingIndicatorService
    ) {}

    ngOnInit() {
        this.columns = this.schema.map(field => ({ 'data': field.name }));
        this.displayColumns = this.schema.map(field => field.display);
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
                this.data = this.transformData(res[this.rootField]);
                this.render = false;
                setTimeout(() => {
                    this.render = true;
                }, 10);
                this.loadingIndicator.toggle(false);
            }, error => {
                // do something with error
                const errMsg = (error.error && error.error.request  && error.error.request.error && error.error.request.error.code ) ?
                    error.error.request.error.code : 'Server error';
                this.notificationService.smallBox({
                    content: errMsg,
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

}
