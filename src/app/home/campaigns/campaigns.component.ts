import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CampaignsService } from "./services/campaigns.service";
import { TYPES, PROGRESS } from './campaigns.constants';
import {BsModalService} from "ngx-bootstrap";
import {NewCampaignComponent} from "./new-campaign/new-campaign.component";

@Component({
    selector: 'app-campaigns',
    templateUrl: 'campaigns.component.html',
    styleUrls: ['campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

    campaigns: any[];
    merchants: any[];
    marketplaces: any[];

    progress = Object.keys(PROGRESS);
    types = Object.keys(TYPES);

    showFilter = false;

    bsConfig = {
        dateInputFormat: 'DD/MM/YYYY',
        containerClass: 'theme-blue'
    };

    modalConfig = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: true
    };

    searchForm: FormGroup;
    filterForm: FormGroup;

    constructor(private fb: FormBuilder,
                private modalService: BsModalService,
                private campaignsService: CampaignsService) {}

    ngOnInit() {
        this.merchants = this.campaignsService.getMerchants();
        this.marketplaces = this.campaignsService.getMarketplaces();

        this.searchForm = this.fb.group({
            general: ['', Validators.required]
        });

        this.filterForm = this.fb.group({
            start: '',  // not in api
            end: '',  // not in api
            progress: this.progress[0],
            type: this.types[0],
            merchant: this.merchants[0].id,
            marketplace: this.marketplaces[0].id,
            asin: ''
        });
    }

    createCampaign() {
        this.modalService.show(NewCampaignComponent, Object.assign({}, this.modalConfig, { class: 'modal-lg' }));
    }

    toggleFilter() {
        this.showFilter = !this.showFilter;
    }

}
