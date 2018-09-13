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
  modal: any;
  toCancelIndex: number;

  constructor(
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // init the cancel safety modal
    this.modal = M.Modal.init(document.querySelector('#cancelProposalModal'), {
      endingTop: '20%'
    });

    // listen for query change, as it triggers table change
    this.route.queryParams.subscribe(this.handleParamsChange);
  }

  handleParamsChange = params => {
    const { status } = params;

    // in case of bad value, go to default 'pending' tab
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
  };

  loadProposalList() {
    this.error = undefined;
    this.isFetching = true;

    const options = {
      status: this.status
    };

    this.proposalService.getProposalList(options).subscribe(
      (res: any) => {
        this.isFetching = false;
        this.proposalList = res.proposalList;

        // hold a parsed version for easier display
        this.parsedProposalList = this.parseProposalList();
      },
      err => {
        this.error = err.message;
        this.parsedProposalList = [];
        this.isFetching = false;
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

  // on 'cancel proposal' click
  handleCancelClick(index: number) {
    this.modal.open();
    this.toCancelIndex = index;
  }

  //on 'cancel proposal' consent :)
  handleCancelAgreeClick() {
    this.isFetching = true;

    this.proposalService
      .cancelProposal(this.proposalList[this.toCancelIndex]._id)
      .subscribe(
        () => {
          this.loadProposalList();
          M.toast({ html: 'Proposal canceled' });
        },
        () => {
          this.isFetching = false;
          M.toast({ html: 'Error: Proposal cancel failed' });
        }
      );
  }
}
