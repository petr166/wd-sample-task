import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthHttpService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  authRequest(route: string, options: any = {}) {
    const { method = 'GET', headers = {} } = options;
    const url = environment.apiUrl + route;

    if (!options.noAuth) {
      options.headers = {
        ...headers,
        Authorization: this.authenticationService.getAuthToken()
      };
    }

    return this.http.request(method, url, options).pipe(
      tap((res: any) => {
        if (!res.success) {
          const err = new Error(res.error);
          err.message = res.error;
          throw err;
        }
      }),
      catchError((resError: HttpErrorResponse) => {
        // go to /login on "Unauthorized" 401
        if (resError.status === 401) {
          this.authenticationService.logout();
          this.router.navigate(['/login'], { replaceUrl: true });
        }

        if (resError.statusText) {
          const err = new Error(resError.statusText);
          err.message = resError.statusText;
          err.status = resError.status;
          throw err;
        }

        throw resError;
      })
    );
  }
}
