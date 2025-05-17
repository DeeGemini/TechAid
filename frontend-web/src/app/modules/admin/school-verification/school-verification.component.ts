import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';

interface SchoolVerificationItem {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  registrationDate: Date;
  verificationDocumentUrl: string;
  // Add other relevant details
}

@Component({
  selector: 'app-school-verification',
  templateUrl: './school-verification.component.html',
  styleUrls: ['./school-verification.component.scss']
})
export class SchoolVerificationComponent implements OnInit {
  schoolsAwaitingVerification: SchoolVerificationItem[] = [];
  loading = false;
  errorMessage = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadSchoolsAwaitingVerification();
  }

  loadSchoolsAwaitingVerification(): void {
    this.loading = true;
    this.adminService.getSchoolsAwaitingVerification()
      .subscribe({
        next: (schools) => {
          this.schoolsAwaitingVerification = schools;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load schools awaiting verification.';
          console.error('Error loading schools:', error);
          this.loading = false;
        }
      });
  }

  viewDocument(documentUrl: string): void {
    window.open(documentUrl, '_blank');
  }

  approveSchool(schoolId: string): void {
    if (confirm('Are you sure you want to approve this school?')) {
      this.adminService.approveSchool(schoolId)
        .subscribe({
          next: (response) => {
            console.log('School approved:', response);
            this.loadSchoolsAwaitingVerification(); // Reload the list
          },
          error: (error) => {
            console.error('Error approving school:', error);
            // Optionally display an error message
          }
        });
    }
  }

  rejectSchool(schoolId: string): void {
    const rejectionReason = prompt('Please enter the reason for rejection:');
    if (rejectionReason !== null) {
      this.adminService.rejectSchool(schoolId, rejectionReason)
        .subscribe({
          next: (response) => {
            console.log('School rejected:', response);
            this.loadSchoolsAwaitingVerification(); // Reload the list
          },
          error: (error) => {
            console.error('Error rejecting school:', error);
            // Optionally display an error message
          }
        });
    }
  }
}