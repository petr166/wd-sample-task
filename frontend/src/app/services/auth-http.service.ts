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

  /**
   * HttpClient.request wrapper
   * see https://angular.io/api/common/http/HttpClient#request
   * adds Authorization header and handles errors
   * @param {string} route - api route (without the base url)
   * @param {Object} options - http request options
   * @param {boolean} noAuth - set to true to exclude authentication
   */
  authRequest(route: string, options: any = {}) {
    const { method = 'GET', headers = {} } = options;
    const url = environment.apiUrl + route;

    if (!options.noAuth) {
      const token = this.authenticationService.getAuthToken();
      // add the authorization header only if there is a token
      // else HttpClient throws errors
      if (token) {
        options.headers = {
          ...headers,
          Authorization: token
        };
      }
    }

    return this.http.request(method, url, options).pipe(
      tap((res: any) => {
        // the backend response is in { success: boolean, error?: string }
        // when !success, throw error so it is handled in 1 place in components
        if (!res.success) {
          const err = new Error(res.error);
          err.message = res.error;
          throw err;
        }
      }),
      catchError((resError: HttpErrorResponse) => {
        // go to /login on "Unauthorized" 401
        if (resError.statusText) {
          if (resError.status === 401) {
            this.authenticationService.logout();
            this.router.navigate(['/login'], { replaceUrl: true });
            throw resError;
          } else {
            throw new Error('Network error');
          }
        } else {
          throw resError;
        }
      })
    );
  }
}
