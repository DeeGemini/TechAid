import { Component } from '@angular/core';

export interface DeviceDonation {
  id: string;
  date: Date;
  devices: {
    type: string;
    quantity: number;
    condition: string;
    specifications: string;
    accessories?: string;
  }[];
  school: {
    name: string;
    location: string;
  };
  status: 'Pending' | 'Processing' | 'In Transit' | 'Delivered' | 'Cancelled';
  deliveryDate?: Date;
  trackingNumber: string;
}

@Component({
  selector: 'app-donor-devices',
  templateUrl: './donor-devices.component.html',
  styleUrls: ['./donor-devices.component.scss']
})
export class DonorDevicesComponent {
  donations: DeviceDonation[] = [
    {
      id: 'DN-2023-001',
      date: new Date('2023-05-15'),
      devices: [
        { type: 'Laptop', quantity: 2, condition: 'Good', specifications: 'Dell Latitude, 8GB RAM, 256GB SSD' }
      ],
      school: { name: 'Nairobi High School', location: 'Nairobi' },
      status: 'Delivered',
      deliveryDate: new Date('2023-05-20'),
      trackingNumber: 'TRK-789456123'
    },
    {
      id: 'DN-2023-002',
      date: new Date('2023-06-10'),
      devices: [
        { type: 'Tablet', quantity: 5, condition: 'Excellent', specifications: 'Samsung Galaxy Tab A, 32GB' }
      ],
      school: { name: 'Tech4Kids Program', location: 'Mombasa' },
      status: 'Delivered',
      deliveryDate: new Date('2023-06-18'),
      trackingNumber: 'TRK-321654987'
    },
    {
      id: 'DN-2023-003',
      date: new Date('2023-07-05'),
      devices: [
        { type: 'Smartphone', quantity: 3, condition: 'Fair', specifications: 'Tecno Spark 5, 64GB' },
        { type: 'Laptop', quantity: 1, condition: 'Good', specifications: 'HP ProBook, 4GB RAM, 500GB HDD' }
      ],
      school: { name: 'Rural Learning Initiative', location: 'Kisumu' },
      status: 'In Transit',
      trackingNumber: 'TRK-987654321'
    }
  ];

  statusColors: { [key: string]: string } = {
    'Pending': '#ffc107',
    'Processing': '#17a2b8',
    'In Transit': '#007bff',
    'Delivered': '#28a745',
    'Cancelled': '#dc3545'
  };

  expandedDonation: string | null = null;

  toggleDonationDetails(id: string): void {
    this.expandedDonation = this.expandedDonation === id ? null : id;
  }

  getStatusColor(status: string): string {
    return this.statusColors[status] || '#6c757d';
  }

  getTotalDevices(devices: any[]): number {
    return devices.reduce((total, device) => total + device.quantity, 0);
  }
}