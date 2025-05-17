import { Component, OnInit } from '@angular/core';
import { HubService } from 'src/app/core/services/hub/hub.service';
import { ThemeService } from 'src/app/core/services/theme/theme.service';

export interface Hub {
  id: string;
  name: string;
  description: string;
  type: 'device-center' | 'hotspot' | 'training' | string;
  location: string;
  locationId: string;
  status: 'Active' | 'Closed' | 'Limited' | string;
  devicesDonated?: number;
  studentsHelped?: number;
  cost?: number;
  isFavorite?: boolean;
  mapPosition?: {
    x: number;
    y: number;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  openingHours?: {
    days: string;
    hours: string;
  }[];
  amenities?: string[];
  organization?: {
    id: string;
    name: string;
    isVerified: boolean;
  };
  images?: string[];
  lastUpdated?: Date;
  rating?: number;
  reviews?: number;
}

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.scss']
})
export class HubsComponent implements OnInit {
  hubs: Hub[] = [];
  filteredHubs: Hub[] = [];
  loading = true;
  error = false;
  searchTerm = '';
  selectedLocation = '';
  selectedType = '';
  mapCenter: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 10;
  isDarkMode = false;
  locationSearchInput = '';

  hubTypes = [
    { id: '', name: 'All Types' },
    { id: 'device-center', name: 'Device Donation Center' },
    { id: 'hotspot', name: 'Internet Hotspot' },
    { id: 'training', name: 'Tech Training Center' }
  ];

  locations = [
    { id: '', name: 'Near Me' },
    { id: 'nairobi', name: 'Nairobi, Kenya' },
    { id: 'lagos', name: 'Lagos, Nigeria' },
    { id: 'accra', name: 'Accra, Ghana' },
    { id: 'johannesburg', name: 'Johannesburg, South Africa' },
    { id: 'cairo', name: 'Cairo, Egypt' }
  ];

  constructor(
    private hubService: HubService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.getUserLocation();
    this.loadHubs();
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.mapCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        },
        () => {
          // Default to central Africa if geolocation fails
          this.mapCenter = { lat: 0, lng: 25 };
          this.zoom = 4;
        }
      );
    } else {
      // Default to central Africa if geolocation not available
      this.mapCenter = { lat: 0, lng: 25 };
      this.zoom = 4;
    }
  }

  loadHubs(): void {
    this.loading = true;
    this.hubService.getHubs().subscribe({
      next: (data) => {
        this.hubs = data;
        this.filteredHubs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching hubs', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredHubs = this.hubs.filter(hub => {
      // Apply search term filter
      const matchesSearch = hub.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        hub.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Apply location filter
      const matchesLocation = !this.selectedLocation || hub.locationId === this.selectedLocation;
      
      // Apply type filter
      const matchesType = !this.selectedType || hub.type === this.selectedType;
      
      return matchesSearch && matchesLocation && matchesType;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onLocationChange(): void {
    // If a preset location is selected, update map center
    if (this.selectedLocation) {
      const selectedLoc = this.locations.find(loc => loc.id === this.selectedLocation);
      if (selectedLoc) {
        // In a real app, you would have coordinates for each location
        // This is just placeholder logic
        switch (this.selectedLocation) {
          case 'nairobi':
            this.mapCenter = { lat: -1.292066, lng: 36.821945 };
            break;
          case 'lagos':
            this.mapCenter = { lat: 6.5244, lng: 3.3792 };
            break;
          case 'accra':
            this.mapCenter = { lat: 5.6037, lng: -0.1870 };
            break;
          case 'johannesburg':
            this.mapCenter = { lat: -26.2041, lng: 28.0473 };
            break;
          case 'cairo':
            this.mapCenter = { lat: 30.0444, lng: 31.2357 };
            break;
          default:
            // Keep current location
            break;
        }
        this.zoom = 12;
      }
    } else {
      // Reset to user location
      this.getUserLocation();
    }
    this.applyFilters();
  }

  onTypeChange(): void {
    this.applyFilters();
  }

  searchLocation(): void {
    // In a real app, this would use a geocoding service
    console.log('Searching for location:', this.locationSearchInput);
    // Placeholder - you would implement actual geocoding
    // Then update mapCenter and zoom based on results
  }

  toggleFavorite(hub: Hub): void {
    hub.isFavorite = !hub.isFavorite;
    // In a real app, this would save to user preferences
  }

  getHubStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'closed':
        return 'status-closed';
      case 'limited':
        return 'status-limited';
      default:
        return '';
    }
  }

  getHubIconPath(type: string): string {
    switch (type) {
      case 'device-center':
        return 'assets/icons/device-center.svg';
      case 'hotspot':
        return 'assets/icons/hotspot.svg';
      case 'training':
        return 'assets/icons/training.svg';
      default:
        return 'assets/icons/hub.svg';
    }
  }
}