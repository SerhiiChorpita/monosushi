import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBasketComponent } from './checkout-basket.component';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

describe('CheckoutBasketComponent', () => {
  let component: CheckoutBasketComponent;
  let fixture: ComponentFixture<CheckoutBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutBasketComponent ],
      imports:[
        MatDialogModule
      ],
    providers:[
      { provide: MatDialogRef, useValue: {} }
    ]
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
