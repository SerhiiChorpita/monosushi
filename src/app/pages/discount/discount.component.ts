import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interface/disount/discount';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

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
    this.discountService.getAllFirebase().subscribe(data => {
      this.userDiscount = data as IDiscountResponse[];
    })
  }

}
