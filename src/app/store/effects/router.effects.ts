import { Injectable } from '@angular/core';
import { act, Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { go, back } from '../actions/router.actions';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Injectable()
export class RouterEffects {



  constructor(private actions$: Actions, private router: Router, private location: Location) { }


  // navigate$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(go),
  //     map((action) => action),
  //     tap((action) => {
  //       const payload = action.payload;
  //       console.log('payload = ', payload);
  //       this.router.navigate(payload.path, { ...payload.query, ...payload.extras });
  //     })
  //   );
  // });


  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(go),
      map((action) => action.payload),
      tap(({ path, query: queryParams, extras }) => {
        this.router.navigate(path, { queryParams, ...extras });
      }),
    ),
    { dispatch: false },
  );


  navigateBack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(back),
      tap(() => this.location.back)),
    { dispatch: false }
  );

  navigateForward$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(back),
      tap(() => this.location.back));
  }, { dispatch: false });


}
