import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { BsModalRef} from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

import { TYPES, PROGRESS } from '../campaigns.constants';
import { NotificationService } from '../../../shared/utils/notification.service';
import { CampaignsService } from '../services/campaigns.service';
import { LoadingIndicatorService } from '../../../core/loading-indicator/loading-indicator.service';
import { I18nService } from '../../../shared/i18n';

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
export class NewCampaignComponent implements OnInit, OnDestroy, DoCheck {

    merchants: any[];
    marketplaces: any[];

    asinValidating = false;
    skuValidating = false;

    types = Object.keys(TYPES);

    campaignForm: FormGroup;

    calcForm: FormGroup;

    keywordForm: FormGroup;
    competitorsForm: FormGroup;

    bsConfig = {
        dateInputFormat: 'DD/MM/YYYY',
        containerClass: 'theme-blue'
    };

    merchantSubscription: Subscription;

    competitorsSchema = [
        {
            name: 'title',
            display: 'Title',
            path: '$.title'
        },
        {
            name: 'brand',
            display: 'Brand',
            path: '$.brand.name'
        },
        {
            name: 'asin',
            display: 'ASIN',
            path: '$.asin'
        },
        {
            name: 'category',
            display: 'Category',
            path: '$.category',
            fn: value => this.i18n.getTranslation(`AMZ_CAT_${value}`)
        },
        {
            name: 'keywords',
            display: 'Keywords',
            path: '$.keywords',
            fn: value => {
                const traverse = (obj, cb) => {
                    _.forEach(obj, function (val, key) {

                        if (_.isObject(val) || _.isArray(val)) {
                            traverse(val, cb)
                        } else {
                            cb(val, key);
                        }
                    });
                };

                if (!_.isObject(value)) {
                    return _.isNumber(value) ? value : 0;
                }

                let keywordsSum = 0;
                let keywordsCount = 0;

                traverse(value, val => {
                    if (_.isNumber(val)) {
                        keywordsSum += val;
                        keywordsCount++;
                    }
                });

                return (keywordsSum / keywordsCount || 0).toFixed(2);
            }
        }
    ];

    keywordsSchema = [
        {
            name: 'keyword',
            display: 'Keyword',
            path: '$.keyword'
        },
        {
            name: 'keywords',
            display: 'Keywords',
            path: '$.keywords',
            fn: value => {
                const traverse = (obj, cb) => {
                    _.forEach(obj, function (val, key) {

                        if (_.isObject(val) || _.isArray(val)) {
                            traverse(val, cb)
                        } else {
                            cb(val, key);
                        }
                    });
                };

                if (!_.isObject(value)) {
                    return _.isNumber(value) ? value : 0;
                }

                let keywordsSum = 0;
                let keywordsCount = 0;

                traverse(value, val => {
                    if (_.isNumber(val)) {
                        keywordsSum += val;
                        keywordsCount++;
                    }
                });

                return (keywordsSum / keywordsCount || 0).toFixed(2);
            }
        }
    ];

    calculation: any;

    constructor(public fb: FormBuilder,
                public bsModalRef: BsModalRef,
                public notificationService: NotificationService,
                private campaignsService: CampaignsService,
                private loadingIndicator: LoadingIndicatorService,
                private i18n: I18nService) {
    }

    ngOnInit() {
        this.merchants = this.campaignsService.getMerchants();

        this.campaignForm = this.fb.group({
            type: ['', Validators.required],

            name: ['', Validators.required],
            start: '',
            end: '',
            budget: ['', Validators.required],
            merchant: ['', Validators.required],
            marketplace: ['', Validators.required],
            asin: ['', Validators.required],
            skus: [[], Validators.required],

            targeting: ['', Validators.required],

            optimization: ['', Validators.required]
        });

        this.campaignForm.controls['marketplace'].valueChanges
            .subscribe(() => {
                this.validateAsin();
            });

        this.merchantSubscription = this.campaignForm.controls['merchant'].valueChanges
            .do(merchantId => {
                if (!merchantId) {
                    this.marketplaces = [];
                    this.campaignForm.controls['marketplace'].setValue('');
                }
            })
            .filter(merchantId => merchantId)
            .map(merchantId => this.campaignsService.getMarketplaces(merchantId))
            .subscribe(marketplaces => {
                this.marketplaces = marketplaces;
            });

        this.calcForm = this.fb.group({
            customSellingPrice: 0,
            amazonSalesFeeRate: 0,
            customAmazonVariableFee: 0,
            customFeePerArticle: 0,
            customFba: 0,
            increasedFbaFee: 0,
            taxRate: 0,
            buyingCost: 0,
            otherCost: 0,
            conversionRate: 0,
            lowestBid: 0
        });

        this.keywordForm = this.fb.group({
            keyword: ['', Validators.required]
        });

        this.competitorsForm = this.fb.group({
            asin: ['', Validators.required]
        });
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
            title: '',
            content: 'Are you sure you want to close the window and discard the changes?',
            buttons: '[No][Yes]'
        }, (ButtonPressed) => {
            if (ButtonPressed === 'Yes') {
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
        const activeStep = this.activeStep;
        const idx = this.steps.indexOf(this.activeStep);
        switch (activeStep.key) {
            case 'step1':
                break;
            case 'step3':
                if (this.campaignForm.controls['targeting'].value) {
                    this.campaignForm.controls['targeting'].setValue('');
                } else {
                    this.activeStep = this.steps[idx - 1];
                }
                break;
            case 'step4':
                if (this.campaignForm.controls['optimization'].value) {
                    this.campaignForm.controls['optimization'].setValue('');
                } else {
                    this.activeStep = this.steps[idx - 1];
                }
                break;
            default:
                this.activeStep = this.steps[idx - 1];
        }
    }

    nextStep() {
        this.activeStep.submitted = true;
        if (!this.activeStep.valid) {
            return;
        }
        this.activeStep.checked = true;
        if (this.steps.every(it => (it.valid && it.checked))) {
            this.onWizardComplete(this.campaignForm.value)
        } else {
            let idx = this.steps.indexOf(this.activeStep);
            this.activeStep = null;
            while (!this.activeStep) {
                idx = idx === this.steps.length - 1 ? 0 : idx + 1;
                if (!this.steps[idx].valid || !this.steps[idx].checked ) {
                    this.activeStep = this.steps[idx]
                }
            }
        }
    }

    validateSkus() {
        const skus = this.campaignForm.controls['skus'].value;
        const marketplace = this.campaignForm.controls['marketplace'].value;
        const asin = this.campaignForm.controls['asin'].value;
        if (skus.length) {
            if (!marketplace || !asin) {
                this.campaignForm.controls['skus'].setValue(null);
            } else {
                const skuData = skus.map(sku => ({ marketplace, asin, sku }));
                this.skuValidating = true;
                this.campaignsService.checkSku({skus: skuData})
                    .subscribe((res: any) => {
                        const validSkus = [];
                        res.skus.forEach(sku => {
                            if (sku.success) {
                                validSkus.push(sku.sku);
                            }
                        });
                        this.campaignForm.controls['skus'].setValue(validSkus);
                        this.skuValidating = false;
                    }, error => {
                        this.notificationService.smallBox({
                            content: error,
                            color: '#a90329',
                            timeout: 4000,
                            icon: 'fa fa-warning shake animated'
                        });
                        this.skuValidating = false;
                    })
            }
        }
    }

    validateSku(chip) {
        const sku = chip.value;
        const prevSkus = this.campaignForm.controls['skus'].value;

        const marketplace = this.campaignForm.controls['marketplace'].value;
        const asin = this.campaignForm.controls['asin'].value;

        this.skuValidating = true;
        this.campaignsService.checkSku({skus: [{sku, marketplace, asin}]})
            .subscribe(() => {
                this.campaignForm.controls['skus'].setValue(prevSkus);
                this.skuValidating = false;
            }, (error) => {
                this.notificationService.smallBox({
                    content: error,
                    color: '#a90329',
                    timeout: 4000,
                    icon: 'fa fa-warning shake animated'
                });
                prevSkus.pop(); // delete newly added sku
                this.campaignForm.controls['skus'].setValue(prevSkus);
                this.skuValidating = false;
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

    chooseOptimization(optimization: string) {
        this.campaignForm.controls['optimization'].setValue(optimization);
        this.getCalculation();
    }

    validateAsin() {
        const asin = this.campaignForm.controls['asin'].value;
        const marketplace = this.campaignForm.controls['marketplace'].value;
        if (asin) {
            if (!marketplace) {
                this.campaignForm.controls['asin'].setValue(null);
            } else {
                this.asinValidating = true;
                this.campaignsService.checkAsin({asins: [{ asin, marketplace }]})
                    .subscribe(() => {
                        this.asinValidating = false;
                        this.validateSkus();
                    }, (error) => {
                        this.notificationService.smallBox({
                            content: error,
                            color: '#a90329',
                            timeout: 4000,
                            icon: 'fa fa-warning shake animated'
                        });
                        this.campaignForm.controls['asin'].setValue(null);
                        this.asinValidating = false;
                        this.validateSkus();
                    })
            }
        }
    }

    getSkuClasses() {
        return this.skuValidating ? 'form-control ui-autocomplete-loading' : 'form-control';
    }

    //calculated fields
    customAmazonSalesFee =  0;
    tax = 0;
    grossMargin = 0;
    resultingBid = 0;

    getCalculation() {
        const data = {
            asin: this.campaignForm.controls['asin'].value,
            marketplace: this.campaignForm.controls['marketplace'].value
        };
        this.loadingIndicator.toggle(true);
        this.campaignsService.getCalculation(data).subscribe((res: any) => {
            this.calculation = res.calculcation;
            this.calcForm.reset({
                customSellingPrice: this.calculation.default.price.amount || 0.00,
                amazonSalesFeeRate: this.calculation.custom.fees.referral.rate * 100 || 0,
                customAmazonVariableFee: this.calculation.default.fees.variable.amount || 0.00,
                customFeePerArticle: this.calculation.default.fees.peritem.amount || 0.00,
                customFba: this.calculation.default.fees.fba.amount || 0.00,
                increasedFbaFee: this.calculation.custom.fees.increased.amount || 0.00,
                taxRate: this.calculation.custom.tax.rate * 100 || 0,
                buyingCost: this.calculation.custom.buying.amount || 0.00,
                otherCost: this.calculation.custom.other.amount || 0.00,
                conversionRate: this.calculation.custom.cr * 100 || 0.00,
                lowestBid: this.calculation.custom.bid.min || 0.00
            });

            this.calculateCustomAmazonSalesFee();
            this.calculateTax();
            this.calculateGrossMargin();
            this.calculateResultingBid();

            this.calcForm.valueChanges.subscribe(() => {
                this.calculateCustomAmazonSalesFee();
                this.calculateTax();
                this.calculateGrossMargin();
                this.calculateResultingBid();
            });
            this.loadingIndicator.toggle(false);
        })
    }

    calculateCustomAmazonSalesFee() {
        const amazonSalesFeeRate = this.calcForm.controls['amazonSalesFeeRate'].value;
        const customSellingPrice = this.calcForm.controls['customSellingPrice'].value;
        this.customAmazonSalesFee = amazonSalesFeeRate / 100 * customSellingPrice;
    }

    calculateTax() {
        const taxRate = this.calcForm.controls['taxRate'].value / 100;
        const customSellingPrice = this.calcForm.controls['customSellingPrice'].value;
        this.tax = customSellingPrice * (taxRate / (taxRate + 1));
    }

    calculateGrossMargin() {
        const customSellingPrice = this.calcForm.controls['customSellingPrice'].value;
        const amazonSalesFee = this.customAmazonSalesFee;
        const amazonVariableFee = this.calcForm.controls['customAmazonVariableFee'].value;
        const feePerArticle = this.calcForm.controls['customFeePerArticle'].value;
        const customFba = this.calcForm.controls['customFba'].value;
        const increasedFbaFee = this.calcForm.controls['increasedFbaFee'].value;
        const tax = this.tax;
        const buyingCost = this.calcForm.controls['buyingCost'].value;
        const otherCost = this.calcForm.controls['otherCost'].value;

        this.grossMargin = customSellingPrice - amazonSalesFee - amazonVariableFee - feePerArticle - customFba - increasedFbaFee - tax - buyingCost - otherCost;
    }

    calculateResultingBid() {
        const assumedConversionRate = this.calcForm.controls['conversionRate'].value;
        this.resultingBid = this.grossMargin * assumedConversionRate / 100;
    }

    keywordsData = [];

    addKeyword(data) {
        const reqData = {
            keywords: [
                {
                    keyword: data.keyword,
                    marketplace: this.campaignForm.controls['marketplace'].value
                }
            ]
        };
        this.campaignsService.getKeywords(reqData).subscribe(res => {
            this.keywordsData = [...res['keywords'], ...this.keywordsData];
            this.keywordForm.reset();
        }, error => {
            this.notificationService.smallBox({
                content: error,
                color: '#a90329',
                timeout: 4000,
                icon: 'fa fa-warning shake animated'
            });
        })
    }

    competitorsData = [];

    addCompetitor(data) {
        const reqData = {
            asin: data.asin,
            marketplace: this.campaignForm.controls['marketplace'].value,

            pagination: {
                page: 1,
                size: 100
            }
        };
        this.campaignsService.getCompetitors(reqData).subscribe(res => {
            this.competitorsData = [...res['competitors'], ...this.competitorsData];
            this.competitorsForm.reset();
        }, error => {
            this.notificationService.smallBox({
                content: error,
                color: '#a90329',
                timeout: 4000,
                icon: 'fa fa-warning shake animated'
            });
        })
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
            if (Object.keys(value).some(it => value[it] !== this.lastValue[it])) {
                // change detected
                this.steps.find(it => it.key === 'step1').valid = this.campaignForm.controls['type'].valid;
                this.steps.find(it => it.key === 'step2').valid = this.campaignForm.controls['name'].valid &&
                    this.campaignForm.controls['budget'].valid && this.campaignForm.controls['asin'].valid &&
                    this.campaignForm.controls['skus'].valid;
                this.steps.find(it => it.key === 'step3').valid = true;
                this.steps.find(it => it.key === 'step4').valid = true;
                this.steps.find(it => it.key === 'step5').valid = true;

                this.lastValue = Object.assign({}, value)
            }
        }
    }

    ngOnDestroy() {
        this.merchantSubscription.unsubscribe();
    }

}
