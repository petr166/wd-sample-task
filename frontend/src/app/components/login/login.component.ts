import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
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
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
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
    this.error = undefined;

    this.loginService.login(this.loginForm.value).subscribe(
      () => {
        this.userService.loadMe().subscribe(
          () => {
            this.isFetching = false;
            this.router.navigate(['/proposals']);
          },
          userErr => {
            this.error = userErr.message;
            this.isFetching = false;
          }
        );
      },
      err => {
        this.error = err.message;
        this.isFetching = false;
      }
    );
  }
}
