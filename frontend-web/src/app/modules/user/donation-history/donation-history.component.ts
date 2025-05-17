import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/core/services/user-profile/user-profile.service';

interface Donation {
  id: string;
  deviceType: string;
  quantity: number;
  submittedDate: Date;
  status: string;
  // Add other relevant donation properties
}

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.scss']
})
export class DonationHistoryComponent implements OnInit {
  donations: Donation[] = [];
  loading = false;
  errorMessage = '';

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.loadDonationHistory();
  }

  loadDonationHistory(): void {
    this.loading = true;
    this.userProfileService.getUserDonations()
      .subscribe({
        next: (donations) => {
          this.donations = donations;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load donation history.';
          console.error('Error loading donation history:', error);
          this.loading = false;
        }
      });
  }
}