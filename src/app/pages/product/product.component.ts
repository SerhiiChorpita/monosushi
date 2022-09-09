import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interface/products/products';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public select1 = true;
  public select2 = false;
  public select3 = false;
  public select4 = false;
  public select5 = false;
  public select6 = false;
  public select7 = false;

  public inc = false;

  public productStorage: Array<IProductResponse> = [];

  constructor(
    private productService: ProductService,

  ) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct() {
    this.productService.getAll().subscribe(data => {
      this.productStorage = data;
      console.log(this.productStorage);

    })
  }

  tableSelect(): void {
    this.select1 = false;
    this.select2 = false;
    this.select3 = false;
    this.select4 = false;
    this.select5 = false;
    this.select6 = false;
    this.select7 = false;
  }
}
