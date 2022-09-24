import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeWillCallComponent } from './we-will-call.component';

describe('WeWillCallComponent', () => {
  let component: WeWillCallComponent;
  let fixture: ComponentFixture<WeWillCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeWillCallComponent ]
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
