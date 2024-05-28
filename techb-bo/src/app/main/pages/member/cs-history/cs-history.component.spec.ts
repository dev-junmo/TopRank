import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsHistoryComponent } from './cs-history.component';

describe('CsHistoryComponent', () => {
  let component: CsHistoryComponent;
  let fixture: ComponentFixture<CsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
