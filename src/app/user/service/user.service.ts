import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getUserFromServer(): Observable<User> {
    if (!this.utils.isTokenExpired()) {
      const token = this.utils.getToken();
      return this.http.post(this.appConfig.apiUrl + '/users/currentUser', { token },
        { headers: { Authorization: `Bearer ${token}` } })
        .pipe(map((res: any) => {
          if (res.ok) {
            return { username: res.payload };
          } else {
            return null;
          }
        }));
    } else {
      return of(null);
    }
  }
}
