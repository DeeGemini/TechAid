import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    RouterModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
