import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';

interface Hub {
  id: string;
  name?: string;
  location: string;
  type: 'hotspot' | 'device_hub';
  cost?: number;
  isActive: boolean;
  // Add other relevant hub properties
}

@Component({
  selector: 'app-hub-management',
  templateUrl: './hub-management.component.html',
  styleUrls: ['./hub-management.component.scss']
})
export class HubManagementComponent implements OnInit {
  hubs: Hub[] = [];
  loading = false;
  errorMessage = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadHubs();
  }

  loadHubs(): void {
    this.loading = true;
    this.adminService.getAllHubs()
      .subscribe({
        next: (hubs) => {
          this.hubs = hubs;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load hubs.';
          console.error('Error loading hubs:', error);
          this.loading = false;
        }
      });
  }

  viewHubDetails(hubId: string): void {
    // Implement navigation or modal to show detailed hub information
    console.log('View details for hub:', hubId);
  }

  toggleHubStatus(hubId: string, isActive: boolean): void {
    const action = isActive ? 'deactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} this hub?`)) {
      this.adminService.updateHubStatus(hubId, !isActive)
        .subscribe({
          next: (response) => {
            console.log(`Hub ${action}d:`, response);
            this.loadHubs(); // Reload the hub list
          },
          error: (error) => {
            console.error(`Error ${action}ing hub:`, error);
            // Optionally display an error message
          }
        });
    }
  }

  deleteHub(hubId: string): void {
    if (confirm('Are you sure you want to delete this hub? This action cannot be undone.')) {
      this.adminService.deleteHub(hubId)
        .subscribe({
          next: (response) => {
            console.log('Hub deleted:', response);
            this.loadHubs(); // Reload the hub list
          },
          error: (error) => {
            console.error('Error deleting hub:', error);
            // Optionally display an error message
          }
        });
    }
  }
}