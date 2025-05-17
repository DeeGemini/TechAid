import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHubsComponent } from './manage-hubs.component';

describe('ManageHubsComponent', () => {
  let component: ManageHubsComponent;
  let fixture: ComponentFixture<ManageHubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageHubsComponent]
    });
    fixture = TestBed.createComponent(ManageHubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
