import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name: string;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  handleBurgerClick() {
    document.querySelector('body').classList.toggle('sidenav-hide');
  }

  handleProfileClick() {
    // logout for now
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getName() {
    const { user } = this.userService.getMe();
    if (user) return user.name.split(' ')[0];
  }
}
