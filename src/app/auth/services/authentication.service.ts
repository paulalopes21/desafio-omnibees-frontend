import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;
  private authUrl = environment.authUrl;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(code: string) {

    const body = JSON.stringify({
      'client_id': this.clientId,
      'client_secret': this.clientSecret,
      'code': code
    });

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

    return this.http.post<any>(`${this.authUrl}`, body, { headers: headers })
      .pipe(map(user => {
        if (user && user.access_token) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
