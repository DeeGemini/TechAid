// Component remains the same
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-registration',
  templateUrl: './donor-registration.component.html',
  styleUrls: ['./donor-registration.component.scss']
})
export class DonorRegistrationComponent {
  // Your existing component code stays unchanged
  donorForm!: FormGroup;
  isSubmitting = false;
  showDeviceFields = false;
  showHotspotFields = false;
  currentStep = 1;
  totalSteps = 3;

  // Sample countries - same as school registration
  countries = [
    'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Ethiopia',
    'Tanzania', 'Uganda', 'Rwanda', 'Zambia', 'Zimbabwe'
  ];

  deviceTypes = [
    'Laptop', 'Tablet', 'Smartphone', 'Desktop Computer',
    'E-reader', 'Chromebook', 'Other'
  ];

  deviceConditions = [
    'New', 'Like New', 'Good', 'Fair', 'Needs Repair'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.donorForm = this.fb.group({
      // Step 1: Basic Information
      basicInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]+$/)]],
        country: ['', Validators.required],
        city: ['', Validators.required],
        termsAccepted: [false, Validators.requiredTrue]
      }),

      // Step 2: Donation Type
      donationType: this.fb.group({
        donationKind: ['', Validators.required], // 'device', 'hotspot', 'both'
        organizationName: [''],
        isOrganization: [false]
      }),

      // Step 3: Donation Details
      donationDetails: this.fb.group({
        // Device donation fields
        deviceType: [''],
        deviceCondition: [''],
        deviceQuantity: ['', [Validators.min(1)]],
        deviceAge: [''],
        hasCharger: [false],
        hasAccessories: [false],
        deviceDescription: ['', [Validators.maxLength(500)]],

        // Hotspot donation fields
        hotspotAvailability: [''],
        hotspotSpeed: [''],
        hotspotDataLimit: [''],
        hotspotSchedule: [''],
        hotspotFee: [''],
        hotspotDescription: ['', [Validators.maxLength(500)]]
      })
    });

    // Watch donation type changes
    this.donorForm.get('donationType.donationKind')?.valueChanges.subscribe(value => {
      this.showDeviceFields = value === 'device' || value === 'both';
      this.showHotspotFields = value === 'hotspot' || value === 'both';
    });

    // Watch organization toggle
    this.donorForm.get('donationType.isOrganization')?.valueChanges.subscribe(value => {
      const orgNameControl = this.donorForm.get('donationType.organizationName');
      if (value) {
        orgNameControl?.setValidators([Validators.required, Validators.minLength(2)]);
      } else {
        orgNameControl?.clearValidators();
        orgNameControl?.setValue('');
      }
      orgNameControl?.updateValueAndValidity();
    });
  }

  nextStep() {
    if (this.currentStep === 1 && this.basicInfo.invalid) {
      this.markFormGroupTouched(this.basicInfo);
      return;
    }

    if (this.currentStep === 2 && this.donationType.invalid) {
      this.markFormGroupTouched(this.donationType);
      return;
    }

    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit() {
    // Validate final step
    if (this.donationDetails.invalid) {
      this.markFormGroupTouched(this.donationDetails);
      return;
    }

    this.isSubmitting = true;

    // In a real app, you would send this to your backend
    console.log('Form submitted:', this.donorForm.value);

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/donor/dashboard']);
    }, 1500);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  // Form group getters for easy template access
  get basicInfo() {
    return this.donorForm.get('basicInfo') as FormGroup;
  }

  get donationType() {
    return this.donorForm.get('donationType') as FormGroup;
  }

  get donationDetails() {
    return this.donorForm.get('donationDetails') as FormGroup;
  }
}