import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from 'src/app/shared/interface/account/userData.interface';
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

  public authForm!: FormGroup;
  public adressForm!: FormGroup;

  public comment = false;
  public commentKitchen = false;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.scrollToTop();
    this.loadBasket();
    this.updateBasket();
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

  productCount(product: IProductResponse, value: boolean): void {
    if (value && product.count < 100) {
      ++product.count
    } else if (!value && product.count > 1) {
      --product.count
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
