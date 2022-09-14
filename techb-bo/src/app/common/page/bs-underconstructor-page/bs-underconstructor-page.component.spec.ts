import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BSUnderconstructorPageComponent } from './bs-underconstructor-page.component';

describe('BSUnderconstructorPageComponent', () => {
  let component: BSUnderconstructorPageComponent;
  let fixture: ComponentFixture<BSUnderconstructorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BSUnderconstructorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BSUnderconstructorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
