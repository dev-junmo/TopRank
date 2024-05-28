import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSideComponent } from './setup-side.component';

describe('BoardSideComponent', () => {
  let component: SetupSideComponent;
  let fixture: ComponentFixture<SetupSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
