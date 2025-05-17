import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface DeviceRequest {
  id: string;
  deviceType: string;
  quantity: number;
  priority: 'low' | 'medium' | 'high';
  requestedDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'fulfilled';
  donorName?: string;
  fulfillmentDate?: Date;
  notes?: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-school-devices',
  templateUrl: './school-devices.component.html',
  styleUrls: ['./school-devices.component.scss']
})
export class SchoolDevicesComponent implements OnInit {
  showRequestForm = false;
  deviceForm: FormGroup;
  deviceTypes = ['Laptop', 'Tablet', 'Smartphone', 'Desktop', 'E-reader'];
  priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];
  statuses = ['all', 'pending', 'approved', 'rejected', 'fulfilled'];
  selectedStatus = 'all';

  deviceRequests: DeviceRequest[] = [
    {
      id: 'REQ-2023-001',
      deviceType: 'Laptop',
      quantity: 10,
      priority: 'high',
      requestedDate: new Date('2023-05-10'),
      status: 'approved',
      donorName: 'TechForAll Foundation',
      fulfillmentDate: new Date('2023-05-25'),
      notes: 'For computer lab upgrade'
    },
    {
      id: 'REQ-2023-002',
      deviceType: 'Tablet',
      quantity: 15,
      priority: 'medium',
      requestedDate: new Date('2023-05-15'),
      status: 'pending',
      notes: 'For special needs students'
    },
    {
      id: 'REQ-2023-003',
      deviceType: 'Smartphone',
      quantity: 5,
      priority: 'low',
      requestedDate: new Date('2023-04-28'),
      status: 'rejected',
      notes: 'Request denied due to insufficient justification'
    },
    {
      id: 'REQ-2023-004',
      deviceType: 'Laptop',
      quantity: 8,
      priority: 'high',
      requestedDate: new Date('2023-05-01'),
      status: 'fulfilled',
      donorName: 'Digital Equity Now',
      fulfillmentDate: new Date('2023-05-20'),
      notes: 'For graduating students'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.deviceForm = this.fb.group({
      deviceType: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      priority: ['medium', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {}

  toggleRequestForm(): void {
    this.showRequestForm = !this.showRequestForm;
    if (!this.showRequestForm) {
      this.deviceForm.reset({
        deviceType: '',
        quantity: 1,
        priority: 'medium',
        notes: ''
      });
    }
  }

  submitRequest(): void {
    if (this.deviceForm.valid) {
      const newRequest: DeviceRequest = {
        id: `REQ-${new Date().getFullYear()}-${this.padNumber(this.deviceRequests.length + 1, 3)}`,
        deviceType: this.deviceForm.value.deviceType,
        quantity: this.deviceForm.value.quantity,
        priority: this.deviceForm.value.priority,
        requestedDate: new Date(),
        status: 'pending',
        notes: this.deviceForm.value.notes
      };

      this.deviceRequests.unshift(newRequest);
      this.toggleRequestForm();
    }
  }

  private padNumber(num: number, size: number): string {
    let s = num.toString();
    while (s.length < size) s = '0' + s;
    return s;
  }

  get filteredRequests(): DeviceRequest[] {
    if (this.selectedStatus === 'all') {
      return this.deviceRequests;
    }
    return this.deviceRequests.filter(req => req.status === this.selectedStatus);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'fulfilled': return 'status-fulfilled';
      default: return '';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'low': return 'priority-low';
      case 'medium': return 'priority-medium';
      case 'high': return 'priority-high';
      default: return '';
    }
  }

  getDeviceIcon(deviceType: string): string {
    switch (deviceType.toLowerCase()) {
      case 'laptop': return 'laptop';
      case 'tablet': return 'tablet-alt';
      case 'smartphone': return 'mobile-alt';
      case 'desktop': return 'desktop';
      case 'e-reader': return 'book-reader';
      default: return 'laptop';
    }
  }
}