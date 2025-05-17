import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolVerificationComponent } from './school-verification.component';

describe('SchoolVerificationComponent', () => {
  let component: SchoolVerificationComponent;
  let fixture: ComponentFixture<SchoolVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolVerificationComponent]
    });
    fixture = TestBed.createComponent(SchoolVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
