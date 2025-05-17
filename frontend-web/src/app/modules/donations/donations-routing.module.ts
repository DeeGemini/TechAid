import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonateDeviceComponent } from './donate-device/donate-device.component';
import { DonationThankYouComponent } from './donation-thank-you/donation-thank-you.component';

const routes: Routes = [
  { path: '', component: DonateDeviceComponent },
  { path: 'thank-you', component: DonationThankYouComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationsRoutingModule { }