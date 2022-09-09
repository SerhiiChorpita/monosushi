import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interface/disount/discount';
import { DiscountService } from 'src/app/shared/services/disount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  public userDiscount: Array<IDiscountResponse> = [];

  constructor(
    private discountService: DiscountService
  ) { }

  ngOnInit(): void {
    this.getDiscount()
  }

  getDiscount(): void {
    this.discountService.getAll().subscribe(data => {
      this.userDiscount = data
    })
  }

}
