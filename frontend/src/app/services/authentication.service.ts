import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor() {}

  getAuthToken(): string {
    const token = localStorage.getItem(environment.tokenKey);
    return token;
  }

  setAuthToken(token: string) {
    localStorage.setItem(environment.tokenKey, token);
  }
}
