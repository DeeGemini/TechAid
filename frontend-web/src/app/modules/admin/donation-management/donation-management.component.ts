import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  deviceType: string;
  quantity: number;
  submittedDate: Date;
  status: string;
  // Add other relevant donation properties
}

@Component({
  selector: 'app-donation-management',
  templateUrl: './donation-management.component.html',
  styleUrls: ['./donation-management.component.scss']
})
export class DonationManagementComponent implements OnInit {
  donations: Donation[] = [];
  loading = false;
  errorMessage = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadDonations();
  }

  loadDonations(): void {
    this.loading = true;
    this.adminService.getAllDonations()
      .subscribe({
        next: (donations) => {
          this.donations = donations;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load donations.';
          console.error('Error loading donations:', error);
          this.loading = false;
        }
      });
  }

  viewDonationDetails(donationId: string): void {
    // Implement navigation or modal to show detailed donation information
    console.log('View details for donation:', donationId);
  }

  updateDonationStatus(donationId: string, newStatus: string): void {
    this.adminService.updateDonationStatus(donationId, newStatus)
      .subscribe({
        next: (response) => {
          console.log(`Donation ${donationId} status updated to:`, newStatus, response);
          // Optionally provide feedback to the user
        },
        error: (error) => {
          console.error(`Error updating donation ${donationId} status:`, error);
          // Optionally display an error message
          // Revert the select value in case of an error
          const donation = this.donations.find(d => d.id === donationId);
          if (donation) {
            donation.status = this.getOriginalStatus(donationId) || 'Unknown'; // Provide a fallback value
          }
        }
      });
  }

  // Helper function to keep track of the original status before a change
  private getOriginalStatus(donationId: string): string | undefined {
    const donation = this.donations.find(d => d.id === donationId);
    return donation ? donation.status : undefined;
  }
}