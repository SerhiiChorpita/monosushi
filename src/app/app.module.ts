import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { RollsComponent } from './pages/rolls/rolls.component';
import { SetComponent } from './pages/set/set.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { SaucesComponent } from './pages/sauces/sauces.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { AdminComponent } from './admin/admin.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfferContractComponent } from './pages/offer-contract/offer-contract.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { ToastrModule } from 'ngx-toastr';

import { GoogleMapsModule } from '@angular/google-maps';
import { ProductInfoComponent } from './pages/product-info/product-info.component';

import { AccountComponent } from './account/account.component';
import { UserHistoryComponent } from './account/user-history/user-history.component';
import { UserPasswordComponent } from './account/user-password/user-password.component';
import { UserComponent } from './account/user/user.component';
import { SharedModule } from './shared/shared.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { CheckoutBasketComponent } from './pages/checkout-basket/checkout-basket.component';
import { WeWillCallComponent } from './pages/we-will-call/we-will-call.component';
import { AddressComponent } from './pages/address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DiscountComponent,
    ProductComponent,
    RollsComponent,
    SetComponent,
    DrinksComponent,
    SaucesComponent,
    AboutUsComponent,
    CheckoutComponent,
    AdminComponent,
    AdminDiscountComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrdersComponent,
    DiscountInfoComponent,
    OfferContractComponent,
    DeliveryAndPaymentComponent,
    ProductInfoComponent,
    AccountComponent,
    UserHistoryComponent,
    UserPasswordComponent,
    UserComponent,
    AuthDialogComponent,
    AuthorizationComponent,
    CheckoutBasketComponent,
    WeWillCallComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbModule,
    GoogleMapsModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }