import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IDiscountResponse } from '../../interface/disount/discount';
import { DiscountService } from './discount.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountResolver implements Resolve<IDiscountResponse> {

  constructor(private discountService: DiscountService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.discountService.getOneFirebase(String(route.paramMap.get('id')))
  }
}
