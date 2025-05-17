import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolVerificationComponent } from './school-verification/school-verification.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DonationManagementComponent } from './donation-management/donation-management.component';
import { HubManagementComponent } from './hub-management/hub-management.component';;


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    SchoolVerificationComponent,
    UserManagementComponent,
    DonationManagementComponent,
    HubManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
