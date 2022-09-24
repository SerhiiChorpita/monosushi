import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IProductResponse } from 'src/app/shared/interface/products/products';

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
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CheckoutBasketComponent>
  ) { }

  ngOnInit(): void {
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
    } else if (!value && product.count > 1) {
      --product.count
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
