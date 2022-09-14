import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmHeaderComponent } from './crm-header.component';

describe('CrmHeaderComponent', () => {
  let component: CrmHeaderComponent;
  let fixture: ComponentFixture<CrmHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
