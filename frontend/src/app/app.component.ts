import { Component, OnInit } from '@angular/core';

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
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const isLoggedIn = !!this.authService.getAuthToken();
    this.error = undefined;

    if (isLoggedIn) {
      this.isFetching = true;
      this.userService.loadMe().subscribe(
        (res: any) => {
          const { success, error, user, company } = res;
          this.isFetching = false;
          if (success) {
            this.userService.setMe({ user, company });
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
  }

  isReady(): boolean {
    return !this.isFetching && !this.error;
  }
}
