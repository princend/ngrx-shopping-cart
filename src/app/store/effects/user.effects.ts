import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../user/service/user.service';

import * as fromUserActions from '../actions/user.actions';
import { User } from '../../model/user';
import { of } from 'rxjs';
import { UtilsService } from 'src/app/services';

@Injectable()
export class UserEffects {



  constructor(private actions$: Actions,
    private userService: UserService,
    private utils: UtilsService) { }


  loginEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUserActions.login),
      map((action) => {
        return action.payload;
      }),
      switchMap((user: User) => {
        return this.userService.loginServer(user).pipe(
          map((res: Response & LoginResponse) => {
            if (res.ok) {
              if (user.rememberMe) {
                this.utils.writeToken(res.payload);
              }
              return fromUserActions.loginSuccess({ payload: user.username });
            } else {
              return fromUserActions.loginFail({ payload: res.payload });
            }
          }),
          catchError((err) => of(fromUserActions.loginFail(err))),
        );
      }),
    );
  });


  logoutEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUserActions.logout),
      map(() => {
        this.utils.removeToken();
        return (fromUserActions.logoutSuccess());
      }));
  });

  getUserEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromUserActions.getUser),
      switchMap(() => {
        return this.userService.getUserFromServer().pipe(
          filter(user => (user !== null)),
          map((user: User) => fromUserActions.getUserSuccess({ payload: user.username })),
          catchError(err => of(fromUserActions.getUserFail(err))),
        );
      }));
  });
}


export interface LoginResponse {
  ok: boolean;
  payload: string;
}
