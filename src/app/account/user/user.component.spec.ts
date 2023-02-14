import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: ToastrService, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));

    fixture.detectChanges();
  });

  it('should create currentUser in checkData', () => {

    component.currentUser = {
      firstName: 'firstName',
      lastName: 'lastName',
      phoneNumber: '321654987',
      email: 'firstName@gmail.com'
    }

    expect(component.currentUser).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
