import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppState } from '../store';
import { selectIsLogin } from '../store/selectors/user.selectors';
import { UserService } from '../user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  loginStatus$: Observable<boolean>;
  constructor(
    private userService: UserService,
    private router: Router,
    public store: Store<AppState>
  ) {

    this.loginStatus$ = store.select(selectIsLogin);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }
  checkLogin(url: string): Observable<boolean> {
    return this.loginStatus$.pipe(
      tap(status => {
        if (!status) {
          // TODO router step11
          // dispatch go
          this.router.navigate(['user/login']);
        }
      }),
      take(1)
    );
  }
}
