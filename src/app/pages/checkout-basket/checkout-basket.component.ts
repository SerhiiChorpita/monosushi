import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// import { HeaderComponent } from 'src/app/components/header/header.component';
import { IProductResponse } from 'src/app/shared/interface/products/products';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkout-basket',
  templateUrl: './checkout-basket.component.html',
  styleUrls: ['./checkout-basket.component.scss']
})
export class CheckoutBasketComponent implements OnInit {
  public basket: Array<IProductResponse> = [];

  public total: number = 0;
  public countArticle: number = 0;

  constructor(
    private dialogRef: MatDialogRef<CheckoutBasketComponent>,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string)
    }
    this.getTotalPrice();
  }


  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  deleteFromBasket(index: number): void {
    // if (index > 1) {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    basket.splice(index, 1)
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);

    // } else if (index < 1) {
    //   localStorage.removeItem('basket');
    //   this.orderService.changeBasket.next(true);
    // }
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponse) =>
      total + prod.count * prod.price, 0)
    this.countArticle = this.basket.reduce((countArticle: number, prod: IProductResponse) =>
      countArticle + prod.count, 0)
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
  allBasketsData(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBasket.next(true);
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
