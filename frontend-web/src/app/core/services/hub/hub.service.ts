import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Hub } from 'src/app/modules/hubs/hubs/hubs.component';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  private apiUrl = environment.apiUrl + '/hubs';

  // Mock data for development
  private mockHubs: Hub[] = [
    {
      id: 'hub-001',
      name: 'Nairobi Tech Center',
      description: 'A device donation center providing computers and tablets to local schools and students in need.',
      type: 'device-center',
      location: 'Nairobi, Kenya',
      locationId: 'nairobi',
      status: 'Active',
      devicesDonated: 342,
      studentsHelped: 1250,
      cost: 0, // Free
      isFavorite: false,
      mapPosition: { x: 65, y: 35 },
      coordinates: { lat: -1.292066, lng: 36.821945 },
      contactInfo: {
        phone: '+254 123 456 789',
        email: 'info@nairobicenter.org',
        website: 'https://nairobicenter.org',
        address: '123 Kenyatta Ave, Nairobi, Kenya'
      },
      openingHours: [
        { days: 'Monday-Friday', hours: '9:00 AM - 5:00 PM' },
        { days: 'Saturday', hours: '10:00 AM - 2:00 PM' },
        { days: 'Sunday', hours: 'Closed' }
      ],
      amenities: ['Wi-Fi', 'Training Rooms', 'Device Repair'],
      organization: {
        id: 'org-001',
        name: 'Digital Kenya Foundation',
        isVerified: true
      },
      lastUpdated: new Date('2025-04-15'),
      rating: 4.8,
      reviews: 124
    },
    {
      id: 'hub-002',
      name: 'Lagos Learning Hub',
      description: 'An educational center offering free internet access and computer training for students and teachers.',
      type: 'training',
      location: 'Lagos, Nigeria',
      locationId: 'lagos',
      status: 'Active',
      devicesDonated: 187,
      studentsHelped: 879,
      cost: 0, // Free
      isFavorite: false,
      mapPosition: { x: 45, y: 30 },
      coordinates: { lat: 6.5244, lng: 3.3792 },
      contactInfo: {
        phone: '+234 987 654 321',
        email: 'contact@lagoslearning.org',
        website: 'https://lagoslearning.org',
        address: '45 Victoria Island, Lagos, Nigeria'
      },
      organization: {
        id: 'org-002',
        name: 'Education For All Nigeria',
        isVerified: true
      },
      lastUpdated: new Date('2025-04-10'),
      rating: 4.5,
      reviews: 78
    },
    {
      id: 'hub-003',
      name: 'Accra Digital Hotspot',
      description: 'A community internet hotspot providing affordable connectivity for students and remote workers.',
      type: 'hotspot',
      location: 'Accra, Ghana',
      locationId: 'accra',
      status: 'Active',
      devicesDonated: 0, // Not applicable for hotspot
      studentsHelped: 450,
      cost: 2.99, // Small fee per day
      isFavorite: false,
      mapPosition: { x: 40, y: 28 },
      coordinates: { lat: 5.6037, lng: -0.1870 },
      contactInfo: {
        phone: '+233 123 456 789',
        email: 'help@accrahotspot.com',
        address: '78 Independence Ave, Accra, Ghana'
      },
      amenities: ['High-Speed Wi-Fi', 'Power Outlets', 'Study Tables'],
      organization: {
        id: 'org-003',
        name: 'Ghana Connect Initiative',
        isVerified: true
      },
      lastUpdated: new Date('2025-04-18'),
      rating: 4.2,
      reviews: 45
    },
    {
      id: 'hub-004',
      name: 'Johannesburg Tech Hub',
      description: 'A comprehensive center offering device donations, internet access, and digital skills training.',
      type: 'device-center',
      location: 'Johannesburg, South Africa',
      locationId: 'johannesburg',
      status: 'Active',
      devicesDonated: 523,
      studentsHelped: 1750,
      cost: 0, // Free
      isFavorite: false,
      mapPosition: { x: 50, y: 70 },
      coordinates: { lat: -26.2041, lng: 28.0473 },
      contactInfo: {
        phone: '+27 987 654 321',
        email: 'info@joburgtech.org.za',
        website: 'https://joburgtech.org.za',
        address: '56 Nelson Mandela Square, Johannesburg, South Africa'
      },
      organization: {
        id: 'org-004',
        name: 'South Africa Digital Access',
        isVerified: true
      },
      lastUpdated: new Date('2025-04-20'),
      rating: 4.9,
      reviews: 210
    },
    {
      id: 'hub-005',
      name: 'Cairo Connect',
      description: 'An affordable internet hotspot with workspaces for students and educational activities.',
      type: 'hotspot',
      location: 'Cairo, Egypt',
      locationId: 'cairo',
      status: 'Limited',
      devicesDonated: 0, // Not applicable for hotspot
      studentsHelped: 320,
      cost: 1.99, // Small fee per day
      isFavorite: false,
      mapPosition: { x: 60, y: 15 },
      coordinates: { lat: 30.0444, lng: 31.2357 },
      contactInfo: {
        phone: '+20 123 456 789',
        email: 'contact@cairoconnect.eg',
        address: '123 Tahrir Square, Cairo, Egypt'
      },
      amenities: ['Wi-Fi', 'Study Area', 'Power Backup'],
      organization: {
        id: 'org-005',
        name: 'Egypt Digital Future',
        isVerified: true
      },
      lastUpdated: new Date('2025-04-05'),
      rating: 4.0,
      reviews: 65
    },
    {
      id: 'hub-006',
      name: 'Kigali Innovation Center',
      description: 'A tech training hub focused on coding, digital literacy, and career development for youth.',
      type: 'training',
      location: 'Kigali, Rwanda',
      locationId: 'other',
      status: 'Active',
      devicesDonated: 142,
      studentsHelped: 687,
      cost: 0, // Free
      isFavorite: false,
      mapPosition: { x: 58, y: 40 },
      coordinates: { lat: -1.9403, lng: 30.0596 },
      contactInfo: {
        phone: '+250 123 456 789',
        email: 'info@kigalicode.rw',
        website: 'https://kigalicode.rw',
        address: '45 Innovation Street, Kigali, Rwanda'
      },
      organization: {
        id: 'org-006',
        name: 'Rwanda Digital Future',
        isVerified: true
      },
      lastUpdated: new Date('2025-04-12'),
      rating: 4.7,
      reviews: 92
    },
    {
      id: 'hub-007',
      name: 'Cape Town Learning Center',
      description: 'A community space offering device donations, repairs, and basic digital training.',
      type: 'device-center',
      location: 'Cape Town, South Africa',
      locationId: 'other',
      status: 'Active',
      devicesDonated: 289,
      studentsHelped: 1120,
      cost: 0, // Free
      isFavorite: false,
      mapPosition: { x: 45, y: 75 },
      coordinates: { lat: -33.9249, lng: 18.4241 },
      contactInfo: {
        phone: '+27 123 456 789',
        email: 'contact@capetechcenter.org.za',
        website: 'https://capetechcenter.org.za',
        address: '34 Long Street, Cape Town, South Africa'
      },
      organization: {
        id: 'org-007',
        name: 'Cape Education Trust',
        isVerified: true
      },
      lastUpdated: new Date('2025-04-08'),
      rating: 4.6,
      reviews: 87
    },
    {
      id: 'hub-008',
      name: 'Kampala Internet Cafe',
      description: 'An affordable internet hotspot with computer access for students and researchers.',
      type: 'hotspot',
      location: 'Kampala, Uganda',
      locationId: 'other',
      status: 'Closed',
      devicesDonated: 0, // Not applicable for hotspot
      studentsHelped: 245,
      cost: 0.99, // Very affordable fee
      isFavorite: false,
      mapPosition: { x: 55, y: 35 },
      coordinates: { lat: 0.3476, lng: 32.5825 },
      contactInfo: {
        phone: '+256 123 456 789',
        email: 'info@kampalainternet.ug',
        address: '67 Kampala Road, Kampala, Uganda'
      },
      amenities: ['Wi-Fi', 'Computer Stations', 'Printing Services'],
      organization: {
        id: 'org-008',
        name: 'Uganda Digital Access',
        isVerified: false
      },
      lastUpdated: new Date('2025-03-28'),
      rating: 3.9,
      reviews: 34
    }
  ];

  constructor(private http: HttpClient) { }

  getHubs(): Observable<Hub[]> {
    // For production, use API call
    if (!environment.production) {
      // Return mock data with simulated delay for development
      return of(this.mockHubs).pipe(
        delay(800), // Simulate network delay
        catchError(this.handleError<Hub[]>('getHubs', []))
      );
    }

    return this.http.get<Hub[]>(this.apiUrl).pipe(
      catchError(this.handleError<Hub[]>('getHubs', []))
    );
  }

  getHubById(id: string): Observable<Hub | undefined> {
    // For production, use API call
    if (!environment.production) {
      // Return mock data with simulated delay for development
      const hub = this.mockHubs.find(h => h.id === id);
      return of(hub).pipe(
        delay(500), // Simulate network delay
        catchError(this.handleError<Hub | undefined>(`getHubById id=${id}`))
      );
    }

    return this.http.get<Hub>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Hub>(`getHubById id=${id}`))
    );
  }

  getHubsByLocation(locationId: string): Observable<Hub[]> {
    // For production, use API call
    if (!environment.production) {
      // Filter mock data
      const filteredHubs = this.mockHubs.filter(h => h.locationId === locationId);
      return of(filteredHubs).pipe(
        delay(500), // Simulate network delay
        catchError(this.handleError<Hub[]>(`getHubsByLocation locationId=${locationId}`, []))
      );
    }

    return this.http.get<Hub[]>(`${this.apiUrl}?locationId=${locationId}`).pipe(
      catchError(this.handleError<Hub[]>(`getHubsByLocation locationId=${locationId}`, []))
    );
  }

  getHubsByType(type: string): Observable<Hub[]> {
    // For production, use API call
    if (!environment.production) {
      // Filter mock data
      const filteredHubs = this.mockHubs.filter(h => h.type === type);
      return of(filteredHubs).pipe(
        delay(500), // Simulate network delay
        catchError(this.handleError<Hub[]>(`getHubsByType type=${type}`, []))
      );
    }

    return this.http.get<Hub[]>(`${this.apiUrl}?type=${type}`).pipe(
      catchError(this.handleError<Hub[]>(`getHubsByType type=${type}`, []))
    );
  }

  searchHubs(term: string): Observable<Hub[]> {
    // For production, use API call
    if (!environment.production) {
      // Search mock data
      const termLower = term.toLowerCase();
      const filteredHubs = this.mockHubs.filter(hub => 
        hub.name.toLowerCase().includes(termLower) || 
        hub.description.toLowerCase().includes(termLower) ||
        hub.location.toLowerCase().includes(termLower)
      );
      return of(filteredHubs).pipe(
        delay(500), // Simulate network delay
        catchError(this.handleError<Hub[]>(`searchHubs term=${term}`, []))
      );
    }

    return this.http.get<Hub[]>(`${this.apiUrl}/search?term=${term}`).pipe(
      catchError(this.handleError<Hub[]>(`searchHubs term=${term}`, []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}