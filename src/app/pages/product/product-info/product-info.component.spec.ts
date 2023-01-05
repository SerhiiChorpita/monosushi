import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import {ICategoryResponse} from "../../../shared/interface/category/category";

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInfoComponent ],
      imports:[
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
  });

  it('should set "category"', () => {
    fixture.detectChanges();
    component.currentProduct = {
      id: 1,
      category: {
        id: 1,
        name: 'string',
        path: 'string',
        imagePath: 'string'
      },
      path: {
        id: 1,
        name: 'string',
        path: 'string',
        imagePath: 'string'
      },
      name: 'string',
      ingredients: 'string',
      weight: 10,
      price: 10,
      imagePath: 'string',
      count: 10
    }

    expect(component.currentProduct).toBeTruthy();
  });

});
