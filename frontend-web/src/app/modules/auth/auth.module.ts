import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SchoolRegistrationComponent } from './school-registration/school-registration.component';
import { DonorRegistrationComponent } from './donor-registration/donor-registration.component';
import { RegistrationTypeComponent } from './registration-type/registration-type.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SchoolRegistrationComponent,
    DonorRegistrationComponent,
    RegistrationTypeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthModule { }
