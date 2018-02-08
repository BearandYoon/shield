import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    //   name: 'pieces',
    //   display: 'Pieces',
    //   path: ''
    // }, {
    //   name: 'sales_30',
    //   display: 'Sales (30 days)',
    //   path: ''
    // }, {
    //   name: 'sales_7',
    //   display: 'Sales (7 days)',
    //   path: ''
    // }, {
    //   name: 'sales_1',
    //   display: 'Sales (1 days)',
    //   path: ''
    // }, {
    //   name: 'revenue_30',
    //   display: 'Revenue (30 days)',
    //   path: ''
    // }, {
    //   name: 'revenue_7',
    //   display: 'Revenue (7 days)',
    //   path: ''
    // }, {
    //   name: 'revenue_1',
    //   display: 'Revenue (1 days)',
    //   path: ''
    // }, {
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
  filters: any;
  marketplaces: any[];
  buyboxs: any[];
  showFilter = false;
  productFilterForm: any;
  sliderValues = {
    'competitor': 0,
    'offeringPrime': 0,
    'bsr': 0,
    'price': 0,
    'optimization': 0,
    'rating': 0,
    'review': 0,
  };

  constructor(
    private researchService: ResearchService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.researchService.getResearchProducts().subscribe(res => {
      console.log(res);
    });

    this.marketplaces = this.researchService.getMarketplaces();

    let selectedMarketPlace = '';
    if (this.marketplaces) {
      this.filters = {
        marketplace: this.marketplaces[0].id
      };
      selectedMarketPlace = this.marketplaces[0].name;
    }

    this.productFilterForm = this.fb.group({
      'asins': '',
      'upcs': '',
      'title': '',
      'brands': '',
      'merchants': '',
      'available': 'true',
      'marketplace': selectedMarketPlace,
      'categories': '',
      'prime': 'true',
      'advertising.spa': 'true',
      'buybox': 'true',
      'type': 'CHILD'
    });

    this.onFilterFormChanges();
  }

  openFilter() {
    this.showFilter = !this.showFilter;
  };

  onFilterFormChanges() {
    this.productFilterForm.valueChanges.subscribe(val => {
      this.applyFilter();
    })
  }

  onSliderChanged() {
    // this.applyFilter();
  }

  applyFilter() {
    const mkId = this.getMarketPlaceIdbyName(this.productFilterForm.value.marketplace);
    // this.filters = {
    //   ...this.productFilterForm.value,
    //   // ...this.sliderValues,
    //   marketplace: mkId
    // };

    this.filters = {
      asins: this.productFilterForm.value.asins,
      marketplace: mkId
    };

    console.log('=====', this.filters);
  }

  getMarketPlaceIdbyName(name): string {
    const matchedMarketPlace = this.marketplaces.find(function (marketplace) {
      return marketplace.name === name;
    });

    console.log(matchedMarketPlace);
    return matchedMarketPlace.id;
  }
}
