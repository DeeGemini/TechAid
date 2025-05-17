import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationsRoutingModule } from './donations-routing.module';
import { DonationsComponent } from './donations.component';
import { DonateDeviceComponent } from './donate-device/donate-device.component';
import { DonationThankYouComponent } from './donation-thank-you/donation-thank-you.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DonationsComponent,
    DonateDeviceComponent,
    DonationThankYouComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DonationsRoutingModule
  ]
})
export class DonationsModule { }
