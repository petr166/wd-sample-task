import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  isFetching: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // TODO: remove default values
    // init the form group
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email]
      ],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  handleSubmit() {
    this.isFetching = true;
    this.loginService.login(this.loginForm.value).subscribe(
      (res: any) => {
        const { success, error, token } = res;
        if (success) {
          this.handleLoginSuccess(token);
        } else {
          this.error = error;
          this.isFetching = false;
        }
      },
      err => {
        this.error = err.statusText || 'There was an error.';
        this.isFetching = false;
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      }
    );
  }

  handleLoginSuccess(token: string) {
    this.authService.setAuthToken(token);
    this.userService.loadMe().subscribe(
      (res: any) => {
        const { success, error, user, company } = res;
        this.isFetching = false;

        if (success) {
          this.userService.setMe({ user, company });
          this.router.navigate(['/proposals']);
        } else {
          this.error = error;
        }
      },
      err => {
        this.error = err.statusText || 'There was an error.';
        this.isFetching = false;
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      }
    );
  }
}
