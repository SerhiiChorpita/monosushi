import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordComponent } from './user-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserPasswordComponent', () => {
  let component: UserPasswordComponent;
  let fixture: ComponentFixture<UserPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPasswordComponent ],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers:[
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
