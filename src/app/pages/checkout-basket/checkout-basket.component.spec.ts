import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBasketComponent } from './checkout-basket.component';

describe('CheckoutBasketComponent', () => {
  let component: CheckoutBasketComponent;
  let fixture: ComponentFixture<CheckoutBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutBasketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
