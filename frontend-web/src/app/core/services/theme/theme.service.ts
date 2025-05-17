import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    // Check for saved theme preference in localStorage
    localStorage.setItem('theme', 'light');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      this.isDarkModeSubject.next(true);
    } else if (savedTheme === 'light') {
      this.isDarkModeSubject.next(false);
    } else {
      // Check system preference if no saved preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkModeSubject.next(prefersDark);
    }
    
    // Apply theme to document
    this.applyTheme(this.isDarkModeSubject.value);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem('theme')) {
        this.isDarkModeSubject.next(e.matches);
        this.applyTheme(e.matches);
      }
    });
  }

  toggleTheme(): void {
    const newValue = !this.isDarkModeSubject.value;
    this.isDarkModeSubject.next(newValue);
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    this.applyTheme(newValue);
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkModeSubject.next(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}