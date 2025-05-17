import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing/landing.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { HubsComponent } from './modules/hubs/hubs/hubs.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
import { DonationManagementComponent } from './modules/admin/donation-management/donation-management.component';
import { HubManagementComponent } from './modules/admin/hub-management/hub-management.component';
import { SchoolVerificationComponent } from './modules/admin/school-verification/school-verification.component';
import { UserManagementComponent } from './modules/admin/user-management/user-management.component';
import { DonateDeviceComponent } from './modules/donations/donate-device/donate-device.component';
import { DonationThankYouComponent } from './modules/donations/donation-thank-you/donation-thank-you.component';
import { RegisterSchoolComponent } from './modules/schools/register-school/register-school.component';
import { SchoolDashboardComponent } from './modules/schools/school-dashboard/school-dashboard.component';
import { SchoolProfileComponent } from './modules/schools/school-profile/school-profile.component';
import { UserComponent } from './modules/user/user.component';
import { UserDashboardComponent } from './modules/user/user-dashboard/user-dashboard.component';
import { EditProfileComponent } from './modules/user/edit-profile/edit-profile.component';
import { DonationHistoryComponent } from './modules/user/donation-history/donation-history.component';
import { ManageHubsComponent } from './modules/user/manage-hubs/manage-hubs.component';
import { SchoolRegistrationComponent } from './modules/auth/school-registration/school-registration.component';
import { DonorRegistrationComponent } from './modules/auth/donor-registration/donor-registration.component';
import { RegistrationTypeComponent } from './modules/auth/registration-type/registration-type.component';
import { SchoolCornerComponent } from './modules/schools/school-corner/school-corner.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'register', component: RegistrationTypeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/school', component: SchoolRegistrationComponent },
  { path: 'register/donor', component: DonorRegistrationComponent },
  { path: 'hubs', component: HubsComponent },
  { path: 'hubs/:id', component: HubsComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/donation-management', component: DonationManagementComponent },
  { path: 'admin/hub-management', component: HubManagementComponent },
  { path: 'admin/school-verification', component: SchoolVerificationComponent },
  { path: 'admin/user-management', component: UserManagementComponent },
  { path: 'donate-device', component: DonateDeviceComponent },
  { path: 'donation-thank-you', component: DonationThankYouComponent },
  { path: 'register-school', component: RegisterSchoolComponent },
  { path: 'user', component: UserDashboardComponent },
  { path: 'user/profile', component: EditProfileComponent },
  { path: 'donation-history', component: DonationHistoryComponent },
  { path: 'manage-hubs', component: ManageHubsComponent },
  // { path: 'school-test', component: SchoolCornerComponent },
  { 
    path: 'school',
    loadChildren: () => import('./modules/schools/schools.module').then(m => m.SchoolsModule) 
  },
  { path: 'donors', loadChildren: () => import('./modules/donors/donors.module').then(m => m.DonorsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
