import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface UserProfile {
  email: string;
  name?: string;
  phone?: string;
}

interface Donation {
  id: string;
  deviceType: string;
  quantity: number;
  submittedDate: Date;
  status: string;
}

interface Hub {
  id: string;
  name?: string;
  location: string;
  type: 'hotspot' | 'device_hub';
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = '/api/user'; // Adjust to your backend API base URL

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserProfile> {
    // Replace with actual API call to fetch user profile
    return of({
      email: 'user@example.com',
      name: 'John Doe',
      phone: '0700000000'
    });
  }

  updateUserProfile(userData: UserProfile): Observable<any> {
    return this.http.patch(`${this.apiUrl}/profile`, userData);
  }

  getUserDonations(): Observable<Donation[]> {
    // Replace with actual API call to fetch user's donation history
    return of([
      { id: 'ud1', deviceType: 'Laptop', quantity: 1, submittedDate: new Date('2025-04-20'), status: 'Received' },
      { id: 'ud2', deviceType: 'Tablet', quantity: 2, submittedDate: new Date('2025-04-25'), status: 'Shipped' }
    ]);
  }

  getUserHubs(): Observable<Hub[]> {
    // Replace with actual API call to fetch user's listed hubs
    return of([
      { id: 'uh1', name: 'My Hotspot 1', location: 'Area X', type: 'hotspot', isActive: true },
      { id: 'uh2', location: 'Area Y', type: 'device_hub', isActive: false }
    ]);
  }

  updateUserHubStatus(hubId: string, isActive: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/hubs/${hubId}`, { isActive });
  }

  deleteUserHub(hubId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/hubs/${hubId}`);
  }

  // Add other relevant methods as needed
}