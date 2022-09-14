import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BSGridListItem } from './bs-grid-list-item';

describe('BSGridListItem', () => {
  let component: BSGridListItem;
  let fixture: ComponentFixture<BSGridListItem>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BSGridListItem ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BSGridListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
