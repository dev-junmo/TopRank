import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSideConsultComponent } from './crm-side-consult.component';

describe('CrmHeaderComponent', () => {
  let component: CrmSideConsultComponent;
  let fixture: ComponentFixture<CrmSideConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmSideConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmSideConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
