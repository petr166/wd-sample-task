import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ProposalService,
  statusOptions
} from '../../services/proposal.service';

import * as M from 'materialize-css';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent implements OnInit {
  isFetching: boolean = false;
  proposalList: Array<any> = [];
  parsedProposalList: Array<any> = [];
  error: string;
  status: string = 'pending';

  constructor(
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const { status } = params;
      if (!statusOptions[status]) {
        this.router.navigate([], {
          replaceUrl: true,
          queryParams: {
            status: statusOptions.pending
          }
        });
      } else {
        this.status = status;
        this.loadProposalList();
      }
    });
  }

  loadProposalList() {
    this.error = undefined;
    this.isFetching = true;

    const options = {
      status: this.status
    };

    this.proposalService.getProposalList(options).subscribe(
      (res: any) => {
        const { success, error, proposalList } = res;
        this.isFetching = false;
        if (success) {
          this.proposalList = proposalList;
          this.parsedProposalList = this.parseProposalList();
        } else {
          this.error = error;
          this.parsedProposalList = [];
        }
      },
      err => {
        this.error = err.statusText || 'There was an error';
        this.parsedProposalList = [];
        this.isFetching = false;
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      }
    );
  }

  parseProposalList() {
    return this.proposalList.map(proposal => {
      const {
        _id,
        job_id: { user_id, boat_id, service_id, is_emergency }
      } = proposal;

      return {
        _id,
        is_emergency,
        username: user_id.name, // no username
        boatType: boat_id.boat_subtype_id.name,
        service: service_id.name,
        location: boat_id.city
      };
    });
  }
}
