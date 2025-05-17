import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service'; // Assuming AuthService can provide user role
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userRole$.pipe( // Assuming you have a userRole$ observable
      take(1),
      map((role) => {
        if (role === 'admin') {
          return true;
        }
        return this.router.parseUrl('/unauthorized'); // Create an unauthorized component
      })
    );
  }
}