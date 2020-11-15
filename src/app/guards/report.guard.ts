import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap, catchError } from 'rxjs/operators';
import { getReportAction } from '../store/actions/report.actions';
import { AppState } from '../store/index';
import { selectReposts } from '../store/selectors/report.selectors';

@Injectable({
  providedIn: 'root'
})
export class ReportGuard implements CanActivate, CanActivateChild {


  /**
   *
   */
  constructor(private store: Store<AppState>) {


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
    // return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }



  checkStore(): Observable<boolean> {
    return this.store.select(selectReposts)
      .pipe(
        tap(res => {
          if (res.length === 0) {
            this.store.dispatch(getReportAction());
          }
        }),
        switchMap(res => of(res.length !== 0)),
        take(1)
      );
  }
}
