import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/core/services/user-profile/user-profile.service';

interface Hub {
  id: string;
  name?: string;
  location: string;
  type: 'hotspot' | 'device_hub';
  isActive: boolean;
  // Add other relevant hub properties
}

@Component({
  selector: 'app-manage-hubs',
  templateUrl: './manage-hubs.component.html',
  styleUrls: ['./manage-hubs.component.scss']
})
export class ManageHubsComponent implements OnInit {
  hubs: Hub[] = [];
  loading = false;
  errorMessage = '';

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.loadMyHubs();
  }

  loadMyHubs(): void {
    this.loading = true;
    this.userProfileService.getUserHubs()
      .subscribe({
        next: (hubs) => {
          this.hubs = hubs;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load your hubs.';
          console.error('Error loading user hubs:', error);
          this.loading = false;
        }
      });
  }

  viewHubDetails(hubId: string): void {
    // Implement navigation to view hub details
    console.log('View details for hub:', hubId);
  }

  toggleHubStatus(hubId: string, isActive: boolean): void {
    const action = isActive ? 'deactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} this hub?`)) {
      this.userProfileService.updateUserHubStatus(hubId, !isActive)
        .subscribe({
          next: (response) => {
            console.log(`Hub ${action}d:`, response);
            this.loadMyHubs();
          },
          error: (error) => {
            console.error(`Error ${action}ing hub:`, error);
            // Optionally display error message
          }
        });
    }
  }

  deleteHub(hubId: string): void {
    if (confirm('Are you sure you want to delete this hub?')) {
      this.userProfileService.deleteUserHub(hubId)
        .subscribe({
          next: (response) => {
            console.log('Hub deleted:', response);
            this.loadMyHubs();
          },
          error: (error) => {
            console.error('Error deleting hub:', error);
            // Optionally display error message
          }
        });
    }
  }
}