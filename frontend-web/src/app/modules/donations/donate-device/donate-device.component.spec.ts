import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateDeviceComponent } from './donate-device.component';

describe('DonateDeviceComponent', () => {
  let component: DonateDeviceComponent;
  let fixture: ComponentFixture<DonateDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonateDeviceComponent]
    });
    fixture = TestBed.createComponent(DonateDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
