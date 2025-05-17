import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-corner',
  templateUrl: './school-corner.component.html',
  styleUrls: ['./school-corner.component.scss']
})
export class SchoolCornerComponent {
  sidebarCollapsed = false;
  isMobileView = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  checkViewport() {
    this.isMobileView = window.innerWidth < 768;
    // Auto-collapse on mobile by default
    if (this.isMobileView && !this.sidebarCollapsed) {
      this.sidebarCollapsed = true;
    }
  }

  onToggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  routeIsActive(route: string): boolean {
    // Implement your logic to check if the route is active
    return this.router.url.includes(route);
  }

  sidebarConfig = {
    title: 'School Corner',
    subtitle: 'Manage your institution',
    profileInfo: {
      name: 'Greenwood High',
      role: 'Registered School',
      avatar: 'assets/images/school-avatar.jpg'
    },
    items: [
      { icon: 'tachometer-alt', label: 'Dashboard', route: '/school/dashboard' },
      { icon: 'laptop', label: 'Device Requests', route: '/school/devices', badge: 3 },
      { icon: 'wifi', label: 'Hotspot Access', route: '/school/hotspots' },
      { icon: 'users', label: 'Students', route: '/school/students' },
      { icon: 'chart-line', label: 'Reports', route: '/school/reports' },
      { icon: 'envelope', label: 'Messages', route: '/school/messages', badge: 5 },
      { icon: 'cog', label: 'Settings', route: '/school/settings' },
      { icon: 'question-circle', label: 'Help Center', route: '/school/help' }
    ],
    themeColor: '#8a4fff'
  };
}