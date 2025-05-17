import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHotspotsComponent } from './school-hotspots.component';

describe('SchoolHotspotsComponent', () => {
  let component: SchoolHotspotsComponent;
  let fixture: ComponentFixture<SchoolHotspotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolHotspotsComponent]
    });
    fixture = TestBed.createComponent(SchoolHotspotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
