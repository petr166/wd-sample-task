import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {
  profile: any;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  loadMe() {
    return this.http.get(environment.apiUrl + '/company/me', {
      headers: {
        Authorization: this.authenticationService.getAuthToken()
      }
    });
  }

  setMe(profile: any) {
    const { user, company } = profile;
    this.profile = { user, company };
  }

  getMe(): any {
    return this.profile;
  }
}
