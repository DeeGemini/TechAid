import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { HubsModule } from './modules/hubs/hubs.module';
import { LandingModule } from './modules/landing/landing.module';
import { AdminModule } from './modules/admin/admin.module';
import { DonationsModule } from './modules/donations/donations.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './modules/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLaptopCode, faHandHoldingHeart, faWifi, faSchool, faExchangeAlt, faChartLine, faMoon } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// Add icons to the library
library.add(faLaptopCode, faHandHoldingHeart, faWifi, faSchool, faExchangeAlt, faChartLine, faMoon, faTwitter, faFacebook, faInstagram, faLinkedin);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AdminModule,
    DonationsModule,
    FormsModule,
    HubsModule,
    LandingModule,
    ReactiveFormsModule,
    SchoolsModule,
    SharedModule,
    SocialLoginModule,
    UserModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'YOUR_GOOGLE_CLIENT_ID'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
