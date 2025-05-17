import { Component, OnInit } from '@angular/core';
import { SchoolsService } from 'src/app/core/services/schools/schools.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface SchoolDetails {
  name: string;
  address: string;
  contactPerson: string;
  email: string;
  phone?: string;
  studentCount: number;
  verificationStatus: string;
  rejectionReason?: string;
  registrationDate: Date;
  // Add other relevant details
}

@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.scss']
})
export class SchoolProfileComponent implements OnInit {
  schoolDetails: SchoolDetails | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private schoolsService: SchoolsService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadSchoolProfile();
  }

  loadSchoolProfile(): void {
    this.loading = true;
    this.schoolsService.getSchoolDetails() // Assuming this fetches the detailed profile
      .subscribe({
        next: (data) => {
          this.schoolDetails = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load school profile.';
          console.error('Error loading school profile:', error);
          this.loading = false;
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  // editProfile(): void {
  //   // Implement navigation to an edit profile page
  //   console.log('Navigate to edit profile');
  // }
}