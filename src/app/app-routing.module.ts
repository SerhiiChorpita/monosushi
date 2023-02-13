import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { OfferContractComponent } from './pages/offer-contract/offer-contract.component';

import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: ()=>import('./pages/home/home.module').then(m=>m.HomeModule)
  },
  {
    path: 'discount',
    loadChildren: ()=>import('./pages/discount/discount.module').then(m=>m.DiscountModule)
  },
  {
    path: 'product/:category',
    loadChildren: ()=>import('./pages/product/product.module').then(m=>m.ProductModule)
  },
  {
    path: 'delivery-and-payment',
    loadChildren: ()=>import('./pages/delivery-and-payment/delivery-and-payment.module').then(m=>m.DeliveryAndPaymentModule)
  },
  {
    path: 'about-us',
    loadChildren: ()=>import('./pages/about-us/about-us.module').then(m=>m.AboutUsModule)
  },
  {
    path: 'checkout',
    loadChildren: ()=>import('./pages/checkout/checkout.module').then(m=>m.CheckoutModule)
  },
  { path: 'offer-contract', component: OfferContractComponent },
  {
    path: 'auth',
    loadChildren: ()=>import('./pages/authorization/authorization-routing.module').then(m=>m.AuthorizationRoutingModule)
  },
  {
    path: 'address',
    loadChildren: ()=>import('./pages/address/address.module').then(m=>m.AddressModule)
  },
  {
    path: 'account',
    loadChildren: ()=>import('./account/account.module').then(m=>m.AccountModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: ()=>import('./admin/admin.module').then(m=>m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
