import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface School {
  id: string;
  name: string;
  location: string;
  students: number;
}

@Component({
  selector: 'app-device-donation-form',
  templateUrl: './device-donation-form.component.html',
  styleUrls: ['./device-donation-form.component.scss']
})
export class DeviceDonationFormComponent implements OnInit {
  donationForm!: FormGroup;
  isSubmitting = false;
  showSuccess = false;

  schools: School[] = [
    { id: 'SCH-001', name: 'Nairobi High School', location: 'Nairobi', students: 1200 },
    { id: 'SCH-002', name: 'Mombasa Tech Academy', location: 'Mombasa', students: 800 },
    { id: 'SCH-003', name: 'Rural Learning Initiative', location: 'Kisumu', students: 350 },
    { id: 'SCH-004', name: 'Tech4Kids Program', location: 'Mombasa', students: 200 },
    { id: 'SCH-005', name: 'Digital Futures School', location: 'Nakuru', students: 600 }
  ];

  deviceTypes = ['Laptop', 'Tablet', 'Smartphone', 'Desktop', 'Other'];
  conditions = ['New', 'Excellent', 'Good', 'Fair', 'Poor'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.donationForm = this.fb.group({
      school: ['', Validators.required],
      devices: this.fb.array([this.createDeviceGroup()]),
      pickupRequired: [true],
      pickupAddress: this.fb.group({
        street: [''],
        city: [''],
        country: ['Kenya'],
        contactName: [''],
        contactPhone: ['', [Validators.pattern(/^[0-9]{10,15}$/)]]
      }),
      notes: ['']
    });
  }

  createDeviceGroup(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      condition: ['Good', Validators.required],
      specifications: [''],
      accessories: ['']
    });
  }

  addDevice(): void {
    const devices = this.donationForm.get('devices') as any;
    devices.push(this.createDeviceGroup());
  }

  removeDevice(index: number): void {
    const devices = this.donationForm.get('devices') as any;
    if (devices.length > 1) {
      devices.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.donationForm.invalid) {
      this.donationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.showSuccess = true;
      this.donationForm.reset();
      this.initForm();
    }, 2000);
  }

  get devicesArray() {
    return this.donationForm.get('devices') as any;
  }
}