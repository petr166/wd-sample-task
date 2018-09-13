import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AuthHttpService } from './auth-http.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LoginService {
  constructor(
    private authHttp: AuthHttpService,
    private authService: AuthenticationService
  ) {}

  login(credentials: { email: string; password: string }) {
    return this.authHttp
      .authRequest('/company/login', {
        method: 'POST',
        body: credentials,
        noAuth: true
      })
      .pipe(
        tap(res => {
          this.authService.setAuthToken(res.token);
        })
      );
  }
}
