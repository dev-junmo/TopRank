import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BSLogoComponent } from './bs-logo.component';

describe('BSLogoComponent', () => {
  let component: BSLogoComponent;
  let fixture: ComponentFixture<BSLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BSLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BSLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
