import { Component, OnInit } from '@angular/core';

import { ResearchService } from '../../../core/services/ResearchService/research.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  isOpenFilter = false;
  constructor(
    private researchService: ResearchService
  ) { }

  ngOnInit() {
    // this.researchService.getResearchProducts().subscribe(res => {
    //   console.log(res);
    // })
  }

  openFilter() {
    this.isOpenFilter = !this.isOpenFilter;
  };
}
