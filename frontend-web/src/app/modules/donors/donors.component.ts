import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-corner',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.scss']
})
export class DonorsComponent {
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
    return this.router.url.includes(route);
  }

  sidebarConfig = {
    title: 'Donor Corner',
    subtitle: 'Make a difference',
    profileInfo: {
      name: 'John Doe',
      role: 'Tech Supporter',
      avatar: 'assets/images/donor-avatar.png'
    },
    items: [
      { icon: 'tachometer-alt', label: 'Dashboard', route: '/donors/dashboard' },
      { icon: 'laptop', label: 'Device Donations', route: '/donors/devices' },
      { icon: 'wifi', label: 'Hotspot Offers', route: '/donors/hotspots' },
      { icon: 'history', label: 'Donation History', route: '/donors/history' },
      { icon: 'school', label: 'Supported Schools', route: '/donors/schools' },
      { icon: 'chart-line', label: 'Impact Reports', route: '/donors/reports' },
      { icon: 'envelope', label: 'Messages', route: '/donors/messages', badge: 2 },
      { icon: 'cog', label: 'Settings', route: '/donors/settings' },
      { icon: 'question-circle', label: 'Help Center', route: '/donors/help' }
    ],
    themeColor: '#8a4fff'
  };
}