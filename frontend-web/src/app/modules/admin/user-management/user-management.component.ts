import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';

interface User {
  id: string;
  email: string;
  role: string;
  registrationDate: Date;
  isActive: boolean;
  // Add other relevant user properties
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = false;
  errorMessage = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.adminService.getAllUsers()
      .subscribe({
        next: (users) => {
          this.users = users;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load users.';
          console.error('Error loading users:', error);
          this.loading = false;
        }
      });
  }

  viewUserDetails(userId: string): void {
    // Implement navigation or modal to show user details
    console.log('View details for user:', userId);
  }

  toggleUserStatus(userId: string, isActive: boolean): void {
    const action = isActive ? 'deactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} this user?`)) {
      this.adminService.updateUserStatus(userId, !isActive)
        .subscribe({
          next: (response) => {
            console.log(`User ${action}d:`, response);
            this.loadUsers(); // Reload the user list
          },
          error: (error) => {
            console.error(`Error ${action}ing user:`, error);
            // Optionally display an error message
          }
        });
    }
  }
}