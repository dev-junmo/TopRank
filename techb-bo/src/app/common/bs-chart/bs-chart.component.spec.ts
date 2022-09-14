import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsChartComponent } from './bs-chart.component';

describe('BsChartComponent', () => {
  let component: BsChartComponent;
  let fixture: ComponentFixture<BsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
