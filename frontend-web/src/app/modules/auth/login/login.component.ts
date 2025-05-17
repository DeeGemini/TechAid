import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  showEmailSentMessage: boolean = false;
  googleProviderId = GoogleLoginProvider.PROVIDER_ID;

  constructor(
    private router: Router,
    public socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    // Subscribe to Google auth state changes
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.handleSocialLogin(user);
      }
    });
  }

  redirectToGoogle() {
    // Add query parameters
    const returnUrl = 'http://localhost:4200/';
    const mode = 'popup';
    window.location.href = `http://localhost:8000/google/login?return_url=${returnUrl}&mode=${mode}`;
  }

  handleEmailLogin() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email address';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call to send magic link
    setTimeout(() => {
      this.isLoading = false;
      this.showEmailSentMessage = true;
      
      // In a real app, you would:
      // 1. Send email to your backend
      // 2. Backend sends magic link to user's email
      // 3. When user clicks link, backend verifies and redirects
      //    to either register or dashboard based on registration status
    }, 1500);
  }

  handleSocialLogin(user: any) {
    this.isLoading = true;
    
    // Simulate API call to authenticate with Google
    setTimeout(() => {
      this.isLoading = false;
      
      // In a real app, you would:
      // 1. Send Google token to your backend
      // 2. Backend verifies and checks if user exists
      // 3. Redirects to register if new user, or dashboard if existing
      this.router.navigate(['/dashboard']); // Temporary for demo
    }, 1500);
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  navigateToRegister() {
    this.router.navigate(['/register'], { 
      state: { email: this.email } 
    });
  }
}