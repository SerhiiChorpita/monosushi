import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountComponent } from './admin-discount.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountComponent ],
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers:[
        { provide: ToastrService, useValue: {} },
        { provide: Storage, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
