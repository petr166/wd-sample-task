import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { AuthHttpService } from './auth-http.service';

export const statusOptions = {
  pending: 'pending',
  accepted: 'accepted',
  completed: 'completed',
  declined: 'declined',
  cancelled: 'cancelled'
};

@Injectable()
export class ProposalService {
  constructor(
    private authHttp: AuthHttpService,
    private userService: UserService
  ) {}

  getProposalList(options: any = {}) {
    const { status } = options;
    const { company } = this.userService.getMe();

    return this.authHttp.authRequest('/proposals', {
      params: {
        company_id: company._id,
        status: status || statusOptions.pending
      }
    });
  }
}
