import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { UserService } from '../user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  loginStatus$: Observable<boolean>;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.loginStatus$ = userService.getLoginStatus();
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
          this.router.navigate(['user/login']);
        }
      }),
      take(1)
    );
  }
}
