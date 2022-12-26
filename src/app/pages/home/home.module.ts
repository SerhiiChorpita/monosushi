import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-ruoting.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import {ProductModule} from "../product/product.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ProductModule
  ]
})
export class HomeModule { }
