import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../../shared/utils/notification.service';
import { ResearchService } from '../../../core/services/ResearchService/research.service';
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
    'available': 'empty',
    'marketplace': '',
    'categories': '',
    'prime': 'empty',
    'advertising.spa': 'empty',
    'buybox': 'empty',
    'type': 'empty',
    'competitors': {
      'min': 1,
      'max': 999999
    },
    'competitors.prime': {
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

  rangeSliderFilterObj = {
    'competitors': {
      'min': 1,
      'max': 999999
    },
    'competitors.prime': {
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
  filters: any;
  marketplaces: any[];
  showFilter = false;
  productFilterForm: FormGroup;
  quickFilterForm: FormGroup;
  sliderLabel: any;
  sliderToolTipEnabled: any;

  constructor(
    private researchService: ResearchService,
    private fb: FormBuilder,
    private notificationService: NotificationService
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
    this.marketplaces = this.researchService.getMarketplaces();

    let selectedMarketPlace = '';
    if (this.marketplaces) {
      this.filters = {
        marketplace: this.marketplaces[0].id
      };
      selectedMarketPlace = this.marketplaces[0].name;
    }

    this.quickFilterForm = this.fb.group({
      'amalyze.generic': ['', Validators.required]
    });

    this.productFilterForm = this.fb.group({
      'asins': '',
      'upcs': '',
      'title': '',
      'brands': '',
      'merchants': '',
      'available': 'empty',
      'marketplace': selectedMarketPlace,
      'categories': '',
      'prime': 'empty',
      'advertising.spa': 'empty',
      'buybox': 'empty',
      'type': 'empty'
    });
  }

  openFilter() {
    this.showFilter = !this.showFilter;
  };

  applyFilter() {
    const mkId = this.getMarketPlaceIdbyName(this.productFilterForm.value.marketplace);
    this.filters = {};

    if (this.quickFilterForm.value['amalyze.generic']) {
      this.filters['amalyze.generic'] = this.quickFilterForm.value['amalyze.generic'];
    }

    Object.keys(this.productFilterForm.value).forEach((key) => {
      if (this.productFilterForm.value[key].length && this.productFilterForm.value[key] !== this.defaultFilterValue[key]) {
        this.filters[key] = this.productFilterForm.value[key];
      }
    });

    Object.keys(this.rangeSliderFilterObj).forEach((key) => {
      if (JSON.stringify(this.rangeSliderFilterObj[key]) !== JSON.stringify(this.defaultFilterValue[key])) {
        this.filters[key] = this.rangeSliderFilterObj[key];
      }
    });
    this.filters.marketplace = mkId;
  }

  getMarketPlaceIdbyName(name): string {
    const matchedMarketPlace = this.marketplaces.find(function (marketplace) {
      return marketplace.name === name;
    });
    return matchedMarketPlace.id;
  }
}
