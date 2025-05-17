import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SchoolDetails } from 'src/app/shared/interfaces/school-details'; // Create this interface
import { ReceivedDevice } from 'src/app/shared/interfaces/received-device';// Create this interface

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {
  private apiUrl = '/api/schools'; // Adjust to your backend API base URL

  constructor(private http: HttpClient) { }

  registerSchool(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData);
  }

  getSchoolDetails(): Observable<SchoolDetails> {
    // Replace with actual API call to fetch school details for the logged-in school
    // Example: return this.http.get<SchoolDetails>(`${this.apiUrl}/me`);
    // Mock data for now
    return of({
      name: 'Example School',
      address: '123 Main Street, Nairobi',
      contactPerson: 'John Doe',
      email: 'john.doe@example.com',
      phone: '0712345678',
      studentCount: 500,
      verificationStatus: 'Pending',
      registrationDate: new Date(),
    });
  }

  getReceivedDevices(): Observable<ReceivedDevice[]> {
    // Replace with actual API call to fetch received devices for the school
    // Example: return this.http.get<ReceivedDevice[]>(`${this.apiUrl}/devices`);
    // Mock data for now
    return of([
      { donationId: 'D001', deviceType: 'Laptop', quantity: 10, receivedDate: new Date('2025-05-01') },
      { donationId: 'D002', deviceType: 'Tablet', quantity: 20, receivedDate: new Date('2025-04-15') },
    ]);
  }

  // Add other methods as needed, e.g., for updating profile, tracking donations
}