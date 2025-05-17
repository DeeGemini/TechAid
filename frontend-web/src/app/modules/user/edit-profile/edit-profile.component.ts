import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/core/services/user-profile/user-profile.service';

interface UserData {
  email: string;
  name?: string;
  phone?: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userData: UserData = {
    email: '',
    name: '',
    phone: ''
  };
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading = true;
    this.userProfileService.getUserProfile()
      .subscribe({
        next: (profile) => {
          this.userData = {
            email: profile.email,
            name: profile.name,
            phone: profile.phone
          };
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load profile information.';
          console.error('Error loading user profile:', error);
          this.loading = false;
        }
      });
  }

  updateProfile(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userProfileService.updateUserProfile(this.userData)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Profile updated successfully!';
          console.log('Profile updated:', response);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to update profile. Please try again.';
          console.error('Error updating user profile:', error);
          // Handle specific error messages from the backend
        }
      });
  }
}