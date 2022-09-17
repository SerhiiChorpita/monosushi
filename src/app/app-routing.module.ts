import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { RollsComponent } from './pages/rolls/rolls.component';
import { SetComponent } from './pages/set/set.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { SaucesComponent } from './pages/sauces/sauces.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OfferContractComponent } from './pages/offer-contract/offer-contract.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { DiscountResolver } from './shared/services/discount/discount.resolver';

import { AdminComponent } from './admin/admin.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { AccountComponent } from './account/account.component';
import { UserHistoryComponent } from './account/user-history/user-history.component';
import { UserPasswordComponent } from './account/user-password/user-password.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { UserComponent } from './account/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  {
    path: 'discount/:id', component: DiscountInfoComponent,
    resolve: {
      discountInfo: DiscountResolver
    }
  },
  {
    path: 'product/:category', component: ProductComponent, children: [
      { path: 'rolls', component: RollsComponent },
      { path: 'set', component: SetComponent },
      { path: 'drinks', component: DrinksComponent },
      { path: 'sauces', component: SaucesComponent }
    ]
  },
  {
    path: 'product/:category/:id', component: ProductInfoComponent,
    resolve: {
      productInfo: ProductInfoResolver
    }
  },
  { path: 'delivery-and-payment', component: DeliveryAndPaymentComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'offer-contract', component: OfferContractComponent },
  {
    path: 'account', component: AccountComponent, children: [
      { path: 'office', component: UserComponent },
      { path: 'history', component: UserHistoryComponent },
      { path: 'password', component: UserPasswordComponent },
    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
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