import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorDevicesComponent } from './donor-devices.component';

describe('DonorDevicesComponent', () => {
  let component: DonorDevicesComponent;
  let fixture: ComponentFixture<DonorDevicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorDevicesComponent]
    });
    fixture = TestBed.createComponent(DonorDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
