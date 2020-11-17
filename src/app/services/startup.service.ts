import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { AppState } from '../store/index';
import { Store } from '@ngrx/store';
import { getUser, logout } from '../store/actions/user.actions';
import { selectIsLogin } from '../store/selectors/user.selectors';
import { filter } from 'rxjs/operators';
import { go } from '../store/actions/router.actions';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(
    private utils: UtilsService,
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
    if (this.utils.isTokenExpired()) {   // if token expired
      this.store.dispatch(logout());
      this.store.dispatch(go({ payload: { path: ['/'] } }));
      console.log('logout due to token expired');
    }
  }
}
