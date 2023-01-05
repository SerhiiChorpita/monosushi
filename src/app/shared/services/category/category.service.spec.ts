import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICategoryResponse } from '../../interface/category/category';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.get(
      HttpTestingController
    )
  });

  it('test HttpClient.get', () => {
    const data:Array<ICategoryResponse> = [{
      id:1,
      name:'test_name',
      path: 'test_path',
      imagePath:'test_imagePath'
    }]
    service
      .getAll()
      .subscribe((response) => expect(response).toBe(data))
    const req = httpTestingController.expectOne('http://localhost:3000/category')
    expect(req.request.method).toBe('GET')
    req.flush(data)
  })

  afterEach(() => httpTestingController.verify())

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
