import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { RollsComponent } from './rolls/rolls.component';
import { SetComponent } from './set/set.component';
import { SaucesComponent } from './sauces/sauces.component';
import { DrinksComponent } from './drinks/drinks.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductInfoComponent,
    RollsComponent,
    SetComponent,
    SaucesComponent,
    DrinksComponent
  ],
  exports: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
