import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferContractComponent } from './offer-contract.component';

describe('OfferContractComponent', () => {
  let component: OfferContractComponent;
  let fixture: ComponentFixture<OfferContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
