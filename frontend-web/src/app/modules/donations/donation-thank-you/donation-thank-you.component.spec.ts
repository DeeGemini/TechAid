import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationThankYouComponent } from './donation-thank-you.component';

describe('DonationThankYouComponent', () => {
  let component: DonationThankYouComponent;
  let fixture: ComponentFixture<DonationThankYouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonationThankYouComponent]
    });
    fixture = TestBed.createComponent(DonationThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
