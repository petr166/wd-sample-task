import { Component, OnInit } from '@angular/core';

import { ProposalService } from '../../services/proposal.service';

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

  constructor(private proposalService: ProposalService) {}

  ngOnInit() {
    this.loadProposalList();
  }

  loadProposalList() {
    this.proposalService.getProposalList().subscribe(
      (res: any) => {
        const { success, error, proposalList } = res;
        this.isFetching = false;
        if (success) {
          this.proposalList = proposalList;
          this.parsedProposalList = this.parseProposalList();
        } else {
          this.error = error;
        }
      },
      err => {
        this.error = err.statusText || 'There was an error';
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
