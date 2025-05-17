import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDonationFormComponent } from './device-donation-form.component';

describe('DeviceDonationFormComponent', () => {
  let component: DeviceDonationFormComponent;
  let fixture: ComponentFixture<DeviceDonationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceDonationFormComponent]
    });
    fixture = TestBed.createComponent(DeviceDonationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
