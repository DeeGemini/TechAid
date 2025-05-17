import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service'; // Assuming you have user role info here

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  isHotspotProvider = false; // Determine based on user role

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Example: Check user role from AuthService or a dedicated UserService
    const userRole = this.authService.getLoggedInUserRole(); // Implement this method
    this.isHotspotProvider = userRole === 'hotspot_provider';
  }
}