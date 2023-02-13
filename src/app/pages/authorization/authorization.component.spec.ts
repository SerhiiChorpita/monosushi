import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { DebugElement } from '@angular/core';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationComponent ],
      imports:[
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers:[
        { provide: ToastrService, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form should be invalid', fakeAsync(()=>{
    component.authForm.controls['email'].setValue('')
    component.authForm.controls['password'].setValue('');
    expect(component.authForm.valid).toBeFalse();
  }))

  it('form should be valid', fakeAsync(()=>{
    component.authForm.controls['email'].setValue('user@gmail.com')
    component.authForm.controls['password'].setValue('qwerty123');
    expect(component.authForm.valid).toBeTruthy();
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
