import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Donation {
  donorName: string;
  donorEmail: string;
  deviceType: string;
  quantity: number | null;
  condition: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private apiUrl = '/api/donations'; // Adjust to your backend API base URL

  constructor(private http: HttpClient) { }

  submitDonation(donationData: Donation): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, donationData);
  }

  // Optionally, add methods for:
  // - Tracking donation status (if implemented)
  // - Fetching donation history for logged-in users
}