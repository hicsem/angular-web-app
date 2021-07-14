import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IUser, IUsers } from '../user';
import { retry, catchError } from 'rxjs/operators';
import { IRepos } from '../repos';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersEndpoint = ""
  private userEndpoint = ""
  private reposEndpoint = ""
  constructor(private http: HttpClient) { }

  getUsersList(search?:string): Observable<IUsers[]> {
    this.usersEndpoint = "https://api.github.com/users"
    if(search){
      this.usersEndpoint = this.usersEndpoint + "/" + search
    }
    return this.http.get<IUsers[]>(this.usersEndpoint).pipe(retry(1), catchError(this.handleError))
  }

  getUserDetails(username:string): Observable<IUser> {
    this.userEndpoint = "https://api.github.com/users/"+ username
    return this.http.get<IUser>(this.userEndpoint).pipe(retry(1), catchError(this.handleError))
  }

  getUserRepos(username:string): Observable<IRepos[]> {
    this.reposEndpoint = "https://api.github.com/users/"+ username +"/repos"
    return this.http.get<IRepos[]>(this.reposEndpoint).pipe(retry(1), catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse){
    return throwError(error.message || "Server Error")
  }
}
