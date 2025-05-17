import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  verificationQueueCount = 0;
  totalUsers = 0;
  totalDonations = 0;
  activeHubs = 0;
  loading = false;
  errorMessage = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.adminService.getAdminDashboardData()
      .subscribe({
        next: (data) => {
          this.verificationQueueCount = data.verificationQueueCount;
          this.totalUsers = data.totalUsers;
          this.totalDonations = data.totalDonations;
          this.activeHubs = data.activeHubs;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load dashboard data.';
          console.error('Error loading admin dashboard data:', error);
          this.loading = false;
        }
      });
  }
}

interface AdminDashboardData {
  verificationQueueCount: number;
  totalUsers: number;
  totalDonations: number;
  activeHubs: number;
}