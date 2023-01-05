import { TestBed } from '@angular/core/testing';

import { DiscountService } from '../discount/discount.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CategoryService} from "../category/category.service";
import {ICategoryResponse} from "../../interface/category/category";
import {IDiscountResponse} from "../../interface/disount/discount";

describe('DiscountService', () => {
  let service: DiscountService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [DiscountService]
    });
    service = TestBed.inject(DiscountService);
    httpTestingController = TestBed.get(
      HttpTestingController
    )
  });
  it('test HttpClient.get', () => {
    const data:Array<IDiscountResponse> = [{
      id:1,
      name:'test_name',
      date: 'test_date',
      header: 'test_header',
      description: 'test_description',
      imagePath:'test_imagePath'
    }]
    service
      .getAll()
      .subscribe((response) => expect(response).toBe(data))
    const req = httpTestingController.expectOne('http://localhost:3000/discounts')
    expect(req.request.method).toBe('GET')
    req.flush(data)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
