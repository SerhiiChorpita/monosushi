import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OfferContractComponent } from './pages/offer-contract/offer-contract.component';
import { CheckoutBasketComponent } from './pages/checkout-basket/checkout-basket.component';
import { WeWillCallComponent } from './pages/we-will-call/we-will-call.component';

import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthDialogComponent,
    OfferContractComponent,
    CheckoutBasketComponent,
    WeWillCallComponent,
    AuthorizationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    ToastrModule.forRoot({ positionClass: 'inline' }),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
