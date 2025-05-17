import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface SidebarItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() title: string = 'TechAid';
  @Input() subtitle: string = 'Digitizing Education';
  @Input() items: SidebarItem[] = [];
  @Input() profileInfo?: {
    name: string;
    role: string;
    avatar?: string;
  };
  @Input() themeColor: string = '#8a4fff';
  @Input() isCollapsed: boolean = false;
  @Output() toggleCollapse = new EventEmitter<void>();
  @Output() closeSidebar = new EventEmitter<void>();

  isMobileView: boolean = window.innerWidth < 768;
  isMobileOpen: boolean = false;

  isDarkMode: boolean = false;

  constructor(private router: Router) {}

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileView = window.innerWidth < 768;
    if (!this.isMobileView && this.isMobileOpen) {
      this.isMobileOpen = false;
    }
  }

  routeIsActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  toggleMobileSidebar() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  handleItemClick() {
    if (this.isMobileView) {
      this.closeSidebar.emit();
      this.isMobileOpen = false;
    }
  }
}