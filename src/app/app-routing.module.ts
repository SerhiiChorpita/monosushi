import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { RollsComponent } from './pages/rolls/rolls.component';
import { SetComponent } from './pages/set/set.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { SaucesComponent } from './pages/sauces/sauces.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { AdminComponent } from './admin/admin.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { OfferContractComponent } from './pages/offer-contract/offer-contract.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'discount/:id', component: DiscountInfoComponent },
  {
    path: 'product', component: ProductComponent, children: [
      { path: 'rolls', component: RollsComponent },
      { path: 'set', component: SetComponent },
      { path: 'drinks', component: DrinksComponent },
      { path: 'sauces', component: SaucesComponent }
    ]
  },
  { path: 'delivery-and-payment', component: DeliveryAndPaymentComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'offer-contract', component: OfferContractComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'discount', component: AdminDiscountComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: '', pathMatch: 'full', redirectTo: 'discount' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class GoogleMapsDemoModule { }