import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  isOpenFilter = false;
  constructor() { }

  ngOnInit() {
  }

  openFilter() {
    this.isOpenFilter = !this.isOpenFilter;
  };
}
