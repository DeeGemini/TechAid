import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchoolsRoutingModule } from './schools-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SchoolsComponent } from './schools.component';
import { RegisterSchoolComponent } from './register-school/register-school.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { SchoolProfileComponent } from './school-profile/school-profile.component';
import { SchoolCornerComponent } from './school-corner/school-corner.component';
import { SchoolDevicesComponent } from './school-devices/school-devices.component';
import { SchoolHotspotsComponent } from './school-hotspots/school-hotspots.component';
import { SchoolStudentsComponent } from './school-students/school-students.component';


@NgModule({
  declarations: [
    SchoolsComponent,
    RegisterSchoolComponent,
    SchoolDashboardComponent,
    SchoolProfileComponent,
    SchoolCornerComponent,
    SchoolDevicesComponent,
    SchoolHotspotsComponent,
    SchoolStudentsComponent
  ],
  imports: [
    NgChartsModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SchoolsRoutingModule,
    SharedModule
  ]
})
export class SchoolsModule { }
