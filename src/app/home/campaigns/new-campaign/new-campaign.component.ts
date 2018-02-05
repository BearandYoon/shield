import { Component, OnInit, DoCheck } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { BsModalRef} from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { TYPES, PROGRESS } from '../campaigns.constants';
import { NotificationService } from "../../../shared/utils/notification.service";
import {CampaignsService} from "../services/campaigns.service";

@Component({
    selector: 'app-new-campaign',
    templateUrl: './new-campaign.component.html',
    styleUrls: ['./new-campaign.component.css'],
    animations: [
        trigger('changePane', [
            state('out', style({
                height: 0,
            })),
            state('in', style({
                height: '*',
            })),
            transition('out => in', animate('250ms ease-out')),
            transition('in => out', animate('250ms 300ms ease-in'))
        ])
    ]
})
export class NewCampaignComponent implements OnInit, DoCheck {

    merchants: any[];
    marketplaces: any[];

    types = Object.keys(TYPES);

    campaignForm: FormGroup;

    bsConfig = {
        dateInputFormat: 'DD/MM/YYYY',
        containerClass: 'theme-blue'
    };

    constructor(public fb: FormBuilder,
                public bsModalRef: BsModalRef,
                public notificationService: NotificationService,
                private campaignsService: CampaignsService) {
    }

    ngOnInit() {
        this.merchants = this.campaignsService.getMerchants();
        this.marketplaces = this.campaignsService.getMarketplaces();

        this.campaignForm = this.fb.group({
            type: ['', Validators.required],

            name: ['', Validators.required],
            start: '',
            end: '',
            budget: ['', Validators.required],
            merchant: [this.merchants[0].id, Validators.required],
            marketplace: [this.marketplaces[0].id, Validators.required],
            asin: ['', Validators.required],
            skus: ['', Validators.required],

            targeting: ['', Validators.required],

            optimization: ['', Validators.required]
        });

        this.getCompetitors();
    }

    public steps = [
        {
            key: 'step1',
            title: 'Campaign type',
            valid: false,
            checked: false,
            submitted: false,
        },
        {
            key: 'step2',
            title: 'Product',
            valid: false,
            checked: false,
            submitted: false,
        },
        {
            key: 'step3',
            title: 'Targeting',
            valid: true,
            checked: false,
            submitted: false,
        },
        {
            key: 'step4',
            title: 'Optimization',
            valid: true,
            checked: false,
            submitted: false,
        },
        {
            key: 'step5',
            title: 'Summary',
            valid: true,
            checked: false,
            submitted: false,
        },
    ];

    public activeStep = this.steps[0];

    close() {
        this.notificationService.smartMessageBox({
            title: "",
            content: "Are you sure you want to close the window and discard the changes?",
            buttons: '[No][Yes]'
        }, (ButtonPressed) => {
            if (ButtonPressed === "Yes") {
                this.bsModalRef.hide();
            }
        });
    }

    setActiveStep(step) {
        const currentStepIndex = this.steps.indexOf(this.activeStep);
        const stepIndex = this.steps.indexOf(step);
        if ((stepIndex > currentStepIndex && this.activeStep.valid) || (stepIndex < currentStepIndex)) {
            this.activeStep = step
        }
    }

    prevStep() {
        let idx = this.steps.indexOf(this.activeStep);
        if (idx > 0) {
            this.activeStep = this.steps[idx - 1]
        }
    }

    nextStep() {
        this.activeStep.submitted = true;
        if(!this.activeStep.valid){
            return;
        }
        this.activeStep.checked = true;
        if (this.steps.every(it=>(it.valid && it.checked))) {
            this.onWizardComplete(this.campaignForm.value)
        } else {
            let idx = this.steps.indexOf(this.activeStep);
            this.activeStep = null;
            while (!this.activeStep) {
                idx = idx == this.steps.length - 1 ? 0 : idx + 1;
                if (!this.steps[idx].valid || !this.steps[idx].checked ) {
                    this.activeStep = this.steps[idx]
                }
            }
        }
    }

    validateSku(sku) {
        const prevSkus = this.campaignForm.controls['skus'].value;
        prevSkus.pop(); // delete newly added sku

        const marketplace = this.campaignForm.controls['marketplace'].value;
        const asin = this.campaignForm.controls['asin'].value;

        return this.campaignsService.checkSku({skus: [{sku, marketplace, asin}]})
            .subscribe(() => {
            }, (error) => {
                this.notificationService.smallBox({
                    content: error,
                    color: "#a90329",
                    timeout: 4000,
                    icon: "fa fa-warning shake animated"
                });
                this.campaignForm.controls['skus'].setValue(prevSkus);
            })
    }

    onWizardComplete(data) {
        console.log('basic wizard complete', data)
    }

    chooseType(type: string) {
        this.campaignForm.controls['type'].setValue(type);
    }

    isActiveType(type: string) {
        return this.campaignForm.controls['type'].value === type;
    }

    chooseTarget(target: string) {
        this.campaignForm.controls['targeting'].setValue(target);
    }

    competitors: Observable<any[]>;

    getCompetitors() {
        this.competitors = this.campaignsService.getTargetingCompetitors();
    }

    chooseOptimization(optimization: string) {
        this.campaignForm.controls['optimization'].setValue(optimization);
    }

    validateAsin() {
        const asin = this.campaignForm.controls['asin'].value;
        const marketplace = this.campaignForm.controls['marketplace'].value;
        if (asin) {
            this.campaignsService.checkAsin({asins: [{ asin, marketplace }]})
                .subscribe(() => {
                    this.campaignForm.controls['asin'].setErrors(null);
                }, (error) => {
                    this.notificationService.smallBox({
                        content: error,
                        color: "#a90329",
                        timeout: 4000,
                        icon: "fa fa-warning shake animated"
                    });
                    this.campaignForm.controls['asin'].setErrors({invalid: true});
                })
        }
    }

    createCampaign() {

    }

    private lastValue;

    isLastStep(activeStep) {
        return activeStep === this.steps[this.steps.length - 1];
    }

    // custom change detection
    ngDoCheck() {
        const value = this.campaignForm.value;
        if (!this.lastValue) {
            // backup model to compare further with
            this.lastValue = Object.assign({}, value)
        } else {
            if (Object.keys(value).some(it=>value[it] != this.lastValue[it])) {
                // change detected
                this.steps.find(it=>it.key == 'step1').valid = this.campaignForm.controls['type'].valid;
                this.steps.find(it=>it.key == 'step2').valid = this.campaignForm.valid;
                this.steps.find(it=>it.key == 'step3').valid = true;
                this.steps.find(it=>it.key == 'step4').valid = true;
                this.steps.find(it=>it.key == 'step5').valid = true;

                this.lastValue = Object.assign({}, value)
            }
        }
    }

}
