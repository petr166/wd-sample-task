import { Component, OnInit } from '@angular/core';

import * as M from 'materialize-css';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    M.Sidenav.init(document.querySelector('.sidenav'));
  }
}
