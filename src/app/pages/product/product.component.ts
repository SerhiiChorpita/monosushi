import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interface/products/products';
import { OrderService } from 'src/app/shared/services/order/order.service';
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

  public productStorage: Array<IProductResponse> = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct() {
    this.productService.getAllFirebase().subscribe(data => {
      this.productStorage = data as IProductResponse[];
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value && product.count < 100) {
      ++product.count
    } else if (!value && product.count > 1) {
      --product.count
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
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
