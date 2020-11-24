import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../store';
import { getUser, logout } from '../store/actions/user.actions';
import { selectIsLogin } from '../store/selectors/user.selectors';
import { UserService } from '../user/service/user.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(
    private injector: Injector,
    private utils: UtilsService,
    private userService: UserService,
    private store: Store<AppState>
  ) { }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {

      if (!this.utils.isTokenExpired()) {
        this.store.dispatch(getUser());
        return this.store.select(selectIsLogin).pipe(
          filter(status => status)
        ).
          subscribe(res => {
            if (res) {
              setInterval(() => {
                this.checkStatus();
              }, 1000 * 60 * 5);
              resolve(res);
            }
          }, err => {
            console.log(err);
            reject(err);
          });
      }
      else {
        resolve('no token or token expired');
      }
    });
  }

  checkStatus(): void {
    if (this.utils.isTokenExpired()) {
      this.store.dispatch(logout());
      const router = this.injector.get(Router);
      router.navigate(['/']);
      console.log('logout due to token expired');
    }
  }
}
