import { Component } from '@angular/core';

@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.scss']
})
export class DonorDashboardComponent {
getBarColor(itemName: string) {
  switch(itemName) {
    case 'Laptops':
      return '#4caf50'; // Green
    case 'Tablets':
      return '#2196f3'; // Blue
    case 'Smartphones':
      return '#ff9800'; // Orange
    case 'Nairobi':
      return '#f44336'; // Red
    case 'Mombasa':
      return '#3f51b5'; // Indigo
    case 'Kisumu':
      return '#9c27b0'; // Purple
    case 'Nakuru':
      return '#ffeb3b'; // Yellow
    default:
      return '#9e9e9e'; // Grey
  }
}
  stats = [
    { title: 'Total Devices Donated', value: 24, icon: 'laptop', trend: 'up', change: 5 },
    { title: 'Hotspots Offered', value: 3, icon: 'wifi', trend: 'same', change: 0 },
    { title: 'Students Impacted', value: 187, icon: 'users', trend: 'up', change: 32 },
    { title: 'Schools Supported', value: 5, icon: 'school', trend: 'up', change: 1 }
  ];

  recentActivities = [
    { 
      type: 'device', 
      title: 'Laptop Donation', 
      description: 'Donated 2 laptops to Nairobi High School', 
      date: '2 days ago',
      status: 'delivered'
    },
    { 
      type: 'hotspot', 
      title: 'Hotspot Offer', 
      description: 'Offered free WiFi access in Westlands area', 
      date: '1 week ago',
      status: 'active'
    },
    { 
      type: 'device', 
      title: 'Tablet Donation', 
      description: 'Donated 5 tablets to Tech4Kids program', 
      date: '3 weeks ago',
      status: 'delivered'
    }
  ];

  impactMetrics = {
    devicesByType: [
      { name: 'Laptops', value: 12 },
      { name: 'Tablets', value: 8 },
      { name: 'Smartphones', value: 4 }
    ],
    studentsByRegion: [
      { name: 'Nairobi', value: 87 },
      { name: 'Mombasa', value: 45 },
      { name: 'Kisumu', value: 32 },
      { name: 'Nakuru', value: 23 }
    ]
  };
}