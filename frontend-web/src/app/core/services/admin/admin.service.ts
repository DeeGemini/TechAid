import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface AdminDashboardData {
  verificationQueueCount: number;
  totalUsers: number;
  totalDonations: number;
  activeHubs: number;
}

interface SchoolVerificationItem {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  registrationDate: Date;
  verificationDocumentUrl: string;
  // Add other relevant details
}

interface User {
  id: string;
  email: string;
  role: string;
  registrationDate: Date;
  isActive: boolean;
  // Add other relevant user properties
}

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  deviceType: string;
  quantity: number;
  submittedDate: Date;
  status: string;
  // Add other relevant donation properties
}

interface Hub {
  id: string;
  name?: string;
  location: string;
  type: 'hotspot' | 'device_hub';
  cost?: number;
  isActive: boolean;
  // Add other relevant hub properties
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = '/api/admin'; // Adjust to your backend API base URL

  constructor(private http: HttpClient) { }

  getAdminDashboardData(): Observable<AdminDashboardData> {
    // Replace with actual API call
    return of({
      verificationQueueCount: 5,
      totalUsers: 120,
      totalDonations: 85,
      activeHubs: 30,
    });
  }

  getSchoolsAwaitingVerification(): Observable<SchoolVerificationItem[]> {
    // Replace with actual API call
    return of([
      {
        id: 's1',
        name: 'Hope Academy',
        contactPerson: 'Jane Smith',
        email: 'jane.smith@hope.edu',
        registrationDate: new Date('2025-04-28'),
        verificationDocumentUrl: '/assets/mock-document.pdf'
      },
      {
        id: 's2',
        name: 'Future Leaders School',
        contactPerson: 'Peter Jones',
        email: 'peter.jones@future.org',
        registrationDate: new Date('2025-04-29'),
        verificationDocumentUrl: '/assets/mock-document2.pdf'
      },
    ]);
  }

  approveSchool(schoolId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/schools/${schoolId}/approve`, {});
  }

  rejectSchool(schoolId: string, rejectionReason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/schools/${schoolId}/reject`, { rejectionReason });
  }

  getAllUsers(): Observable<User[]> {
    // Replace with actual API call to fetch all users
    return of([
      { id: 'u1', email: 'user1@example.com', role: 'donor', registrationDate: new Date('2025-04-01'), isActive: true },
      { id: 'u2', email: 'school1@edu.com', role: 'school', registrationDate: new Date('2025-04-15'), isActive: true },
      { id: 'u3', email: 'user2@example.com', role: 'hotspot_provider', registrationDate: new Date('2025-04-20'), isActive: false },
    ]);
  }

  updateUserStatus(userId: string, isActive: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${userId}`, { isActive });
  }

  getAllDonations(): Observable<Donation[]> {
    // Replace with actual API call to fetch all donations
    return of([
      { id: 'd1', donorName: 'Alice Brown', donorEmail: 'alice.b@example.com', deviceType: 'Laptop', quantity: 2, submittedDate: new Date('2025-04-25'), status: 'Received' },
      { id: 'd2', donorName: 'Bob Green', donorEmail: 'bob.g@example.com', deviceType: 'Tablet', quantity: 5, submittedDate: new Date('2025-04-28'), status: 'Pending' },
      { id: 'd3', donorName: 'Charlie White', donorEmail: 'charlie.w@example.com', deviceType: 'Smartphone', quantity: 1, submittedDate: new Date('2025-04-30'), status: 'Allocated' },
    ]);
  }

  updateDonationStatus(donationId: string, newStatus: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/donations/${donationId}`, { status: newStatus });
  }

  getAllHubs(): Observable<Hub[]> {
    // Replace with actual API call to fetch all hubs
    return of([
      { id: 'h1', name: 'Community Wifi A', location: 'Westlands', type: 'hotspot', cost: 50, isActive: true },
      { id: 'h2', location: 'Kilimani', type: 'device_hub', isActive: true },
      { id: 'h3', name: 'Free Zone B', location: 'CBD', type: 'hotspot', cost: 0, isActive: false },
    ]);
  }

  updateHubStatus(hubId: string, isActive: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/hubs/${hubId}`, { isActive });
  }

  deleteHub(hubId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/hubs/${hubId}`);
  }

  // Add methods for user management, donation management, hub management as needed
}