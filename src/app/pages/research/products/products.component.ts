import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  isNewProduct = false;
  constructor() { }

  ngOnInit() {
    console.log('products component');
  }

  newProduct() {
    this.isNewProduct = !this.isNewProduct;
  };
}
