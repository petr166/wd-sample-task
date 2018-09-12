import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable()
export class ProposalService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  getProposalList(options: any = {}) {
    const { status = 'pending' } = options;
    const { company } = this.userService.getMe();

    return this.http.get(environment.apiUrl + '/proposals', {
      headers: {
        Authorization: this.authenticationService.getAuthToken()
      },
      params: {
        company_id: company._id,
        status
      }
    });
  }
}
