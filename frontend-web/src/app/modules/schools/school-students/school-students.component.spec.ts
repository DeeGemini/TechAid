import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentsComponent } from './school-students.component';

describe('SchoolStudentsComponent', () => {
  let component: SchoolStudentsComponent;
  let fixture: ComponentFixture<SchoolStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolStudentsComponent]
    });
    fixture = TestBed.createComponent(SchoolStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
