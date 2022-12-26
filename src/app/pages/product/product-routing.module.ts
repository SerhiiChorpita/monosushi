import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProductComponent} from "./product.component";
import {RollsComponent} from "./rolls/rolls.component";
import {SetComponent} from "./set/set.component";
import {DrinksComponent} from "./drinks/drinks.component";
import {SaucesComponent} from "./sauces/sauces.component";
import {ProductInfoComponent} from "./product-info/product-info.component";
import {ProductInfoResolver} from "../../shared/services/product/product-info.resolver";

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'rolls',
    component: RollsComponent
  },
  {
    path: 'set',
    component: SetComponent
  },
  {
    path: 'drinks',
    component: DrinksComponent
  },
  {
    path: 'sauces',
    component: SaucesComponent
  },
  {
    path: ':id',
    component: ProductInfoComponent,
    resolve: {
      discountInfo: ProductInfoResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
