import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken();

    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401 && this.authService.getRefreshToken()) {
          // Token expired, try to refresh
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe( // Implement this method in AuthService
        switchMap((newTokenResponse: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newTokenResponse.accessToken);
          // Update access token in AuthService and localStorage
          this.authService.saveToken(newTokenResponse.accessToken);
          return next.handle(this.addToken(this.cloneRequest(request), newTokenResponse.accessToken));
        }),
        catchError((refreshError) => {
          this.isRefreshing = false;
          this.authService.logout(); // Or handle logout appropriately
          return throwError(() => refreshError);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(this.cloneRequest(request), jwt));
        })
      );
    }
  }

  private cloneRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone();
  }
}