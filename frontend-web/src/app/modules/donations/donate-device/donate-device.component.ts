import { Component } from '@angular/core';
import { DonationService } from 'src/app/core/services/donation/donation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donate-device',
  templateUrl: './donate-device.component.html',
  styleUrls: ['./donate-device.component.scss']
})
export class DonateDeviceComponent {
  donationData = {
    donorName: '',
    donorEmail: '',
    deviceType: '',
    quantity: null as number | null,
    condition: '',
    notes: ''
  };
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private donationService: DonationService, private router: Router) { }

  submitDonation(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.donationService.submitDonation(this.donationData)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Thank you for your generous donation!';
          console.log('Donation submitted successfully:', response);
          this.router.navigate(['/donate/thank-you']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to submit donation. Please try again.';
          console.error('Donation submission error:', error);
          // Handle specific error messages from the backend
        }
      });
  }
}