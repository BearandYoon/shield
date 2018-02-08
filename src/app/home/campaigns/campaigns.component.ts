import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CampaignsService } from "./services/campaigns.service";
import { TYPES, PROGRESS } from './campaigns.constants';
import { BsModalService } from "ngx-bootstrap";
import { NewCampaignComponent } from "./new-campaign/new-campaign.component";
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit, OnDestroy {

    url = environment.baseUrl + '/advertising.campaigns.get';

    schema = [
        {
            name: 'progress',
            display: 'Progress',
            path: '$.amalyze.progress'
        },
        {
            name: 'status',
            display: 'Status',
            path: '$.amazon.status'
        },
        {
            name: 'merchant',
            display: 'Merchant',
            path: '$.amazon.merchant.name'
        },
        {
            name: 'marketplace',
            display: 'Marketplace',
            path: '$.amazon.marketplace.name'
        },
        {
            name: 'type',
            display: 'Type',
            path: '$.amazon.type'
        },
        {
            name: 'asin',
            display: 'ASIN',
            path: '$.amazon.asin'
        },
        {
            name: 'start',
            display: 'Start',
            path: '$.amazon.start'
        },
        {
            name: 'end',
            display: 'End',
            path: '$.amazon.end'
        },
        {
            name: 'skus',
            display: 'SKUs',
            path: '$.amazon.skus'
        },
        {
          name: 'targeting',
          display: 'Targeting',
          path: '$.amalyze.targeting'
        },
        {
            name: 'optimization',
            display: 'Optimization',
            path: '$.amalyze.optimization'
        },
        {
            name: 'keywords',
            display: 'Keywords',
            path: '$.amalyze.keywords'
        },
        {
            name: 'optimizations',
            display: 'Optimizations',
            path: '$.amalyze.optimizations'
        }
    ];

    filters = {};

    ////////////////

    campaigns: any[];
    merchants: any[];
    marketplaces: any[] = [];

    progress = Object.keys(PROGRESS);
    types = Object.keys(TYPES);

    showFilter = false;

    bsConfig = {
        dateInputFormat: 'DD/MM/YYYY',
        containerClass: 'theme-blue'
    };

    modalConfig = {
        animated: true,
        backdrop: 'static',
        keyboard: false,
        ignoreBackdropClick: true
    };

    quickFilterForm: FormGroup;
    filterForm: FormGroup;

    merchantSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private modalService: BsModalService,
                private campaignsService: CampaignsService) {}

    ngOnInit() {
        this.merchants = this.campaignsService.getMerchants();

        this.quickFilterForm = this.fb.group({
            'amalyze.generic': ['', Validators.required]
        });

        this.filterForm = this.fb.group({
            'start': '',  // not in api
            'end': '',  // not in api
            'amalyze.progress': '',
            'campaign.type': '',
            'merchant': '',
            'marketplace': '',
            'asin': ''
        });

        this.merchantSubscription = this.filterForm.controls['merchant'].valueChanges
            .do(merchantId => {
                if (!merchantId) {
                    this.marketplaces = [];
                    this.filterForm.controls['marketplace'].setValue('');
                }
            })
            .filter(merchantId => merchantId)
            .map(merchantId => this.campaignsService.getMarketplaces(merchantId))
            .subscribe(marketplaces => {
                this.marketplaces = marketplaces;
            });
    }

    createCampaign() {
        this.modalService.show(NewCampaignComponent, Object.assign({}, this.modalConfig, { class: 'modal-lg' }));
    }

    doFilter(data) {
        this.filters = data;
    }

    toggleFilter() {
        this.showFilter = !this.showFilter;
    }

    ngOnDestroy() {
        this.merchantSubscription.unsubscribe();
    }

}
