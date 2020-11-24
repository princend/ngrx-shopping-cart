import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { back, forward, go } from '../actions/router.actions';
import { Location } from '@angular/common';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        // TODO router step5
        ofType(go),
        tap(({ route }) =>
          this.router.navigate(route.path, {
            queryParams: route.query,
            ...route.extras
          })
        )
        // tap  navigate
      ),
    { dispatch: false }
  );

  // TODO router step6
  // createEffect navigateBack$
  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  // TODO router step7
  // createEffect navigateForward$
  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(forward),
        tap(() => this.location.forward())
      ),
    { dispatch: false }
  );
}
