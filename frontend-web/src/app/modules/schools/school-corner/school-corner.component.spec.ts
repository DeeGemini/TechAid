import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCornerComponent } from './school-corner.component';

describe('SchoolCornerComponent', () => {
  let component: SchoolCornerComponent;
  let fixture: ComponentFixture<SchoolCornerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolCornerComponent]
    });
    fixture = TestBed.createComponent(SchoolCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
