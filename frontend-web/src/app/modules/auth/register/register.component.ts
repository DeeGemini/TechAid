import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationData = { email: '' }; // Adjust based on your backend requirements (e.g., name, password)
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Assuming you have a registerWithEmail method in your AuthService
    this.authService.registerWithEmail(this.registrationData.email)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Registration successful! Please check your email to verify your account.';
          console.log('Registration successful:', response);
          // Optionally, redirect the user to a verification pending page or login page
          // this.router.navigate(['/login']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Registration failed. Please try again.';
          console.error('Registration error:', error);
          // You might want to parse the error response from your backend
          // to display more specific error messages (e.g., email already exists).
        }
      });
  }
}