import { Injectable } from '@angular/core';
import { tap, retry } from 'rxjs/operators';

import { AuthHttpService } from './auth-http.service';

@Injectable()
export class UserService {
  profile: any = {};

  constructor(private authHttp: AuthHttpService) {}

  loadMe() {
    return this.authHttp.authRequest('/company/me').pipe(
      retry(3),
      tap(res => {
        const { user, company } = res;
        this.setMe({ user, company });
      })
    );
  }

  setMe(profile: any) {
    const { user, company } = profile;
    this.profile = { user, company };
  }

  getMe(): any {
    return this.profile;
  }
}
