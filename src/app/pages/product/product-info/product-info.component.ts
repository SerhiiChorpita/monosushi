import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interface/products/products';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  public currentProduct!: IProductResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.scrollToTop();
    if (this.activatedRoute){
    this.activatedRoute.data.subscribe(response => {
      if (response['discountInfo']){
        this.currentProduct = response['discountInfo']
      } else {
        this.currentProduct = {
          id: 1,
          category: {
            id: 1,
            name: 'string',
            path: 'string',
            imagePath: 'string'
          },
          path: {
            id: 1,
            name: 'string',
            path: 'string',
            imagePath: 'string'
          },
          name: 'string',
          ingredients: 'string',
          weight: 10,
          price: 10,
          imagePath: 'string',
          count: 10
        }
      }
    })
    }
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
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
