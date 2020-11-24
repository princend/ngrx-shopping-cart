import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';



@Injectable()
export class RouterEffects {



  constructor(private actions$: Actions) { }


  navigate$ = createEffect(() =>
    this.actions$.pipe(
      // TODO router step5
      // ofType
      // map
      // tap  navigate
    ),
    { dispatch: false }
  );

  // TODO router step6
  // createEffect navigateBack$

  // TODO router step7
  // createEffect navigateForward$
}
