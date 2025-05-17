import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
// import { SchoolVerificationComponent } from './school-verification/school-verification.component';
// import { UserManagementComponent } from './user-management/user-management.component';
// import { DonationManagementComponent } from './donation-management/donation-management.component';
// import { HubManagementComponent } from './hub-management/hub-management.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  // { path: 'school-verification', component: SchoolVerificationComponent },
  // { path: 'user-management', component: UserManagementComponent },
  // { path: 'donation-management', component: DonationManagementComponent },
  // { path: 'hub-management', component: HubManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }