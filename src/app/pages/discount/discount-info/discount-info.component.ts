import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interface/disount/discount';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {

  public discount: IDiscountResponse = {
    id: 1,
    date: 'string',
    name: 'string',
    header: 'string',
    description: 'string',
    imagePath: 'string'
  }

  constructor(
    private discountService: DiscountService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOneDiscount();
    this.activatedRoute.data.subscribe(response => {
      if (response['discountInfo']){
        this.discount = response['discountInfo']
      }
    })
  }

  getOneDiscount(): void {
    const DISCOUNT_ID = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.discountService.getOneFirebase(DISCOUNT_ID).subscribe(data => {
      if (data){
      this.discount = data as IDiscountResponse;
      }
    })
  }

}
