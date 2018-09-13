import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  getAuthToken(): string {
    const token = localStorage.getItem(environment.tokenKey);
    return token;
  }

  setAuthToken(token: string) {
    localStorage.setItem(environment.tokenKey, token);
  }

  /**
   * clear localStorage and send /logout request
   */
  logout() {
    const token = this.getAuthToken();
    localStorage.clear();

    // no handlers for this, because the logout action should happen,
    // and the credentials removed wheter or not the backend responds
    this.http
      .delete(environment.apiUrl + '/user/logout', {
        headers: {
          Authorization: token
        }
      })
      .subscribe();
  }
}
