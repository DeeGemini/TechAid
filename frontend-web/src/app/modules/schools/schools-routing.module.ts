import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolsComponent } from './schools.component';
import { SchoolCornerComponent } from './school-corner/school-corner.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { SchoolDevicesComponent } from './school-devices/school-devices.component';
import { SchoolHotspotsComponent } from './school-hotspots/school-hotspots.component';
import { SchoolStudentsComponent } from './school-students/school-students.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolCornerComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SchoolDashboardComponent },
      { path: 'devices', component: SchoolDevicesComponent },
      { path: 'hotspots', component: SchoolHotspotsComponent },
      { path: 'students', component: SchoolStudentsComponent },
      // { path: 'devices', loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule) },
      // { path: 'hotspots', loadChildren: () => import('./hotspots/hotspots.module').then(m => m.HotspotsModule) },
      // { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
      // { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      // { path: 'messages', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule) },
      // { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      // { path: 'help', loadChildren: () => import('./help/help.module').then(m => m.HelpModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
