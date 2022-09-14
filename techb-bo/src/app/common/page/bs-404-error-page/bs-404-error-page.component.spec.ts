import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BS404ErrorPageComponent } from './bs-404-error-page.component';

describe('BS404ErrorPageComponent', () => {
  let component: BS404ErrorPageComponent;
  let fixture: ComponentFixture<BS404ErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BS404ErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BS404ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
