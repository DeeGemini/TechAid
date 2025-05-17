import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-school-registration',
  templateUrl: './school-registration.component.html',
  styleUrls: ['./school-registration.component.scss']
})
export class SchoolRegistrationComponent {
  registrationForm!: FormGroup;
  isSubmitting = false;
  showMapPicker = false;
  isRemoteInstitution = false;

  // Sample countries - replace with your actual country list
  countries = [
    'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Ethiopia', 
    'Tanzania', 'Uganda', 'Rwanda', 'Zambia', 'Zimbabwe'
  ];

  // Sample school types
  schoolTypes = [
    'Primary School', 
    'Secondary School', 
    'Vocational Institute', 
    'University', 
    'Online Learning Platform',
    'Community Education Center'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      basicInfo: this.fb.group({
        institutionName: ['', [Validators.required, Validators.minLength(3)]],
        institutionType: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]+$/)]],
        alternativeContact: [''],
        website: ['', Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)],
        description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]]
      }),
      locationInfo: this.fb.group({
        country: ['', Validators.required],
        region: ['', Validators.required],
        city: ['', Validators.required],
        streetAddress: [''],
        isRemote: [false],
        coordinates: ['']
      }),
      adminInfo: this.fb.group({
        contactPerson: ['', Validators.required],
        contactPosition: ['', Validators.required],
        contactEmail: ['', [Validators.required, Validators.email]],
        contactPhone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]+$/)]]
      }),
      verificationInfo: this.fb.group({
        registrationNumber: [''],
        accreditationDocument: [null],
        proofOfAddress: [null],
        additionalDocuments: [null]
      }),
      termsAccepted: [false, Validators.requiredTrue]
    });

    // Watch for remote institution toggle
    this.registrationForm.get('locationInfo.isRemote')?.valueChanges.subscribe(value => {
      this.isRemoteInstitution = value;
      const streetAddress = this.registrationForm.get('locationInfo.streetAddress');
      const coordinates = this.registrationForm.get('locationInfo.coordinates');
      
      if (value) {
        streetAddress?.clearValidators();
        coordinates?.setValidators([Validators.pattern(/^-?\d{1,3}\.\d+,-?\d{1,3}\.\d+$/)]);
      } else {
        streetAddress?.setValidators([Validators.required]);
        coordinates?.clearValidators();
      }
      
      streetAddress?.updateValueAndValidity();
      coordinates?.updateValueAndValidity();
    });
  }

  toggleMapPicker() {
    this.showMapPicker = !this.showMapPicker;
  }

  onCoordinatesSelected(coords: string) {
    this.registrationForm.get('locationInfo.coordinates')?.setValue(coords);
    this.showMapPicker = false;
  }

  onFileSelected(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.registrationForm.get(`verificationInfo.${controlName}`)?.setValue(file);
    }
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.markFormGroupTouched(this.registrationForm);
      return;
    }

    this.isSubmitting = true;
    
    // In a real app, you would send this to your backend
    console.log('Form submitted:', this.registrationForm.value);
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      
      // Redirect to pending approval page
      this.router.navigate(['/registration-status'], { 
        state: { 
          status: 'pending',
          email: this.registrationForm.get('basicInfo.email')?.value
        } 
      });
    }, 2000);
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

  get basicInfo() {
    return (this.registrationForm.get('basicInfo') as FormGroup).controls;
  }

  get locationInfo() {
    return (this.registrationForm.get('locationInfo') as FormGroup).controls;
  }

  get adminInfo() {
    return (this.registrationForm.get('adminInfo') as FormGroup).controls;
  }
}