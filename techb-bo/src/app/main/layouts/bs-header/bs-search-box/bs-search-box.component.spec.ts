import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BSSearchBoxComponent } from './bs-search-box.component';

describe('BSSearchBoxComponent', () => {
  let component: BSSearchBoxComponent;
  let fixture: ComponentFixture<BSSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BSSearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BSSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
