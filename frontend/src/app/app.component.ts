import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isFetching: boolean = false;
  error: string;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  /**
   * load user data on app open if logged in
   */
  loadData() {
    const isLoggedIn = !!this.authService.getAuthToken();
    this.error = undefined;

    if (isLoggedIn) {
      this.isFetching = true;
      this.userService.loadMe().subscribe(
        () => {
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;

          // 401 will trigger navigation to /login, showing an error will prevent displaying it
          if (err.status !== 401) {
            this.error = err.message;
          }
        }
      );
    }
  }

  isInDashboard() {
    return this.router.url !== '/login'; // to add others like /home etc.
  }

  isReady(): boolean {
    return !this.isFetching && !this.error;
  }
}
