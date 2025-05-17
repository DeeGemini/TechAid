import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDevicesComponent } from './school-devices.component';

describe('SchoolDevicesComponent', () => {
  let component: SchoolDevicesComponent;
  let fixture: ComponentFixture<SchoolDevicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolDevicesComponent]
    });
    fixture = TestBed.createComponent(SchoolDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
