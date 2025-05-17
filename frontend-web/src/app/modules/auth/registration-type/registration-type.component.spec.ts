import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationTypeComponent } from './registration-type.component';

describe('RegistrationTypeComponent', () => {
  let component: RegistrationTypeComponent;
  let fixture: ComponentFixture<RegistrationTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationTypeComponent]
    });
    fixture = TestBed.createComponent(RegistrationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
