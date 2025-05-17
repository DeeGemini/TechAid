import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorsComponent } from './donors.component';
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';
import { DonorDevicesComponent } from './donor-devices/donor-devices.component';
import { DeviceDonationFormComponent } from './device-donation-form/device-donation-form.component';

const routes: Routes = [{
  path: '', component: DonorsComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DonorDashboardComponent },
    { path: 'devices', component: DonorDevicesComponent },
    { path: 'devices/new', component: DeviceDonationFormComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorsRoutingModule { }
