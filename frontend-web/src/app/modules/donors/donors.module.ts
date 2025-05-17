import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DonorsRoutingModule } from './donors-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DonorsComponent } from './donors.component';
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';
import { DonorDevicesComponent } from './donor-devices/donor-devices.component';
import { DeviceDonationFormComponent } from './device-donation-form/device-donation-form.component';


@NgModule({
  declarations: [
    DonorsComponent,
    DonorDashboardComponent,
    DonorDevicesComponent,
    DeviceDonationFormComponent
  ],
  imports: [
    CommonModule,
    DonorsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class DonorsModule { }
