import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BSTopMenuComponent } from './bs-top-menu.component';

describe('BSTopMenuComponent', () => {
  let component: BSTopMenuComponent;
  let fixture: ComponentFixture<BSTopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BSTopMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BSTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
