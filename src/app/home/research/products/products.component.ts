import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as _ from 'lodash';

import { ProductsService } from './services/products.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  url = environment.baseUrl + '/research.products.get';
  schema = [
    {
      name: 'preview',
      display: 'Preview',
      path: '$.amazon.preview.medium'
    }, {
      name: 'asin',
      display: 'ASIN',
      path: '$.amazon.asin'
    }, {
      name: 'upc',
      display: 'UPC',
      path: '$.amazon.upc'
    }, {
      name: 'spa',
      display: 'SPA',
      path: '$.amalyze.keywords.advertising.spa.count'
    }, {
      name: 'seo',
      display: 'SEO',
      path: '$.amalyze.seo.score'
    }, {
      name: 'as',
      display: 'AS',
      path: '$.amalyze.amascore.score'
    }, {
      name: 'rating',
      display: 'Rating',
      path: '$.amazon.reviews.score'
    }, {
      name: 'title',
      display: 'Title',
      path: '$.amazon.title'
    }, {
      name: 'brand',
      display: 'Brand',
      path: '$.amazon.brand'
    }, {
      name: 'buybox',
      display: 'Buybox',
      path: '$.amazon.buybox.merchant.name'
    }, {
      name: 'category',
      display: 'Category',
      path: '$.amazon.category.name'
    }, {
      name: 'size',
      display: 'Size',
      path: '$.amazon.size'
    }, {
      name: 'color',
      display: 'Color',
      path: '$.amazon.color'
    }, {
      name: 'pieces',
      display: 'Pieces',
      path: ''
    }, {
      name: 'sales_30',
      display: 'Sales (30 days)',
      path: ''
    }, {
      name: 'sales_7',
      display: 'Sales (7 days)',
      path: ''
    }, {
      name: 'sales_1',
      display: 'Sales (1 days)',
      path: ''
    }, {
      name: 'revenue_30',
      display: 'Revenue (30 days)',
      path: ''
    }, {
      name: 'revenue_7',
      display: 'Revenue (7 days)',
      path: ''
    }, {
      name: 'revenue_1',
      display: 'Revenue (1 days)',
      path: ''
    }, {
      name: 'rrp',
      display: 'RRP',
      path: ''
    }, {
      name: 'price',
      display: 'Price',
      path: ''
    }, {
      name: 'prime',
      display: 'Prime',
      path: ''
    }, {
      name: 'stock',
      display: 'Stock',
      path: ''
    }, {
      name: 'keywords',
      display: '# Keywords',
      path: '$.amalyze.keywords.organic.count'
    }, {
      name: 'position',
      display: '∅ Position',
      path: '$.amalyze.keywords.organic.pos'
    }, {
      name: 'weight',
      display: 'Weight',
      path: ''
    }, {
      name: 'size1',
      display: 'Size',
      path: ''
    }
  ];
  defaultFilterValue = {
    'asins': '',
    'upcs': '',
    'title': '',
    'brands': '',
    'merchants': '',
    'available': '',
    'marketplace': '',
    'categories': '',
    'prime': '',
    'advertising.spa': '',
    'buybox': '',
    'type': '',
    'competitors': {
      'min': 1,
      'max': 999999
    },
    'competitors_prime': {
      'min': 1,
      'max': 999999
    },
    'bsr': {
      'min': 1,
      'max': 999999
    },
    'price': {
      'min': 0,
      'max': 999999
    },
    'optimization': {
      'min': 0,
      'max': 100
    },
    'rating': {
      'min': 0,
      'max': 5
    },
    'reviews': {
      'min': 0,
      'max': 5
    }
  };

  validRangeValues = [
    150, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 1750, 2000, 2250, 2500,
    3000, 3500, 4000, 4500, 5000, 7500, 10000, 15000, 20000, 25000, 50000, 75000, 100000, 250000, 500000, 750000, 999999
  ];

  filters: any;
  marketplaces: any[];
  showFilter = false;
  productFilterForm: FormGroup;
  quickFilterForm: FormGroup;
  sliderLabel: any;
  sliderToolTipEnabled: any;
  genericFilterEnabled = false;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {
    this.sliderLabel = {
      visible: true,
      position: 'top'
    };
    this.sliderToolTipEnabled = {
      enabled: true
    };
  }

  ngOnInit() {
    this.marketplaces = this.productsService.getMarketplaces();

    let selectedMarketPlace = '';
    if (this.marketplaces) {
      this.filters = {
        marketplace: this.marketplaces[0].id
      };
      selectedMarketPlace = this.marketplaces[0].name;
    }

    this.productFilterForm = this.fb.group({
      asins: '',
      upcs: '',
      title: '',
      brands: '',
      merchants: '',
      available: '',
      marketplace: selectedMarketPlace,
      categories: '',
      prime: '',
      'advertising.spa': '',
      buybox: '',
      type: '',
      competitors: this.fb.group({
        min: [1, Validators.required],
        max: [999999, Validators.required]
      }),
      competitors_prime: this.fb.group({
        min: [1, Validators.required],
        max: [999999, Validators.required]
      }),
      bsr: this.fb.group({
        min: [1, Validators.required],
        max: [999999, Validators.required]
      }),
      price: this.fb.group({
        min: [0, Validators.required],
        max: [999999, Validators.required]
      }),
      optimization: this.fb.group({
        min: [0, Validators.required],
        max: [100, Validators.required]
      }),
      rating: this.fb.group({
        min: [0, Validators.required],
        max: [5, Validators.required]
      }),
      reviews: this.fb.group({
        min: [0, Validators.required],
        max: [5, Validators.required]
      })
    });

    this.quickFilterForm = this.fb.group({
      'amalyze.generic': ['', [Validators.required]]
    });

    this.defaultFilterValue.marketplace = selectedMarketPlace;

    this.onChangeGenericFilter();
  }

  onChangeGenericFilter() {
    this.productFilterForm.valueChanges.subscribe(val => {
      this.isAvailableGenericFilter();
    });

    this.quickFilterForm.valueChanges.subscribe(val => {
      this.isAvailableGenericFilter();
    })
  }

  isAvailableGenericFilter() {
    if (_.isEqual(this.productFilterForm.value, this.defaultFilterValue)) {
      this.genericFilterEnabled = true;
    } else {
      this.genericFilterEnabled = false;
    }
  }

  openFilter() {
    this.showFilter = !this.showFilter;
  };

  applyFilter() {
    const mkId = this.getMarketPlaceIdbyName(this.productFilterForm.value.marketplace);
    this.filters = {};

    Object.keys(this.productFilterForm.value).forEach((key) => {
      if (Array.isArray(this.productFilterForm.value[key]) && this.productFilterForm.value[key].length === 0) {
        this.productFilterForm.value[key] = '';
      }

      if (!_.isEqual(this.productFilterForm.value[key], this.defaultFilterValue[key])) {
        this.filters[key] = this.productFilterForm.value[key];
      }
    });

    if (!_.isEqual(this.productFilterForm.value['competitors_prime'], this.defaultFilterValue['competitors_prime'])) {
      this.filters['competitors.prime'] = this.productFilterForm.value['competitors_prime'];
    }
    delete this.filters.competitors_prime;

    this.filters.marketplace = mkId;
  }

  getMarketPlaceIdbyName(name): string {
    const matchedMarketPlace = this.marketplaces.find(function (marketplace) {
      return marketplace.name === name;
    });
    return matchedMarketPlace.id;
  }

  onFilterChanged(event) {
    this.applyFilter();
  }

  applyGenericFilter() {
    const mkId = this.getMarketPlaceIdbyName(this.productFilterForm.value.marketplace);
    this.filters = {};

    this.filters.marketplace = mkId;
    if (this.quickFilterForm.value['amalyze.generic']) {
      this.filters['amalyze.generic'] = this.quickFilterForm.value['amalyze.generic'];
    }
  }

  validateRangeValue(control) {
    if (control.value.min > control.value.max) {
      control.setErrors({invalid: true});
    }

    if (!this.isValidRangeValue(control.controls.min)) {
      control.controls.min.setErrors({invalid: true});
    }

    if (!this.isValidRangeValue(control.controls.max)) {
      control.controls.max.setErrors({invalid: true});
    }
  }

  isValidRangeValue(control) {
    return (control.value >= 0 && control.value <= 100) || this.validRangeValues.indexOf(Number(control.value)) !== -1
  }
}
