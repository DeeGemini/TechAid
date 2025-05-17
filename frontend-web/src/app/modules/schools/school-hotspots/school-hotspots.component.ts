import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Hotspot {
  id: string;
  name: string;
  provider: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  availability: string;
  speed: 'low' | 'medium' | 'high';
  cost: 'free' | 'paid';
  price?: number;
  distance: number;
  status: 'available' | 'requested' | 'approved' | 'rejected';
  requestedDate?: Date;
  approvedDate?: Date;
}

@Component({
  selector: 'app-school-hotspots',
  templateUrl: './school-hotspots.component.html',
  styleUrls: ['./school-hotspots.component.scss']
})
export class SchoolHotspotsComponent implements OnInit {
  searchForm: FormGroup;
  showFilters = false;
  isLoading = false;
  selectedHotspot: Hotspot | null = null;
  viewMode: 'map' | 'list' = 'list';

  speedOptions = [
    { value: 'all', label: 'All Speeds' },
    { value: 'low', label: 'Low (1-5 Mbps)' },
    { value: 'medium', label: 'Medium (5-20 Mbps)' },
    { value: 'high', label: 'High (20+ Mbps)' }
  ];

  costOptions = [
    { value: 'all', label: 'All Costs' },
    { value: 'free', label: 'Free Only' },
    { value: 'paid', label: 'Paid Only' }
  ];

  statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'available', label: 'Available' },
    { value: 'requested', label: 'Requested' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  hotspots: Hotspot[] = [
    {
      id: 'HS-001',
      name: 'Community Tech Center',
      provider: 'TechForAll Foundation',
      location: {
        address: '123 Main St, Nairobi',
        coordinates: [-1.286389, 36.817223]
      },
      availability: 'Mon-Fri, 8AM-6PM',
      speed: 'high',
      cost: 'free',
      distance: 0.8,
      status: 'available'
    },
    {
      id: 'HS-002',
      name: 'CoffeeNet Café',
      provider: 'CoffeeNet',
      location: {
        address: '456 University Ave, Nairobi',
        coordinates: [-1.268541, 36.811832]
      },
      availability: 'Daily, 7AM-9PM',
      speed: 'medium',
      cost: 'paid',
      price: 50,
      distance: 1.2,
      status: 'approved',
      requestedDate: new Date('2023-05-10'),
      approvedDate: new Date('2023-05-12')
    },
    {
      id: 'HS-003',
      name: 'Library Public WiFi',
      provider: 'Nairobi City Council',
      location: {
        address: '789 Knowledge St, Nairobi',
        coordinates: [-1.276542, 36.803421]
      },
      availability: 'Mon-Sat, 9AM-5PM',
      speed: 'low',
      cost: 'free',
      distance: 2.5,
      status: 'requested',
      requestedDate: new Date('2023-05-15')
    },
    {
      id: 'HS-004',
      name: 'Mall Hotspot',
      provider: 'Urban Spaces Ltd',
      location: {
        address: '101 Shopping Blvd, Nairobi',
        coordinates: [-1.292876, 36.821543]
      },
      availability: 'Daily, 10AM-8PM',
      speed: 'high',
      cost: 'paid',
      price: 100,
      distance: 3.1,
      status: 'rejected',
      requestedDate: new Date('2023-04-28'),
      approvedDate: new Date('2023-05-01')
    },
    {
      id: 'HS-005',
      name: 'Tech Hub Nairobi',
      provider: 'Digital Africa',
      location: {
        address: '202 Innovation Rd, Nairobi',
        coordinates: [-1.281765, 36.814329]
      },
      availability: '24/7',
      speed: 'high',
      cost: 'free',
      distance: 1.5,
      status: 'available'
    }
  ];

  filteredHotspots: Hotspot[] = [];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: [''],
      speed: ['all'],
      cost: ['all'],
      status: ['all'],
      maxDistance: [5]
    });
  }

  ngOnInit(): void {
    this.filterHotspots();
    this.searchForm.valueChanges.subscribe(() => {
      this.filterHotspots();
    });
  }

  filterHotspots(): void {
    const { searchQuery, speed, cost, status, maxDistance } = this.searchForm.value;
    
    this.filteredHotspots = this.hotspots.filter(hotspot => {
      const matchesSearch = hotspot.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hotspot.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hotspot.location.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpeed = speed === 'all' || hotspot.speed === speed;
      const matchesCost = cost === 'all' || hotspot.cost === cost;
      const matchesStatus = status === 'all' || hotspot.status === status;
      const matchesDistance = hotspot.distance <= maxDistance;
      
      return matchesSearch && matchesSpeed && matchesCost && matchesStatus && matchesDistance;
    });
  }

  searchHotspots(searchTerm: string): void {}

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'list' ? 'map' : 'list';
  }

  selectHotspot(hotspot: Hotspot): void {
    this.selectedHotspot = hotspot;
  }

  closeDetails(): void {
    this.selectedHotspot = null;
  }

  requestAccess(hotspot: Hotspot): void {
    if (hotspot.status === 'available') {
      hotspot.status = 'requested';
      hotspot.requestedDate = new Date();
      this.filterHotspots();
      // In a real app, you would call an API here
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available': return 'status-available';
      case 'requested': return 'status-requested';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  }

  getSpeedClass(speed: string): string {
    switch (speed) {
      case 'low': return 'speed-low';
      case 'medium': return 'speed-medium';
      case 'high': return 'speed-high';
      default: return '';
    }
  }

  getCostClass(cost: string): string {
    return cost === 'free' ? 'cost-free' : 'cost-paid';
  }

  getHotspotIcon(hotspot: Hotspot): string {
    if (hotspot.cost === 'free') {
      return 'wifi';
    }
    return 'money-bill-wave';
  }
}