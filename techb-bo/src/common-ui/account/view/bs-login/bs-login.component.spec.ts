import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BSLoginComponent } from './bs-login.component';

describe('LoginComponent', () => {
  let component: BSLoginComponent;
  let fixture: ComponentFixture<BSLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BSLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BSLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
