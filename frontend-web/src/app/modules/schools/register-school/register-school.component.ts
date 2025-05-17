import { Component } from '@angular/core';
import { SchoolsService } from 'src/app/core/services/schools/schools.service'; // Create this service
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-school',
  templateUrl: './register-school.component.html',
  styleUrls: ['./register-school.component.scss']
})
export class RegisterSchoolComponent {
  schoolData = {
    name: '',
    address: '',
    contactPerson: '',
    email: '',
    phone: '',
    studentCount: null as number | null,
    verificationDocument: null as File | null,
    verificationDocumentError: ''
  };
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private schoolsService: SchoolsService, private router: Router) { }

  onFileSelected(event: any): void {
    this.schoolData.verificationDocument = event.target.files[0];
    this.schoolData.verificationDocumentError = '';
  }

  registerSchool(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.schoolData.verificationDocument) {
      this.schoolData.verificationDocumentError = 'Please upload a verification document.';
      this.loading = false;
      return;
    }

    const formData = new FormData();
    formData.append('name', this.schoolData.name);
    formData.append('address', this.schoolData.address);
    formData.append('contactPerson', this.schoolData.contactPerson);
    formData.append('email', this.schoolData.email);
    formData.append('phone', this.schoolData.phone || '');
    formData.append('studentCount', this.schoolData.studentCount ? this.schoolData.studentCount.toString() : '');
    formData.append('verificationDocument', this.schoolData.verificationDocument, this.schoolData.verificationDocument.name);

    this.schoolsService.registerSchool(formData)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'School registration submitted successfully. Please wait for admin verification.';
          console.log('School registration successful:', response);
          this.router.navigate(['/schools/registration-pending']); // Create a pending page
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'School registration failed. Please try again.';
          console.error('School registration error:', error);
          // Handle specific error messages from the backend
        }
      });
  }
}