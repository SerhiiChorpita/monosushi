import { ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthDialogComponent ],
      imports:[
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers:[
        { provide: ToastrService, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
  });

  it(`should call the loginUser method`,fakeAsync (() => {
    spyOn(component, 'loginUser');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.loginUser).toHaveBeenCalledTimes(1)
  }));

  it(`should call the RegisterUser method`,fakeAsync (() => {
    component.changeIsLogin();
    spyOn(component, 'registerUser');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.registerUser).toHaveBeenCalledTimes(1)
  }));

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

  it('isLogined should be true', () => {
    component.changeIsLogin();
    expect(component.isLogin).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
