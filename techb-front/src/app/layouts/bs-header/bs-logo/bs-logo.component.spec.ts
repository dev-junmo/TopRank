import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsLogoComponent } from './bs-logo.component';

describe('BsLogoComponent', () => {
  let component: BsLogoComponent;
  let fixture: ComponentFixture<BsLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
