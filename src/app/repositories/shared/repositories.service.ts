import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Repository } from '../shared/repository';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRepoByUser(user: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${this.apiUrl}/users/${user}/repos`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
