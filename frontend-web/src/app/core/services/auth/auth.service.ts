import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  userId: string;
  // Add any other relevant data from your backend
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth'; // Adjust this to your backend API base URL
  private tokenKey = 'authToken';
  private userIdKey = 'userId';

  // Observable to track authentication state
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // ... other AuthService methods

  private refreshTokenUrl = '/api/auth/refresh'; // Adjust to your backend refresh token endpoint
  private refreshTokenKey = 'refreshToken';

  // Assuming you have a way to get the user role
  userRole$ = new BehaviorSubject<string | null>(this.getUserRoleFromToken()); // Implement getUserRoleFromToken


  constructor(private http: HttpClient) { }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout(); // Or handle appropriately
      return throwError(() => new Error('No refresh token available.'));
    }
    return this.http.post<any>(this.refreshTokenUrl, { refreshToken });
  }

  saveToken(accessToken: string): void {
    localStorage.setItem(this.tokenKey, accessToken);
  }

  
  getLoggedInUserRole(): string | null {
    return this.userRole$.value;
  }

  private getUserRoleFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      // Decode the token (e.g., using a library like `jwt-decode`)
      try {
        const decodedToken: any = JSON.parse(atob(token.split('.')[1])); // Basic decoding, use a library for security
        return decodedToken.role; // Adjust based on your token structure
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  loginWithEmail(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/email`, { email })
      .pipe(
        tap((response) => this.handleAuthResponse(response))
      );
  }

  loginWithGoogle(): Observable<AuthResponse> {
    // In a real scenario, this would likely involve a frontend library
    // for Google Sign-In that provides an ID token to send to your backend.
    // For this example, we'll simulate a Google login.
    console.log('Initiating Google login...');
    // Replace this with your actual Google Sign-In logic
    return new Observable<AuthResponse>(subscriber => {
      // Simulate a successful Google login after a short delay
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          token: 'mockGoogleToken123',
          userId: 'googleUser456'
        };
        this.handleAuthResponse(mockResponse);
        subscriber.next(mockResponse);
        subscriber.complete();
      }, 1500); // Simulate network request
    });
    // In a real app, you'd do something like:
    // return this.http.post<AuthResponse>(`${this.apiUrl}/login/google`, { idToken });
  }

  registerWithEmail(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/email`, { email });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    this.isAuthenticatedSubject.next(false);
    // Optionally, redirect the user to the login page
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userIdKey, response.userId);
    this.isAuthenticatedSubject.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}