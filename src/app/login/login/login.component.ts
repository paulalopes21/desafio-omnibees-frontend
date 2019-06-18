import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../auth/services/authentication.service';

import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  code: string;
  returnUrl: string;
  error = '';
  loading = false;

  private clientId = environment.clientId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
    });

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.code) {
      this.login();
    }
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.code)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  auth() {
    window.location.href = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.clientId}`;
  }
}
