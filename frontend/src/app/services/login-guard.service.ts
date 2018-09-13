import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  /**
   * if logged in, redirect to /proposals
   */
  canActivate() {
    const isLoggedIn = !!this.authenticationService.getAuthToken();

    if (isLoggedIn) {
      this.router.navigate(['/proposals'], {
        replaceUrl: true
      });
    }
    return !isLoggedIn;
  }
}
