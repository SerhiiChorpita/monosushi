import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IProductResponse } from 'src/app/shared/interface/products/products';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public basket: Array<IProductResponse> = [];
  public total: number = 0;
  public countArticle: number = 0;

  public comment = false;
  public commentKitchen = false;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.scrollToTop();
    this.loadBasket();
    this.updateBasket();
  }

  allBasketsData(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBasket.next(true);
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string)
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponse) =>
      total + prod.count * prod.price, 0)
    this.countArticle = this.basket.reduce((countArticle: number, prod: IProductResponse) =>
      countArticle + prod.count, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  deleteFromBasket(index: number): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    basket.splice(index, 1)
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value && product.count < 100) {
      ++product.count
      this.allBasketsData();
    } else if (!value && product.count > 1) {
      --product.count
      this.allBasketsData();
    }
  }

  commentChange(): void {
    this.comment = !this.comment;
  }
  commentKitchenChange(): void {
    this.commentKitchen = !this.commentKitchen;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
