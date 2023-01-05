import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeWillCallComponent } from './we-will-call.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('WeWillCallComponent', () => {
  let component: WeWillCallComponent;
  let fixture: ComponentFixture<WeWillCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeWillCallComponent ],
      imports:[
        MatDialogModule,
        ReactiveFormsModule
      ],
      providers:[
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeWillCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
