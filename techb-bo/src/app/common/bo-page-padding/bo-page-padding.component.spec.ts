import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BOPagePaddingComponent } from './bo-page-padding.component';

describe('BOPagePaddingComponent', () => {
  let component: BOPagePaddingComponent;
  let fixture: ComponentFixture<BOPagePaddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BOPagePaddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BOPagePaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
