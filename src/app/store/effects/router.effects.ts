import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';



@Injectable()
export class RouterEffects {



  constructor(private actions$: Actions) { }


  navigate$ = createEffect(() =>
    this.actions$.pipe(
      // TODO router step15
      // ofType
      // map
      // tap  navigate
    ),
    { dispatch: false }
  );

  // TODO step16
  // createEffect navigateBack$

  // TODO step17
  // createEffect navigateForward$
}
