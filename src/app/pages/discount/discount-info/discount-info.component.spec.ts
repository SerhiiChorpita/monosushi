import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountInfoComponent } from './discount-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('DiscountInfoComponent', () => {
  let component: DiscountInfoComponent;
  let fixture: ComponentFixture<DiscountInfoComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountInfoComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountInfoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));

    fixture.detectChanges();
    component.discount.name = 'user';
  });

  it('should create discount', () => {

    expect(component).toBeTruthy();
  });
});
