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
  showFilter = false;
  productFilterForm: any;

  constructor(
    private researchService: ResearchService,
    private fb: FormBuilder
  ) {
    this.productFilterForm = this.fb.group({
      'asin': '',
      'upc': '',
      'title': '',
      'brand': '',
      'seller': '',
      'available': '',
      'marketPlace': '',
      'category': '',
      'prime': '',
      'sponsor': '',
      'boybox': '',
      'type': '',
      'competitor': '',
      'offeringPrime': '',
      'bsr': '',
      'price': '',
      'optimization': '',
      'rating': '',
      'review': '',
    });
  }

  ngOnInit() {
    this.researchService.getResearchProducts().subscribe(res => {
      console.log(res);
    });

    this.marketplaces = this.researchService.getMarketplaces();

    if (this.marketplaces) {
      this.filters = {
        marketplace: this.marketplaces[0].id
      };

      // this.productFilterForm.setValue({
      //   marketplaces: this.marketplaces
      // })
    }
  }

  openFilter() {
    this.showFilter = !this.showFilter;
  };

  applyFilter(formValue) {
    console.log(formValue);
  }

  validateTagsInput(chip, tagName) {
    console.log(chip, tagName);
    // const sku = chip.value;
    // const prevSkus = this.campaignForm.controls['skus'].value;
    //
    // const marketplace = this.campaignForm.controls['marketplace'].value;
    // const asin = this.campaignForm.controls['asin'].value;
    //
    // this.campaignsService.checkSku({skus: [{sku, marketplace, asin}]})
    //   .subscribe(() => {
    //     this.campaignForm.controls['skus'].setValue(prevSkus);
    //   }, (error) => {
    //     this.notificationService.smallBox({
    //       content: error,
    //       color: "#a90329",
    //       timeout: 4000,
    //       icon: "fa fa-warning shake animated"
    //     });
    //     prevSkus.pop(); // delete newly added sku
    //     this.campaignForm.controls['skus'].setValue(prevSkus);
    //   })
  }
}
