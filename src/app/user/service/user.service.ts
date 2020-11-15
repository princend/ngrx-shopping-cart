import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AppConfig } from '../../share';

import 'rxjs/add/operator/map';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/model';
import { map } from 'rxjs/operators';
import { UtilsService } from '../../services/utils.service';

export interface UserResponse {
  ok: boolean;
  payload: object;

}

@Injectable()
export class UserService {
  loginStatus = new BehaviorSubject<boolean>(false);
  currentUser = new BehaviorSubject<User>(null);
  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private utils: UtilsService
  ) { }

  loginServer(loginData): Observable<Response> {
    const username = loginData.username.trim();
    const password = loginData.password.trim();
    return this.http.post<Response>(this.appConfig.apiUrl + '/users/authenticate', { username, password });
  }

  login(loginData): Observable<boolean> {
    return this.loginServer(loginData).pipe(map((res) => {
      res.ok ? this.loginHanddle(loginData, res) : console.log(`can't login`);
      return res.ok;
    },
      (err: HttpErrorResponse) => {
        return this.errorHandle(err);
      }));
  }

  private loginHanddle(loginData: any, res): void {
    this.loginStatus.next(true);
    this.currentUser.next(loginData.username);
    console.log(loginData, 'login');
    if (loginData.rememberMe) {
      this.utils.writeToken(res.payload);
    }
  }

  private errorHandle(err: HttpErrorResponse): Observable<boolean> {
    console.log(err.error instanceof Error ? 'client-side error' : 'server-side error');
    return of(false);
  }

  logout(): void {
    this.loginStatus.next(false);
    this.currentUser.next(null);
    this.utils.removeToken();
  }
  getLoginStatus(): Observable<boolean> {
    return this.loginStatus;
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  getUserFromServer(): Observable<User> {
    if (!this.utils.isTokenExpired()) {
      const token = this.utils.getToken();

      // tslint:disable-next-line:object-literal-shorthand
      return this.http.post(this.appConfig.apiUrl + '/users/currentUser', { token: token },
        { headers: { Authorization: `Bearer ${token}` } })
        .pipe(map((res: any) => {
          if (res.ok) {
            return res.payload;
          } else {
            return null;
          }
        }));
    } else {
      return of(null);
    }
  }

  getUser(): void {
    this.getUserFromServer()
      .subscribe(res => {
        this.currentUser.next(res);
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('client-side error');
          } else {
            console.log('server-side error');
          }
        });
  }

  checkUser(): Observable<boolean> {
    if (!this.utils.isTokenExpired()) {
      this.loginStatus.next(true);
      this.getUser();
      return of(true);
    } else {
      console.log('no token or token is expired');
      this.utils.removeToken();
      return of(false);
    }
  }
}
